DROP DATABASE IF EXISTS stocks_db;
CREATE DATABASE stocks_db;

USE stocks_db;


CREATE TABLE users (
	id int(11) NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	createdAt datetime NOT NULL,
	updatedAt datetime NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY `username` (username)
)

SELECT * FROM users


