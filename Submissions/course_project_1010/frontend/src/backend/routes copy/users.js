import express from "express";
const router = express.Router();
import Joi from "joi";
import * as db from "../utilities/jsonHandler.js";
import bcrypt from "bcrypt";

// Declare primary(param) key
var pkText = "id";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateUserForm(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: "Validation Error", Error: error.details[0].message });
  }

  // Get payload
  let { email, password, isAdmin } = req.body;

  var payload = {
    id: Math.floor(Math.random() * Date.now()),
    email,
    password,
    isAdmin,
  };

  //  Hash Password
  var salt = await bcrypt.genSalt(10);
  var hashedPwd = await bcrypt.hash(payload.password, salt);

  payload.password = hashedPwd;

  try {
    // Read items
    const users = await db.readItems(`${process.env.USERSFILEPATH}`);
    // Check duplicate user
    const user = users.find((props) => props.email === payload.email);
    if (user === undefined) {
      // Insert payload
      await db.createItem(
        `${process.env.USERSFILEPATH}`,
        JSON.parse(JSON.stringify(payload))
      );
      console.log(`Saved to file: ${JSON.parse(JSON.stringify(payload))}`);
      return res.status(201).send(payload);
    } else {
      return res.status(409).json({ message: "Email already exists!" });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      // Insert payload if file not exists
      await db.createItem(
        `${process.env.USERSFILEPATH}`,
        JSON.parse(JSON.stringify(payload))
      );
      console.log(`Saved to file: ${JSON.parse(JSON.stringify(payload))}`);

      return res.status(201).send(payload);
    }
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
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schemaUserForm.validate(reqBody);
};

export default router;
