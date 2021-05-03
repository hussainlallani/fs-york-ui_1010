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

Line : 22 - 23
const sql = `INSERT INTO portdb.entries ( name, email, phone, content) VALUES ('${name}','${email}','${phone}', '${content}');`;

Line : 38 - 40
const sql = `SELECT entry_id, name, email, phone, content, timestamp FROM ${process.env.DBNAME}.entries;`;

Line: 56 : 58
const sql = `UPDATE ${process.env.DBNAME}.entries SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

Line 70:
const sql = `DELETE FROM ${process.env.DBNAME}.entries WHERE ${pkText}='${req.params[pkText]}';`;

File Name: users.js

Line : 40 -42
const sql = `SELECT username, is_admin FROM ${process.env.DBNAME}.users;`;

Line : 65 - 67
const sql = `UPDATE ${process.env.DBNAME}.users SET is_admin = ${is_admin} WHERE ${pkText}='${req.params[pkText]}';`;

Line 79:
const sql = `DELETE FROM ${process.env.DBNAME}.users WHERE ${pkText}='${req.params[pkText]}';`;

File Name: info.js
Line Number: 22 - 23
const sql = `INSERT INTO ${process.env.DBNAME}.info ( fname, lname, role, email, phone, linkedin, username) VALUES ( '${fname}', '${lname}', '${role}', '${email}', '${phone}', '${linkedin}', '${username}')`;

Line : 40 - 42
const sql = `SELECT username, fname, lname, role, email, phone, linkedin FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params.username}';`;

Line : 58:60
const sql = `UPDATE ${process.env.DBNAME}.info SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

Line 72:
const sql = `DELETE FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params[pkText]}';`;

File Name: education.js
Line 22:23
const sql = `INSERT INTO ${process.env.DBNAME}.education ( course_degree, from_to, place_of_study, username) VALUES ( '${course_degree}', '${from_to}', '${place_of_study}', '${username}')`;

Line 40:41
const sql = `SELECT education_id, course_degree, from_to, place_of_study, username FROM ${process.env.DBNAME}.education WHERE ${pkText} = '${req.params[pkText]}';`;

Line : 57
const sql = `UPDATE ${process.env.DBNAME}.education SET ${query} WHERE education_id=${req.params.education_id} && username='${req.params.username}';`;

Line : 70
const sql = `DELETE FROM ${process.env.DBNAME}.info WHERE ${pkText}='${req.params[pkText]}';`;

Filename: summary.js
Line 22:23
const sql = `INSERT INTO ${process.env.DBNAME}.summary ( summary, username) VALUES ( '${summary}', '${username}')`;

Line 40:42
const sql = `SELECT summary FROM ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params.username}';`;

Line 58:60
const sql = `UPDATE ${process.env.DBNAME}.summary SET ${query} WHERE ${pkText}='${req.params[pkText]}';`;

Line : 72
const sql = `DELETE FROM ${process.env.DBNAME}.summary WHERE ${pkText}='${req.params[pkText]}';`;

Works in Progress
Note: there are still some console.logs and alerts in the code for testing purposes.

Experiences
Skills
Languages
Collective Display Page
