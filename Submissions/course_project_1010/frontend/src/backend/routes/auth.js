import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import * as db from "../utilities/jsonHandler.js";
import { conn } from "../database/connection.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateAuthForm(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res
      .status(400)
      .send({ message: "Validation Error", Error: error.details[0].message });
  }

  const { username, password } = req.body;

  const sql = `SELECT username, password, isadmin FROM portdb.users;`;

  conn.query(sql, function (err, result) {
    if (err) throw err;
    const user = result.find((props) => props.username === username);
    // console.log(user);
    if (user === undefined)
      return res.status(400).json({ message: "Invalid email or password!" });
  });

  try {
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password!" });

    const token = jwt.sign(
      {
        isAdmin: user.isAdmin,
        username: user.username,
      },
      `${process.env.PRIVATEKEY}`
    );
    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).send(error);
  }
});

const validateAuthForm = (reqBody) => {
  const schemaUserForm = Joi.object({
    username: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
  });

  return schemaUserForm.validate(reqBody);
};

export default router;
