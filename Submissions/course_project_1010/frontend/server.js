import express from "express";
import cors from "cors";
import auth from "./src/backend/routes/auth.js";
import users from "./src/backend/routes/users.js";
import entries from "./src/backend/routes/entries.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", auth);
app.use("/contact_form/entries", entries);
app.use("/users", users);

app.get("*", (req, res) => {
  const err = new Error("An invalid URL");
  return res.status(404).send(err.message);
});

const port = process.env.REACT_APP_SERVERPORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

process.on("uncaughtException", function (err) {
  if (err.errno === "EADDRINUSE") console.log("PORT in USE");
  else console.log(err);
  process.exit(1);
});
