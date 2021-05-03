import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, `${process.env.PRIVATEKEY}`);
    next();
  } catch (error) {
    res.status(400).send(`{"${error.name}" : "${error.message}"}`);
    return res.redirect("/login");
  }
};

export { isAuth };
