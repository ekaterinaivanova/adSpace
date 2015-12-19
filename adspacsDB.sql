﻿-- Script was generated by Devart dbForge Studio for MySQL, Version 6.0.622.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 19-Dec-15 3:11:53 PM
-- Server version: 5.6.26
-- Client version: 4.1

USE adspace;

DROP TABLE IF EXISTS company;
CREATE TABLE company (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  email varchar(50) NOT NULL,
  password varchar(250) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 13
AVG_ROW_LENGTH = 1489
CHARACTER SET latin1
COLLATE latin1_swedish_ci;

DROP TABLE IF EXISTS users_adspace;
CREATE TABLE users_adspace (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(50) NOT NULL,
  name varchar(50) DEFAULT NULL,
  lastname varchar(50) DEFAULT NULL,
  points int(11) NOT NULL DEFAULT 0,
  password varchar(250) NOT NULL,
  PRIMARY KEY (user_id)
)
ENGINE = INNODB
AUTO_INCREMENT = 7
AVG_ROW_LENGTH = 2730
CHARACTER SET latin1
COLLATE latin1_swedish_ci;

DROP TABLE IF EXISTS offers;
CREATE TABLE offers (
  id int(11) NOT NULL AUTO_INCREMENT,
  company_id int(11) NOT NULL,
  rules varchar(255) NOT NULL,
  name varchar(50) NOT NULL,
  hashtags varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX company_id (company_id),
  CONSTRAINT offers_ibfk_1 FOREIGN KEY (company_id)
  REFERENCES company (id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 10
AVG_ROW_LENGTH = 1820
CHARACTER SET latin1
COLLATE latin1_swedish_ci;

DROP TABLE IF EXISTS user_offers;
CREATE TABLE user_offers (
  user_ID int(11) NOT NULL,
  offer_ID int(11) NOT NULL,
  CONSTRAINT FK_user_offers_offers_id FOREIGN KEY (offer_ID)
  REFERENCES offers (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_user_offers_users_adspace_user_id FOREIGN KEY (user_ID)
  REFERENCES users_adspace (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AVG_ROW_LENGTH = 2048
CHARACTER SET latin1
COLLATE latin1_swedish_ci;