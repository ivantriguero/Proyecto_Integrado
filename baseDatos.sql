-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: proyectointegrado
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `Administrador`
--

DROP TABLE IF EXISTS `Administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Administrador` (
  `idAdministrador` int NOT NULL,
  `nombreAdministrador` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`),
  CONSTRAINT `fk_Administrador1` FOREIGN KEY (`idAdministrador`) REFERENCES `Usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administrador`
--

LOCK TABLES `Administrador` WRITE;
/*!40000 ALTER TABLE `Administrador` DISABLE KEYS */;
INSERT INTO `Administrador` VALUES (14,'Iván Triguero Curado');
/*!40000 ALTER TABLE `Administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donacion`
--

DROP TABLE IF EXISTS `Donacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donacion` (
  `idDonacion` int NOT NULL AUTO_INCREMENT,
  `idProyecto` int DEFAULT NULL,
  `idDonante` int DEFAULT NULL,
  `cantidadDonacion` decimal(7,2) DEFAULT NULL,
  `fechaDonacion` date DEFAULT NULL,
  PRIMARY KEY (`idDonacion`),
  KEY `idDonante_idx` (`idDonante`),
  KEY `idProyecto_idx` (`idProyecto`),
  CONSTRAINT `idDonante` FOREIGN KEY (`idDonante`) REFERENCES `Donante` (`idDonante`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idProyecto` FOREIGN KEY (`idProyecto`) REFERENCES `Proyecto` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donacion`
--

LOCK TABLES `Donacion` WRITE;
/*!40000 ALTER TABLE `Donacion` DISABLE KEYS */;
INSERT INTO `Donacion` VALUES (3,6,41,10.00,'2022-06-16');
/*!40000 ALTER TABLE `Donacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donante`
--

DROP TABLE IF EXISTS `Donante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donante` (
  `idDonante` int NOT NULL,
  `nombreDonante` varchar(50) DEFAULT NULL,
  `dniDonante` varchar(9) DEFAULT NULL,
  `telefonoDonante` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDonante`),
  CONSTRAINT `fk_Donante1` FOREIGN KEY (`idDonante`) REFERENCES `Usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donante`
--

