import express from "express";
const router = express.Router();
import Joi from "joi";
import * as db from "../utilities/jsonHandler.js";
import bcrypt from "bcrypt";
import { conn } from "../database/connection.js";

// Declare primary(param) key
var pkText = "id";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateUserForm(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Get payload
  let { username, password, isAdmin } = req.body;

  const payload = { username, isAdmin };

  try {
    //  Hash Password
    var salt = await bcrypt.genSalt(10);
    var hashedPwd = await bcrypt.hash("123", salt);

    password = hashedPwd;

    const sql = `INSERT INTO portdb.users
    ( username, password, isadmin) VALUES ('${username}','${password}',${isAdmin})`;

    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      return res.status(201).send(result);
    });
  } catch (error) {
    // Show errors if found
    return res.status(404).json(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await db.readItems(`${process.env.USERSFILEPATH}`);
    if (users.length === 0 || users === undefined)
      return res.status(404).json({ message: "Resource not found!" });
    return res.status(200).send(users);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.put(`/:${pkText}`, async (req, res) => {
  // Validate input
  const { error } = validateUserForm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password, isAdmin } = req.body;

  // Get payload
  const payload = { email, password, isAdmin };

  // Apply update
  try {
    const pkValue = req.params[pkText];
    await db.updateItem(
      pkText,
      pkValue,
      `${process.env.USERSFILEPATH}`,
      payload
    );
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete(`/:${pkText}`, async (req, res) => {
  try {
    // Apply removal
    const pkValue = req.params[pkText];

    await db.removeItem(pkText, pkValue, `${process.env.USERSFILEPATH}`);
    return res.send(
      `The record with ${pkText}# ${pkValue} successfully deleted!`
    );
  } catch (error) {
    return res.status(404).json(error);
  }
});

const validateUserForm = (reqBody) => {
  const schemaUserForm = Joi.object({
    username: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schemaUserForm.validate(reqBody);
};

export default router;
