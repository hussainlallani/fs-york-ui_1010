import express from "express";
const router = express.Router();
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Joi from "joi";
// import * as db from "../utilities/jsonHandler.js";
import bcrypt from "bcrypt";
import { db } from "../database/connection.js";

// Declare primary(param) key
var pkText = "username";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateUserForm(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let { username, password, is_admin } = req.body;

  const sql = (hashedPwd) => {
    return `INSERT INTO ${process.env.DBNAME}.users
  ( username, password, is_admin) VALUES ('${username}','${hashedPwd}',${is_admin})`;
  };

  try {
    //  Hash Password
    const hashedPwd = await hashPwd(password);
    const results = await db.query(sql(hashedPwd));
    dbStatus(res, results);
  } catch (error) {
    if (error.errno === 1062) {
      return res.status(409).json(error.message);
    }
    return res.status(500).json(error);
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
  const sql = `SELECT username, is_admin
  FROM
    ${process.env.DBNAME}.users;`;

  try {
    let results = await db.query(sql);

    return res.status(200).send(results);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.put(`/:${pkText}`, async (req, res) => {
  // Validate input
  // const { error } = validateUserForm(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // console.log(`${req.params[pkText]};`);

  const { username, is_admin } = req.body;

  // Get payload
  const payload = { username, is_admin };

  const sql = `UPDATE ${process.env.DBNAME}.users 
    SET is_admin = ${is_admin} 
    WHERE ${pkText}='${req.params[pkText]}';`;

  // Apply update
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete(`/:${pkText}`, async (req, res) => {
  const sql = `DELETE FROM ${process.env.DBNAME}.users WHERE ${pkText}='${req.params[pkText]}';`;
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
});

const validateUserForm = (reqBody) => {
  const schemaUserForm = Joi.object({
    username: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
    is_admin: Joi.boolean().required(),
  });

  return schemaUserForm.validate(reqBody);
};

const dbStatus = (res, results) => {
  if (results.affectedRows !== 0)
    return res.status(200).json(`Database successfully updated!`);
  return res.status(400).json(`Error: database not updated!!`);
};

const hashPwd = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    return hashedPwd;
  } catch (error) {
    if (error) throw error;
  }
};

export default router;
