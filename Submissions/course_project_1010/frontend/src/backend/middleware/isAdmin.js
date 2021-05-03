import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, `${process.env.PRIVATEKEY}`);
    console.log(decoded.is_admin);
    if (decoded.is_admin) {
      next();
    } else {
      return res.status(403).send("Access is denied.");
    }
  } catch (error) {
    return res.status(401).send(`{"${error.name}" : "${error.message}"}`);
  }
};

export { isAdmin };
