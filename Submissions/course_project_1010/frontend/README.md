ReadMe

To run emr-app log into GitLab and navigate to the following repository:https://github.com/hussainlallani/fs-york-ui_1010/tree/master/Submissions/course_project_1010/frontend

Clone the repository.
https://github.com/hussainlallani/fs-york-ui_1010.git

and browse to s-york-ui_1010/Submissions/course_project_1010/frontend/

Create mySQL Database using included .sql files - use emrconn.sql file in Assets/Documents (includes dummy data).

Database connection setup details see below in .env.

Go to the root folder emr.app and create an .ENV file. Add the following information:

PORT=3000
REACT_APP_SERVERPORT=3001
PRIVATEKEY="anykey"
DBHOST="localhost"
DBUSER="nodeclient"
DBPASSWORD="123456"
DBNAME ="portdb"

Note: When we do a push .ENV file gets ignored.

Open command line.

Navigate to the frontend directory.
.

Run the following command to install dependencies:

npm i

Run the following command:

npm start.

The application will start on port localhost:9001.

You can log in to the app as an admin using the following credentials:

User ID: admin9@admin.com

Password: 12345678

SQL Statements
Note: the following files are all in the folder emr-app > src > routes
File Name: entries.js

Line : 20 - 34
const { name, email, phone, content } = req.body;

const sql = `INSERT INTO portdb.entries ( name, email, phone, content) VALUES ('${name}','${email}','${phone}', '${content}');`;

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

Line : 38 - 47
const sql = `SELECT entry_id, name, email, phone, content, timestamp FROM ${process.env.DBNAME}.entries;`;

try {
const results = await db.query(sql);
return res.status(200).send(results);
} catch (error) {
return res.status(404).json(error.message);
}

Line: 51 : 66
let query = [];
Object.entries(req.body).map((entry) => {
query.push(`${entry[0]} = '${entry[1]}'`);
});

const sql = `UPDATE ${process.env.DBNAME}.entries SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

// Apply update
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(500).json(error);
}

Line 70:76
const sql = `DELETE FROM ${process.env.DBNAME}.entries WHERE ${pkText}='${req.params[pkText]}';`;
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(404).json(error);
}

File Name: users.js

Line : 19 -36
let { username, password, is_admin } = req.body;

const sql = (hashedPwd) => {
return `INSERT INTO ${process.env.DBNAME}.users ( username, password, is_admin) VALUES ('${username}','${hashedPwd}',${is_admin})`;
};

try {
// Hash Password
const hashedPwd = await hashPwd(password);
const results = await db.query(sql(hashedPwd));
dbStatus(res, results);
} catch (error) {
if (error.errno === 1062) {
return res.status(409).json(error.message);
}
return res.status(500).json(error);
}

Line : 40 - 50
let { username, password, is_admin } = req.body;

const sql = (hashedPwd) => {
return `INSERT INTO ${process.env.DBNAME}.users ( username, password, is_admin) VALUES ('${username}','${hashedPwd}',${is_admin})`;
};

try {
// Hash Password
const hashedPwd = await hashPwd(password);
const results = await db.query(sql(hashedPwd));
dbStatus(res, results);
} catch (error) {
if (error.errno === 1062) {
return res.status(409).json(error.message);
}
return res.status(500).json(error);
}

Line 60:75
const { username, is_admin } = req.body;

// Get payload
const payload = { username, is_admin };

const sql = `UPDATE ${process.env.DBNAME}.users SET is_admin = ${is_admin} WHERE ${pkText}='${req.params[pkText]}';`;

// Apply update
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(500).json(error);
}

Line 79:86
const sql = `DELETE FROM ${process.env.DBNAME}.users WHERE ${pkText}='${req.params[pkText]}';`;
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
console.log(error);
return res.status(404).json(error);
}

File Name: info.js
Line Number: 20 - 36
const { fname, lname, role, email, phone, linkedin, username } = req.body;

const sql = `INSERT INTO ${process.env.DBNAME}.info ( fname, lname, role, email, phone, linkedin, username) VALUES ( '${fname}', '${lname}', '${role}', '${email}', '${phone}', '${linkedin}', '${username}')`;

try {
const result = await db.query(sql);
if (result.affectedRows !== 0) {
return res.status(200).json(`${pkText}, successfully created!`);
} else {
return res.status(400).json(`${pkText}, not created!`);
}
} catch (error) {
if (error.errno === 1062) return res.status(409).json(error.sqlMessage);
return res.status(500).json(error);
}
});

Line : 39 - 49
const { username } = req.body;
const sql = `SELECT username, fname, lname, role, email, phone, linkedin FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params.username}';`;

try {
const results = await db.query(sql);
return res.status(200).send(results);
} catch (error) {
return res.status(404).json(error.message);
}

Line : 53:68
let query = [];
Object.entries(req.body).map((entry) => {
query.push(`${entry[0]} = '${entry[1]}'`);
});

const sql = `UPDATE ${process.env.DBNAME}.info SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(500).json(error);
}

Line 72-77:
const sql = `DELETE FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params[pkText]}';`;
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(404).json(error);

File Name: education.js
Line 20:31
const { course_degree, from_to, place_of_study, username } = req.body;

const sql = `INSERT INTO ${process.env.DBNAME}.education ( course_degree, from_to, place_of_study, username) VALUES ( '${course_degree}', '${from_to}', '${place_of_study}', '${username}')`;

try {
const result = await db.query(sql);
if (result.affectedRows !== 0) {
return res.status(200).json(`${pkText}, successfully created!`);
} else {
return res.status(400).json(`${pkText}, not created!`);
}

Line 39:48
const { username } = req.body;
const sql = `SELECT education_id, course_degree, from_to, place_of_study, username FROM ${process.env.DBNAME}.education WHERE ${pkText} = '${req.params[pkText]}';`;

try {
const results = await db.query(sql);
return res.status(200).send(results);
} catch (error) {
return res.status(404).json(error.message);
}

Line : 52-66
let query = [];
Object.entries(req.body).map((entry) => {
query.push(`${entry[0]} = '${entry[1]}'`);
});

const sql = `UPDATE ${process.env.DBNAME}.education SET ${query} WHERE education_id=${req.params.education_id} && username='${req.params.username}';`;

// Apply update
try {
const results = await db.query(sql);
console.log(results);
dbStatus(res, results);
} catch (error) {
return res.status(500).json(error);
}

Line : 70-76
const sql = `DELETE FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params[pkText]}';`;
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(404).json(error);
}

Filename: summary.js
Line 20:35
const { summary, username } = req.body;

const sql = `INSERT INTO ${process.env.DBNAME}.summary ( summary, username) VALUES ( '${summary}', '${username}')`;

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

Line 39:49
const { username } = req.body;
const sql = `SELECT summary FROM ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params.username}';`;

try {
const results = await db.query(sql);
return res.status(200).send(results);
} catch (error) {
return res.status(404).json(error.message);
}

Line 53:68
let query = [];
Object.entries(req.body).map((entry) => {
query.push(`${entry[0]} = '${entry[1]}'`);
});

const sql = `UPDATE ${process.env.DBNAME}.summary SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

// Apply update
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(500).json(error);
}

Line : 72:78
const sql = `DELETE FROM ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params[pkText]}';`;
try {
const results = await db.query(sql);
dbStatus(res, results);
} catch (error) {
return res.status(404).json(error);
}

Works in Progress
Note: there are still some console.logs and alerts in the code for testing purposes.

Experiences
Skills
Languages
Collective Display Page
