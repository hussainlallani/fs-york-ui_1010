CREATE DATABASE IF NOT EXISTS portdb;

CREATE TABLE IF NOT EXISTS portdb.entries ( 
	entry_id             int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	name                 varchar(255)  NOT NULL    ,
	email                varchar(255)  NOT NULL    ,
	phone                varchar(15)  NOT NULL    ,
	content              text  NOT NULL    
 );


CREATE TABLE IF NOT EXISTS portdb.users ( 
	user_id              int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	username             varchar(255)  NOT NULL    ,
	password             varchar(255)  NOT NULL    ,
	isadmin              boolean  NOT NULL DEFAULT 0   
 );
