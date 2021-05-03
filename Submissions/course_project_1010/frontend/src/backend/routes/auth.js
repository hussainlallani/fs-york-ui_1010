import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
// import * as db from "../utilities/jsonHandler.js";
import { db } from "../database/connection.js";

const router = express.Router();

const getCredentials = (req) => {
  return new Promise((resolve, reject) => {
    // Validate input
    const { error } = validateAuthForm(req.body);
    if (error) return reject(error.details[0].message);

    let { username, password } = req.body;

    const payload = {
      username,
      password,
    };

    return resolve(payload);
  });
};

const validateUser = (userCredentials, usersFullCredentials) => {
  return new Promise(async (resolve, reject) => {
    const index = usersFullCredentials.findIndex(
      (userFullCredentials) =>
        userFullCredentials.username === userCredentials.username
    );

    if (index === -1) {
      return reject({ error: "Invalid ID or password.", status: 400 });
    } else {
      try {
        const validPassword = await bcrypt.compare(
          userCredentials.password,
          usersFullCredentials[index].password
        );
        if (!validPassword)
          return reject({ error: "Invalid password.", status: 401 });
        return resolve(usersFullCredentials[index]);
      } catch (error) {
        return reject(error);
      }
    }
  });
};

const getToken = (validUser) => {
  const payload = {
    username: validUser.username,
    is_admin: validUser.is_admin,
  };
  return jwt.sign(payload, `${process.env.PRIVATEKEY}`);
};

router.post("/", async (req, res) => {
  const sql = `SELECT username, password, is_admin
  FROM
    portdb.users;`;

  try {
    const userCredentials = await getCredentials(req);
    const usersFullCredentials = await db.query(sql);
    const validUser = await validateUser(userCredentials, usersFullCredentials);
    const token = getToken(validUser);
    return res.status(201).json({ token: token });
  } catch (error) {
    if (error.status == 400) {
      return res.status(400).json({ message: "Invalid email or password!" });
    } else {
      return res.status(500).send(error);
    }
  } finally {
  }
});

const validateAuthForm = (reqBody) => {
  const schemaUserForm = Joi.object({
    username: Joi.string().email().min(5).required(),
    password: Joi.string().min(8).required(),
  });

  return schemaUserForm.validate(reqBody);
};

export default router;
// ---

// router.post("/", async (req, res) => {
//   // Validate input
//   const { error } = validateAuthForm(req.body);
//   if (error) {
//     console.log(error.details[0].message);
//     return res
//       .status(400)
//       .send({ message: "Validation Error", Error: error.details[0].message });
//   }

//   const { username, password } = req.body;

//   const sql = `SELECT username, password, isadmin FROM portdb.users;`;

//   conn.query(sql, function (err, result) {
//     if (err) throw err;
//     const user = result.find((props) => props.username === username);
//     // console.log(user);
//     if (user === undefined)
//       return res.status(400).json({ message: "Invalid email or password!" });
//   });

//   try {
//     const validPassword = await bcrypt.compare(password, user.password);
//     console.log(validPassword);
//     if (!validPassword)
//       return res.status(400).json({ message: "Invalid email or password!" });

//     const token = jwt.sign(
//       {
//         isAdmin: user.isAdmin,
//         username: user.username,
//       },
//       `${process.env.PRIVATEKEY}`
//     );
//     return res.status(201).json({ token: token });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

// const validateAuthForm = (reqBody) => {
//   const schemaUserForm = Joi.object({
//     username: Joi.string().min(5).email().required(),
//     password: Joi.string().min(8).required(),
//   });

//   return schemaUserForm.validate(reqBody);
// };

// export default router;
