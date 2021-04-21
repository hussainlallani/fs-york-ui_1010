import express from "express";
const router = express.Router();
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
// import { verifyToken } from "../middleware/jwtVerify.js";
import Joi from "joi";
// import * as db from "../utilities/jsonHandler.js";
import { db } from "../database/connection.js";

// Declare primary(param) key
var pkText = "entry_id";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validateContactForm(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, phoneNumber, content } = req.body;

  const sql = `INSERT INTO portdb.entries
    ( name, email, phone, content) VALUES ('${name}','${email}','${phoneNumber}', '${content}');`;

  try {
    const result = await db.query(sql);
    if (result.affectedRows !== 0) {
      return res.status(200).json(`${pkText}, successfully created!`);
    } else {
      return res.status(400).json(`${pkText}, not created!`);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
  const sql = `SELECT entry_id, name, email, phone, content
  FROM
  ${process.env.DBNAME}.entries;`;

  try {
    const results = await db.query(sql);
    return res.status(200).send(results);
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

  const sql = `UPDATE ${process.env.DBNAME}.entries 
    SET name = ${is_admin}, email = ${email}, phoneNumber = ${phone}. content = ${content} 
    WHERE ${pkText}='${req.params[pkText]}';`;

  // Apply update
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete(`\:${pkText}`, async (req, res) => {
  const sql = `DELETE FROM ${process.env.DBNAME}.entries WHERE ${pkText}='${req.params[pkText]}';`;
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
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

const dbStatus = (res, results) => {
  if (results.affectedRows !== 0)
    return res.status(200).json(`Database successfully updated!`);
  return res.status(400).json(`Error: database not updated!!`);
};

export default router;
