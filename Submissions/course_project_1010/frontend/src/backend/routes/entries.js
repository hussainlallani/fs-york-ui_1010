import express from "express";
const router = express.Router();
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
// import { verifyToken } from "../middleware/jwtVerify.js";
import Joi from "joi";
import * as db from "../utilities/jsonHandler.js";

// Declare primary(param) key
var pkText = "id";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateContactForm(req.body);
  if (error) {
    // console.log(error.details[0].message);
    return res.status(400).send({ message: error.details[0].message });
  }

  // Get payload
  const { name, email, phoneNumber, content } = req.body;

  let payload = {
    id: Math.floor(Math.random() * Date.now()),
    name,
    email,
    phoneNumber,
    content,
  };

  try {
    await db.readItems(`${process.env.ENTRIESFILEPATH}`);
    // Insert payload
    await db.createItem(
      `${process.env.ENTRIESFILEPATH}`,
      JSON.parse(JSON.stringify(payload))
    );
    console.log(`Saved to file: ${JSON.parse(JSON.stringify(payload))}`);
    return res.status(201).send(payload);
  } catch (error) {
    if (error.code === "ENOENT") {
      // Insert payload if file not exists
      await db.createItem(
        `${process.env.ENTRIESFILEPATH}`,
        JSON.parse(JSON.stringify(payload))
      );
      console.log(`Saved to file: ${JSON.parse(JSON.stringify(payload))}`);
      return res.status(201).send(payload);
    }
    return res.status(404).json(error.message);
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const entries = await db.readItems(`${process.env.ENTRIESFILEPATH}`);
    if (entries.length === 0 || entries === undefined)
      return res.status(404).json({ message: "Resource not found!" });
    return res.status(200).send(entries);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.put(`\:${pkText}`, async (req, res) => {
  // Validate input
  const { error } = validateContactForm(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Get payload
  const { name, email, phoneNumber, content } = req.body;

  const payload = {
    name,
    email,
    phoneNumber,
    content,
  };

  // Apply update
  try {
    // const pkText = "health_card_number";
    const pkValue = req.params[pkText];
    await db.updateItem(
      pkText,
      pkValue,
      `${process.env.ENTRIESFILEPATH}`,
      payload
    );
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete(`\:${pkText}`, async (req, res) => {
  try {
    const pkValue = req.params[pkText];
    // Apply removal
    await db.removeItem(pkText, pkValue, `${process.env.ENTRIESFILEPATH}`);
    return res.send(
      `The record with ${pkText}# ${pkValue} successfully deleted!`
    );
  } catch (error) {
    return res.status(404).json(error);
  }
});

function validateContactForm(reqBody) {
  const schemaContactForm = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).email().required(),
    phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
    content: Joi.string().max(255).required(),
  });

  return schemaContactForm.validate(reqBody);
}

export default router;
