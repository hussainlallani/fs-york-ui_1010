import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import * as db from "../utilities/jsonHandler.js";

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

  const { email, password } = req.body;

  var payload = {
    email,
    password,
  };

  try {
    // Read items
    const users = await db.readItems(`${process.env.USERSFILEPATH}`);

    const user = users.find((props) => props.email === payload.email);

    if (user === undefined)
      return res.status(400).json({ message: "Invalid email or password!" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password!" });
    console.log(user.isAdmin);

    const token = jwt.sign(
      {
        isAdmin: user.isAdmin,
        email: payload.email,
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
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).required(),
  });

  return schemaUserForm.validate(reqBody);
};

export default router;
