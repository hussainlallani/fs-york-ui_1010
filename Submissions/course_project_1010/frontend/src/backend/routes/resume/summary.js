import express from "express";
const router = express.Router();
import { isAuth } from "../../middleware/isAuth.js";
import { isAdmin } from "../../middleware/isAdmin.js";
// import { verifyToken } from "../middleware/jwtVerify.js";
import Joi from "joi";
// import * as db from "../utilities/jsonHandler.js";
import { db } from "../../database/connection.js";

// Declare primary(param) key
var pkText = "username";

router.post("/", async (req, res) => {
  // Validate input
  const { error } = validatePayload(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const { summary, username } = req.body;

  const sql = `INSERT INTO ${process.env.DBNAME}.summary
    ( summary, username) VALUES ( '${summary}', '${username}')`;

  try {
    const result = await db.query(sql);
    if (result.affectedRows !== 0) {
      return res.status(200).json(`Database updated!`);
    } else {
      return res.status(400).json(`Database failed to be updated!`);
    }
  } catch (error) {
    if (error.errno === 1062) return res.status(409).json(error.sqlMessage);
    return res.status(500).json(error);
  }
});

router.get(`/:${pkText}`, async (req, res) => {
  const { username } = req.body;
  const sql = `SELECT summary
  FROM
    ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params.username}';`;

  try {
    const results = await db.query(sql);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

router.put(`/:${pkText}`, async (req, res) => {
  let query = [];
  Object.entries(req.body).map((entry) => {
    query.push(`${entry[0]} = '${entry[1]}'`);
  });

  const sql = `UPDATE ${process.env.DBNAME}.summary  
    SET ${query} 
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
  const sql = `DELETE FROM ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params[pkText]}';`;
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
  } catch (error) {
    return res.status(404).json(error);
  }
});

function validatePayload(reqBody) {
  const schemaContactForm = Joi.object({
    summary: Joi.string().min(2).required(),
    username: Joi.string().min(2).required(),
  });

  return schemaContactForm.validate(reqBody);
}

const dbStatus = (res, results) => {
  if (results.affectedRows !== 0)
    return res.status(200).json(`Database successfully updated!`);
  return res.status(400).json(`Error: database not updated!!`);
};

export default router;
