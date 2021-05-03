CREATE DATABASE  IF NOT EXISTS `portdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `portdb`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: portdb
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `education_id` int NOT NULL AUTO_INCREMENT,
  `course_degree` varchar(255) NOT NULL,
  `from_to` varchar(20) NOT NULL,
  `place_of_study` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`education_id`),
  KEY `fk_education_users` (`username`),
  CONSTRAINT `fk_education_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (2,'MBA','2009-2011','IoBM','admin9@admin.com');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entries` (
  `entry_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`entry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (2,'Hussain','new@email.com','1234567890','Message','2021-05-01 23:13:08'),(3,'Lallani','lallanihussain@gmail.com','9999999999','Message 2','2021-05-01 23:13:08'),(4,'Max P','dfds@sds.com','9999999999','Message 3','2021-05-01 23:13:08'),(5,'Ken','dfds@sds.com','9999999999','Message 4','2021-05-01 23:13:08'),(6,'Name 5','five@sds.com','555555','Message 5','2021-05-01 23:13:08'),(11,'Ali','asa@lk.com','1234567890','nothng','2021-05-01 23:13:08'),(12,'Ali','asa@lk.com','1234567890','nothng','2021-05-01 23:13:08'),(13,'FROM WEB','FROM@WEB.COM','9999999999','FROM WEB\n','2021-05-01 23:13:08'),(14,'Ali','asa@lk.com','undefined','nothng','2021-05-02 07:16:25'),(15,'New Member','Newest@newly.com','undefined','New Message','2021-05-02 07:21:33'),(16,'New Member','Newest@newly.com','undefined','New Message','2021-05-02 07:21:46'),(17,'New','Newest@newly.com','undefined','Mello!','2021-05-02 07:28:30');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `experience_id` int NOT NULL AUTO_INCREMENT,
  `company_and_role` varchar(255) NOT NULL,
  `from_to` varchar(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`experience_id`),
  KEY `fk_experiences_users` (`username`),
  CONSTRAINT `fk_experiences_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (1,'Exponet - Digital Designer','2019-2020','admin9@admin.com',0),(2,'Exponet - Graphic Designer','2019-2020','admin9@admin.com',1),(3,'Exponet - Graphic Designer','2019-2020','admin9@admin.com',1),(4,'Exponet - Graphic Designer','2019-2020','admin9@admin.com',0),(5,'Exponet - Graphic Designer','2019-2020','admin9@admin.com',1),(6,'Exponet - Digital Designer','2019-2020','admin9@admin.com',0),(7,'Exponet - Graphic Designer','2019-2020','admin9@admin.com',1),(8,'HBL - Brand Manager','2014-2015','admin9@admin.com',1),(9,'ZARA','2016-2017','admin9@admin.com',1),(10,'KASB GROUP - Communication Manager','2016-2017','admin9@admin.com',0),(11,'KASB GROUP - Communication Manager','2016-2017','admin9@admin.com',1),(12,'Exponet Canada','2012','admin9@admin.com',1),(13,'Exponet Canada','2012','admin9@admin.com',1),(14,'skjsds','wqeqwe','admin9@admin.com',1),(15,'32234','3424','admin9@admin.com',1);
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `info` (
  `fname` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `fk_info_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES ('Hussain','Sam','jhk','dfds@sds.com','12532634879','dsjlkfjsd','admin@admin.com'),('Hussain','Back-end Developer','Lallani','lallanihussain@gmail.com','647-000-0000','linkedin.com/hussainlallani','admin9@admin.com');
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_desc_resp`
--

DROP TABLE IF EXISTS `job_desc_resp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_desc_resp` (
  `job_desc_resp_id` int NOT NULL AUTO_INCREMENT,
  `experience_id` int DEFAULT NULL,
  `job_resp_id` int DEFAULT NULL,
  PRIMARY KEY (`job_desc_resp_id`),
  KEY `fk_job_desc_resp_experiences` (`experience_id`),
  KEY `fk_job_desc_resp_job_resp` (`job_resp_id`),
  CONSTRAINT `fk_job_desc_resp_experiences` FOREIGN KEY (`experience_id`) REFERENCES `experiences` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_job_desc_resp_job_resp` FOREIGN KEY (`job_resp_id`) REFERENCES `job_resp` (`job_resp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_desc_resp`
--

LOCK TABLES `job_desc_resp` WRITE;
/*!40000 ALTER TABLE `job_desc_resp` DISABLE KEYS */;
INSERT INTO `job_desc_resp` VALUES (1,1,1),(2,6,6),(4,10,11),(5,4,12),(6,12,14),(7,13,15),(8,14,16),(9,15,17);
/*!40000 ALTER TABLE `job_desc_resp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_resp`
--

DROP TABLE IF EXISTS `job_resp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_resp` (
  `job_resp_id` int NOT NULL AUTO_INCREMENT,
  `job_resp` varchar(255) NOT NULL,
  PRIMARY KEY (`job_resp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_resp`
--

LOCK TABLES `job_resp` WRITE;
/*!40000 ALTER TABLE `job_resp` DISABLE KEYS */;
INSERT INTO `job_resp` VALUES (1,'Web Development'),(2,'Web Developer'),(3,'Web Developer'),(4,'Web Developer'),(5,'Web Developer'),(6,'Web Development'),(7,'Web Developer'),(8,'Brand Management'),(9,'TEAM LEAD'),(11,'Communication Specialist'),(12,'Communication Specialist'),(13,'Communication Specialist'),(14,'fdsfsdf'),(15,'fdsfsdf'),(16,'jhdjasdasd'),(17,'234234');
/*!40000 ALTER TABLE `job_resp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `language` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `fk_languages_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `skills` text NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `fk_skills_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `summary`
--

DROP TABLE IF EXISTS `summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `summary` (
  `summary` text NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `fk_summary_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `summary`
--

LOCK TABLES `summary` WRITE;
/*!40000 ALTER TABLE `summary` DISABLE KEYS */;
INSERT INTO `summary` VALUES ('Revised','admin@admin.com'),('Revised Summary New','admin9@admin.com');
/*!40000 ALTER TABLE `summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `isactive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin@admin.com','$2b$10$BFRiU.5KybcHNf8B/uRUaexpcLdhhrEXHGjNkHQjuDUIW7HfcuBEG',1,1),('admin10@admin.com','$2b$10$XfLpJz17udSN6ra1kL0hvuzvLbw6XIOjPqEo8b6eqSKd5uaGJce8a',1,1),('admin11@admin.com','$2b$10$BATLUvv3tt6gVvftTLAKQeAP1gdfYPm2.1.nsRb0o7M33dX3lNoHi',1,1),('admin12@admin.com','$2b$10$nLdr3BS/m07BQcyhdoERZOGdJWTKWpTQ1jVz1cv9w5xB3g9PJeLTS',1,1),('admin13@admin.com','$2b$10$PUqQMnDOq6oZTOoyM1CrYeOKAoNcbi/gz4tsuASIw2Y2JYIF6cWK6',1,1),('admin14@admin.com','$2b$10$Rj3JFqS8OR39HI6IUZxXc.mZTfLUTbvuRo3fjPQYIGY8.VVc7O8Cq',1,1),('admin16@admin.com','$2b$10$/66kL3yQ50wUHXq2P2xHx.XJi3mXqDAyFTaBA1IETK5j5U5T8hqwS',1,1),('admin17@admin.com','$2b$10$TvOnF0IsohJxik8dk9Q.Ze197uiT9Dlvbt11ax8R6iz5nHZ0tqvpa',1,1),('admin18@admin.com','$2b$10$fYZaI1xVB85h6WWPM994uOuEK3QzL487GJ87VT.iSW07mlkY/i2KS',1,1),('admin19@admin.com','$2b$10$6KGn7BO.NtsFjNW5xTCiOe1l1oAVvfNte49FbKrdMwP7tH2cbuNo.',1,1),('admin2@admin.com','$2b$10$EgO7VdazNcoCegwpz4RRrOHi4lG8Cunj7i83wKM/lh7lSzmxqhz3.',0,1),('admin3@admin.com','$2b$10$xRMckm2eqQsUy2pGJ/3hy.jYsFbniAw0VHH.0qNy0zrj8A2uvNLMG',1,1),('admin4@admin.com','$2b$10$R/4FMJ2w9ANK0eU3diQ9G.CUQHy8cN6y4evlm3shSyROaSdsYEvlK',1,1),('admin5@admin.com','$2b$10$JvaOJQ3onxYqhE6opYAShOmcyySe52HyivhoD8zCX88yCVYuABJoS',1,1),('admin6@admin.com','$2b$10$.TdjOSG2XSOcXORy9tipVOmj.mBNomvgW5oEvIBjIYk7xSQ6TM.k.',0,1),('admin7@admin.com','$2b$10$mH8kRAjRvAcN0TOHbFE/beKuwTu8v6Jib0XNrPxlLSrPxO9ONs7hq',1,1),('admin8@admin.com','$2b$10$vdnkPShpLVy/GSlQk939AO1EwhzMrzDesiwKi0s2Qu.20Ap.PD1oK',1,1),('admin9@admin.com','$2b$10$xCYZoydJ8Z7PKlz4gNnCC.QtQhInWWHi6AxmydcD5sn9K3Dzqpb4O',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03  0:06:14