LOCK TABLES `Donante` WRITE;
/*!40000 ALTER TABLE `Donante` DISABLE KEYS */;
INSERT INTO `Donante` VALUES (41,'Pepe Grillo','47589653F','589456995'),(42,'Fernando Martínez Gutiérrez','48568957F','658987551'),(43,'Antonio Gavira Gavira','57884596C','658998213'),(44,'Manuel Fernández Martínez','45965233G','659332412'),(45,'Samuel Rodríguez Ayala','59332102B','665325554'),(56,'Felipe Gutiérrez Troncoso','58698562C','659885421'),(57,'','',''),(64,'pepe pereda','4758754C','658985662'),(123,'Iván Triguero Curado','47555729D','619831646'),(124,'Iván Triguero Curado','47555729D','619831646'),(126,'awfn','fawwn','awlfk');
/*!40000 ALTER TABLE `Donante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ONG`
--

DROP TABLE IF EXISTS `ONG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ONG` (
  `idONG` int NOT NULL,
  `nombreONG` varchar(50) DEFAULT NULL,
  `descripcionONG` varchar(400) DEFAULT NULL,
  `direccionONG` varchar(100) DEFAULT NULL,
  `telefonoONG` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`idONG`),
  CONSTRAINT `fk_ONG_1` FOREIGN KEY (`idONG`) REFERENCES `Usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ONG`
--

LOCK TABLES `ONG` WRITE;
/*!40000 ALTER TABLE `ONG` DISABLE KEYS */;
INSERT INTO `ONG` VALUES (66,'Cruz Roja','El Movimiento Internacional de la Cruz Roja y de la Media Luna Roja, comúnmente conocido como la Cruz Roja o la Media Luna Roja, es un movimiento humanitario mundial de características particulares','calle cruz roja, 1','555222111'),(69,'Caritas','Caritas Internationalis es una organización perteneciente a la Iglesia católica que agrupa 165 organizaciones nacionales de asistencia, desarrollo y servicio social.​Se dedica al combate contra la pobreza, la exclusión, la intolerancia y la discriminación.','calle caritas número 2','555888777'),(107,'ONG Triguero','afnwaijfn','aojfnawjn','awijnfaw'),(118,'Ivan Triguero Curado','ajnfajfn','aon','619831646'),(122,'ONG Triguero','ONG de Prueba','Mi casa','619831646'),(125,'ONG Triguero','Una ong de prueba no se que más','Mi casa','619831646');
/*!40000 ALTER TABLE `ONG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proyecto`
--

DROP TABLE IF EXISTS `Proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proyecto` (
  `idProyecto` int NOT NULL AUTO_INCREMENT,
  `tituloProyecto` varchar(45) DEFAULT NULL,
  `descripcionProyecto` varchar(500) DEFAULT NULL,
  `dineroProyecto` decimal(8,2) DEFAULT NULL,
  `fechaProyecto` date DEFAULT NULL,
  `fechaLimiteProyecto` date DEFAULT NULL,
  `idONG` int DEFAULT NULL,
  `dineroObjetivoProyecto` int DEFAULT NULL,
  PRIMARY KEY (`idProyecto`),
  KEY `idONG_FK_idx` (`idONG`),
  CONSTRAINT `idONG_FK` FOREIGN KEY (`idONG`) REFERENCES `ONG` (`idONG`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proyecto`
--

LOCK TABLES `Proyecto` WRITE;
/*!40000 ALTER TABLE `Proyecto` DISABLE KEYS */;
INSERT INTO `Proyecto` VALUES (6,'proyecto3','Proyecto de prueba\n',0.00,'2022-06-14','2023-05-12',107,NULL),(7,'anwanfaw','awnawjf',0.00,'2022-05-11','2023-01-15',NULL,5),(8,'afwa','aw',0.00,'2022-06-14','2023-12-14',107,NULL),(9,'Proyecto de prueba','znfaonf',0.00,'2022-05-28','2022-06-28',118,NULL),(10,'aa','awfwanfjk',0.00,'2022-05-29','2022-12-17',118,NULL),(11,'Proyecto Prueba','Proyecto Prueba',0.00,'2022-05-31','2022-12-17',122,NULL),(12,'adaw','fawf',0.00,'2022-06-12','2022-06-17',125,NULL),(15,'adaw','afwfa',0.00,'2022-06-12','2022-06-24',125,NULL);
/*!40000 ALTER TABLE `Proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `emailUsuario` varchar(50) DEFAULT NULL,
  `claveUsuario` varchar(40) DEFAULT NULL,
  `tipoUsuario` varchar(10) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `confirmado` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (14,'root','dc76e9f0c0006e8f919e0c515c66dbba3982f785','admin',NULL,1),(16,'pruebaong','711383a59fda05336fd2ccf70c8059d1523eb41a','ong',NULL,0),(41,'pepe@grillo.com','94bc6a880cd87927e76ddeae1f0389396da778d5','don',NULL,1),(42,'fernandomartinez@gmail.com','e7158b7c9e8d5aae8e7b54690affc3e02d8cca9f','don',NULL,1),(43,'antoniogavira@gmail.com','1757f7aa9cb1fcdfd4eeb0b1c1ae74050dbc64a9','don',NULL,1),(44,'manuelfema@gmail.com','16b238fdbc4d115ec87032f43230d4c30a750d82','don',NULL,1),(45,'samuroay@gmail.com','3ccbf094cb3da5c6fd20e70014cd70b9d8bb532b','don',NULL,1),(56,'felipegutierrez@gmail.com','fmaekmfakm','don',NULL,1),(57,'a@a.com','da39a3ee5e6b4b0d3255bfef95601890afd80709','don',NULL,1),(64,'dwamkawd@cwacaw','4fc7852e873565ac350fed3aaa51d9eb752ce8f8','don',NULL,1),(66,'cruzroja@ong.es','44068d7b35da58d6e1e25421971662b67f1de9fa','ong',NULL,0),(67,'Caritas@ong.com','4d778f53588f74418e9a833a65e3c45c3bb61d2a','don',NULL,1),(68,'Caritas@ong.com','4d778f53588f74418e9a833a65e3c45c3bb61d2a','don',NULL,1),(69,'Caritas@ong.com','4d778f53588f74418e9a833a65e3c45c3bb61d2a','don',NULL,1),(109,'donante','2130fe111bf5168ab79afdb170bbf3560945622e','don','',1),(125,'ivantriguero17@gmail.com','8cb2237d0679ca88db6464eac60da96345513964','ong',NULL,1),(126,'prueba@prueba','8cb2237d0679ca88db6464eac60da96345513964','don','19374e7a-0827-4839-8169-d77a87ec539a',0);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-18 14:40:32
