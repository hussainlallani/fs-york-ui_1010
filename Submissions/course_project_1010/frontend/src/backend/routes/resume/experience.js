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
  // const { error } = validateContactForm(req.body);
  // if (error) {
  //   return res.status(400).json(error.details[0].message);
  // }

  const { company_and_role, from_to, job_resp, username } = req.body;

  const sql1 = `INSERT INTO ${process.env.DBNAME}.experiences (company_and_role, from_to, username) VALUES ( "${company_and_role}", "${from_to}", "${username}");`;

  const sql2 = `SET @EXP_ID = LAST_INSERT_ID();`;

  const sql3 = `INSERT INTO ${process.env.DBNAME}.job_resp (job_resp) VALUES ( "${job_resp}" );`;

  const sql4 = `SET @RESP_ID = LAST_INSERT_ID();`;

  const sql5 = `INSERT INTO ${process.env.DBNAME}.job_desc_resp (experience_id,job_resp_id) VALUES ( @EXP_ID, @RESP_ID );`;

  try {
    await db.beginTransaction();
    await db.query(sql1);
    await db.query(sql2);
    await db.query(sql3);
    await db.query(sql4);
    const results = await db.query(sql5);
    await db.commit();
    dbStatus(res, results);
  } catch (error) {
    if (error.errno === 1062) return res.status(409).json(error.sqlMessage);
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get(`/:${pkText}`, async (req, res) => {
  const sql = `SELECT experience_id, company_and_role, from_to FROM ${process.env.DBNAME}.experiences WHERE username='${req.params[pkText]}';`;

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

  const sql = `UPDATE ${process.env.DBNAME}.info 
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
  const sql = `DELETE FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params[pkText]}';`;
  try {
    const results = await db.query(sql);
    dbStatus(res, results);
  } catch (error) {
    return res.status(404).json(error);
  }
});

function validateContactForm(reqBody) {
  const schemaContactForm = Joi.object({
    fname: Joi.string().min(2).required(),
    lname: Joi.string().min(2).required(),
    role: Joi.string().min(2).required(),
    username: Joi.string().min(2).required(),
    linkedin: Joi.string().min(2).required(),
    email: Joi.string().min(4).email().required(),
    phone: Joi.string().min(10).required(),
  });

  return schemaContactForm.validate(reqBody);
}

const dbStatus = (res, results) => {
  if (results.affectedRows !== 0)
    return res.status(200).json(`Database successfully updated!`);
  return res.status(400).json(`Error: database not updated!!`);
};

export default router;
