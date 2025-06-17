-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestionbiblioteca
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add libro',7,'add_libro'),(26,'Can change libro',7,'change_libro'),(27,'Can delete libro',7,'delete_libro'),(28,'Can view libro',7,'view_libro');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Novela Literaria','Incluye clásicos y bestsellers'),(2,'Fabula','Clase de historia mitica'),(5,'Historia','Libros sobre eventos históricos'),(6,'Terror','Libros de panico y terror');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'BibliotecaUSB','libro'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'BibliotecaUSB','0001_initial','2025-05-16 02:36:01.513898'),(2,'contenttypes','0001_initial','2025-05-16 02:36:01.583902'),(3,'auth','0001_initial','2025-05-16 02:36:02.252898'),(4,'admin','0001_initial','2025-05-16 02:36:02.396910'),(5,'admin','0002_logentry_remove_auto_add','2025-05-16 02:36:02.408900'),(6,'admin','0003_logentry_add_action_flag_choices','2025-05-16 02:36:02.424902'),(7,'contenttypes','0002_remove_content_type_name','2025-05-16 02:36:02.584901'),(8,'auth','0002_alter_permission_name_max_length','2025-05-16 02:36:02.646897'),(9,'auth','0003_alter_user_email_max_length','2025-05-16 02:36:02.681902'),(10,'auth','0004_alter_user_username_opts','2025-05-16 02:36:02.690895'),(11,'auth','0005_alter_user_last_login_null','2025-05-16 02:36:02.759898'),(12,'auth','0006_require_contenttypes_0002','2025-05-16 02:36:02.763899'),(13,'auth','0007_alter_validators_add_error_messages','2025-05-16 02:36:02.771895'),(14,'auth','0008_alter_user_username_max_length','2025-05-16 02:36:02.845900'),(15,'auth','0009_alter_user_last_name_max_length','2025-05-16 02:36:02.909896'),(16,'auth','0010_alter_group_name_max_length','2025-05-16 02:36:02.936898'),(17,'auth','0011_update_proxy_permissions','2025-05-16 02:36:02.950896'),(18,'auth','0012_alter_user_first_name_max_length','2025-05-16 02:36:03.013896'),(19,'sessions','0001_initial','2025-05-16 02:36:03.048898');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `id_libro` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `editorial` varchar(255) DEFAULT NULL,
  `anio_publicacion` int DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `cantidad_total` int DEFAULT '0',
  `cantidad_disponible` int DEFAULT '0',
  PRIMARY KEY (`id_libro`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES (6,'Jaimito el Cartero_1','Jorge Luis Torrez','Sudamericana',2000,'Clásico','ISBN-006',6,5),(7,'El señor de los anillos','J.R.R. Tolkien','Minotauro',1954,'Fantasía','ISBN-007',8,8),(8,'Harry Potter y la piedra filosofal','J.K. Rowling','Salamandra',1997,'Fantasía','ISBN-008',12,12),(9,'La sombra del viento','Carlos Ruiz Zafón','Planeta',2001,'Misterio','ISBN-009',7,7),(10,'Crónica de una muerte anunciada','Gabriel García Márquez','Sudamericana',1981,'Realismo mágico','ISBN-010',5,4),(11,'El amor en los tiempos del cólera','Gabriel García Márquez','Sudamericana',1985,'Realismo mágico','ISBN-011',6,6),(12,'El principito','Antoine de Saint-Exupéry','Reynal & Hitchcock',1943,'Infantil','ISBN-012',15,15),(13,'El código Da Vinci','Dan Brown','Doubleday',2003,'Misterio','ISBN-013',9,9),(17,'La metamorfosis','Franz Kafka','Kurt Wolff Verlag',1915,'Existencialista','ISBN-017',3,3),(18,'El arte de la guerra','Sun Tzu','Desconocida',-500,'Estratégica','ISBN-018',20,20),(19,'Ulises','James Joyce','Shakespeare and Company',1922,'Modernista','ISBN-019',2,2),(20,'Moby Dick','Herman Melville','Richard Bentley',1851,'Aventura','ISBN-020',5,4),(21,'Drácula','Bram Stoker','Archibald Constable and Company',1897,'Terror','ISBN-021',7,7),(22,'Fahrenheit 451','Ray Bradbury','Ballantine Books',1953,'Ciencia Ficción','ISBN-022',6,6),(23,'El guardián entre el centeno','J. D. Salinger','Little, Brown and Company',1951,'Realista','ISBN-023',8,8),(24,'El retrato de Dorian Gray','Oscar Wilde','Lippincott\'s Monthly Magazine',1890,'Filosófica','ISBN-024',5,5),(25,'La naranja mecánica','Anthony Burgess','William Heinemann',1962,'Ciencia Ficción','ISBN-025',4,4),(26,'El nombre del viento','Patrick Rothfuss','DAW Books',2007,'Fantasía','ISBN-026',9,9),(27,'Los juegos del hambre','Suzanne Collins','Scholastic',2008,'Ciencia Ficción','ISBN-027',12,12),(28,'It','Stephen King','Viking Press',1986,'Terror','ISBN-028',10,10),(29,'El psicoanalista','John Katzenbach','Anagrama',2002,'Thriller','ISBN-029',6,6),(30,'El alquimista','Paulo Coelho','HarperCollins',1988,'Fábula','ISBN-030',15,14),(31,'Cien años de soledad - Edición Especial','Gabriel García Márquez','Sudamericana',1967,'Novela','978-0307474728',15,10),(34,'Don Quijote','Jorge Luis Torrez','Carrasco',1600,'Novela','ISBN-031',5,2),(35,'Cien años de soledad','Gabriel García Márquez','Editorial Sudamericana',1967,'Realismo Mágico','978-1234567890',10,7),(36,'Don Quijote de la Mancha','Miguel de Cervantes','Francisco de Robles',1605,'Novela','978-1234567891',15,10),(37,'Orgullo y prejuicio','Jane Austen','T. Egerton',1813,'Romance','978-1234567892',12,5),(38,'El Principito','Antoine de Saint-Exupéry','Reynal & Hitchcock',1943,'Infantil','978-1234567893',20,15),(39,'1984','George Orwell','Secker & Warburg',1949,'Distopía','978-1234567894',18,8),(40,'Crimen y castigo','Fiódor Dostoyevski','The Russian Messenger',1866,'Drama','978-1234567895',10,4),(41,'El Hobbit','J.R.R. Tolkien','George Allen & Unwin',1937,'Fantasía','978-1234567896',25,20),(42,'Fahrenheit 451','Ray Bradbury','Ballantine Books',1953,'Ciencia Ficción','978-1234567897',14,9),(43,'Matar a un ruiseñor','Harper Lee','J.B. Lippincott & Co.',1960,'Drama','978-1234567898',13,6),(44,'El código Da Vinci','Dan Brown','Doubleday',2003,'Thriller','978-1234567899',30,25),(45,'La sombra del viento','Carlos Ruiz Zafón','Planeta',2001,'Misterio','978-1234567800',22,18),(46,'El Gran Gatsby','F. Scott Fitzgerald','Charles Scribner\'s Sons',1925,'Drama','978-1234567801',17,13),(47,'Hamlet','William Shakespeare','N/A',1603,'Teatro','978-1234567802',40,38),(48,'La Odisea','Homero','N/A',-800,'Épico','978-1234567803',9,3),(49,'El diario de Ana Frank','Ana Frank','Contact Publishing',1947,'Biografía','978-1234567804',28,22),(50,'El nombre de la rosa','Umberto Eco','Bompiani',1980,'Misterio','978-1234567805',16,12),(51,'La Metamorfosis','Franz Kafka','Kurt Wolff Verlag',1915,'Novela corta','978-1234567806',14,7),(52,'Guerra y paz','León Tolstói','The Russian Messenger',1869,'Histórico','978-1234567807',11,4),(53,'El alquimista','Paulo Coelho','HarperTorch',1988,'Aventura','978-1234567808',25,20),(54,'Drácula','Bram Stoker','Archibald Constable and Company',1897,'Terror','978-1234567809',13,9),(55,'Los pilares de la tierra','Ken Follett','Macdonald',1989,'Histórico','978-1234567810',20,15),(56,'El señor de los anillos','J.R.R. Tolkien','George Allen & Unwin',1954,'Fantasía','978-1234567811',30,28),(57,'Cumbres borrascosas','Emily Brontë','Thomas Cautley Newby',1847,'Romance','978-1234567812',12,8),(58,'El retrato de Dorian Gray','Oscar Wilde','Lippincott\'s Monthly Magazine',1890,'Filosófico','978-1234567813',15,10),(59,'La Divina Comedia','Dante Alighieri','N/A',1320,'Épico','978-1234567814',8,4),(60,'Ana Karenina','León Tolstói','The Russian Messenger',1877,'Romántico','978-1234567815',14,9),(61,'El guardián entre el centeno','J.D. Salinger','Little, Brown and Company',1951,'Drama','978-1234567816',17,12),(62,'El Conde de Montecristo','Alexandre Dumas','Journal des Débats',1844,'Aventura','978-1234567817',18,14),(63,'Moby Dick','Herman Melville','Harper & Brothers',1851,'Aventura','978-1234567818',13,9),(64,'La isla del tesoro','Robert Louis Stevenson','Cassell & Co.',1883,'Aventura','978-1234567819',22,19),(65,'El hombre invisible','H.G. Wells','C. Arthur Pearson',1897,'Ciencia Ficción','978-1234567820',11,7),(66,'El proceso','Franz Kafka','Verlag Die Schmiede',1925,'Novela','978-1234567821',10,6),(67,'El perfume','Patrick Süskind','Diogenes Verlag',1985,'Thriller','978-1234567822',19,15),(68,'La carretera','Cormac McCarthy','Alfred A. Knopf',2006,'Distopía','978-1234567823',14,10),(69,'El juego de Ender','Orson Scott Card','Tor Books',1985,'Ciencia Ficción','978-1234567824',20,17),(70,'La casa de los espíritus','Isabel Allende','Plaza & Janés',1982,'Realismo Mágico','978-1234567825',16,13),(71,'El diario de Bridget Jones','Helen Fielding','Jonathan Cape',1996,'Romance','978-1234567826',18,14),(72,'Los juegos del hambre','Suzanne Collins','Scholastic Press',2008,'Distopía','978-1234567827',24,20),(73,'Crepúsculo','Stephenie Meyer','Little, Brown and Company',2005,'Romance','978-1234567828',22,18),(74,'Harry Potter y la piedra filosofal','J.K. Rowling','Bloomsbury',1997,'Fantasía','978-1234567829',50,45),(75,'Harry Potter y la cámara secreta','J.K. Rowling','Bloomsbury',1998,'Fantasía','978-1234567830',50,46),(76,'Harry Potter y el prisionero de Azkaban','J.K. Rowling','Bloomsbury',1999,'Fantasía','978-1234567831',50,47),(77,'Harry Potter y el cáliz de fuego','J.K. Rowling','Bloomsbury',2000,'Fantasía','978-1234567832',50,48),(78,'Harry Potter y la orden del Fénix','J.K. Rowling','Bloomsbury',2003,'Fantasía','978-1234567833',50,44),(79,'Harry Potter y el misterio del príncipe','J.K. Rowling','Bloomsbury',2005,'Fantasía','978-1234567834',50,43),(80,'Harry Potter y las reliquias de la muerte','J.K. Rowling','Bloomsbury',2007,'Fantasía','978-1234567835',50,49),(81,'El código Da Vinci','Dan Brown','Doubleday',2003,'Thriller','978-1234567836',30,25),(82,'Inferno','Dan Brown','Doubleday',2013,'Thriller','978-1234567837',30,26),(83,'Ángeles y demonios','Dan Brown','Pocket Books',2000,'Thriller','978-1234567838',28,22),(84,'El símbolo perdido','Dan Brown','Doubleday',2009,'Thriller','978-1234567839',25,20),(85,'La catedral del mar','Ildefonso Falcones','Grijalbo',2006,'Histórico','978-1234567840',20,15),(86,'El niño con el pijama de rayas','John Boyne','David Fickling Books',2006,'Drama','978-1234567841',15,11),(87,'El psicoanalista','John Katzenbach','Ballantine Books',2002,'Thriller','978-1234567842',22,18),(88,'La verdad sobre el caso Harry Quebert','Joël Dicker','De Fallois',2012,'Misterio','978-1234567843',17,14),(89,'El hombre en busca de sentido','Viktor Frankl','Beacon Press',1946,'Psicología','978-1234567844',19,16),(90,'La ladrona de libros','Markus Zusak','Knopf Books',2005,'Histórico','978-1234567845',23,19),(91,'El juego de Ripper','Isabel Allende','Plaza & Janés',2014,'Misterio','978-1234567846',15,12),(92,'La chica del tren','Paula Hawkins','Riverhead Books',2015,'Thriller','978-1234567847',18,14),(93,'Perdida','Gillian Flynn','Crown Publishing Group',2012,'Thriller','978-1234567848',20,17),(94,'Cincuenta sombras de Grey','E. L. James','Vintage Books',2011,'Romance','978-1234567849',25,21),(95,'El arte de la guerra','Sun Tzu','N/A',-500,'Estrategia','978-1234567850',10,8),(96,'Meditaciones','Marco Aurelio','N/A',180,'Filosofía','978-1234567851',13,10),(97,'Así habló Zaratustra','Friedrich Nietzsche','N/A',1883,'Filosofía','978-1234567852',14,11),(98,'El príncipe','Nicolás Maquiavelo','N/A',1532,'Política','978-1234567853',12,9),(99,'Walden','Henry David Thoreau','N/A',1854,'Filosofía','978-1234567854',15,12),(100,'El hombre en busca de sentido','Viktor Frankl','Beacon Press',1946,'Psicología','978-1234567855',19,16),(101,'El poder del ahora','Eckhart Tolle','New World Library',1997,'Autoayuda','978-1234567856',25,22),(102,'Los cuatro acuerdos','Miguel Ruiz','Amber-Allen Publishing',1997,'Autoayuda','978-1234567857',20,18),(103,'Piense y hágase rico','Napoleon Hill','The Ralston Society',1937,'Autoayuda','978-1234567858',18,15),(104,'Cómo ganar amigos e influir sobre las personas','Dale Carnegie','Simon and Schuster',1936,'Autoayuda','978-1234567859',22,19),(105,'El código de la manifestación','Lewis Howes','N/A',2020,'Autoayuda','978-1234567860',15,12),(106,'Sapiens: De animales a dioses','Yuval Noah Harari','Harper',2011,'Historia','978-1234567861',30,27),(107,'Homo Deus: Breve historia del mañana','Yuval Noah Harari','Harper',2015,'Historia','978-1234567862',28,24),(108,'21 lecciones para el siglo XXI','Yuval Noah Harari','Editorial Debate',2018,'Historia','978-1234567863',25,22),(109,'El hombre más rico de Babilonia','George S. Clason','N/A',1926,'Finanzas','978-1234567864',18,16),(110,'Padre rico, padre pobre','Robert T. Kiyosaki','Warner Books',1997,'Finanzas','978-1234567865',20,17),(111,'La inteligencia emocional','Daniel Goleman','Bantam Books',1995,'Psicología','978-1234567866',25,21),(112,'El hombre en busca de sentido','Viktor Frankl','Beacon Press',1946,'Psicología','978-1234567867',19,15),(113,'Antifrágil','Nassim Nicholas Taleb','Random House',2012,'Ensayo','978-1234567868',22,18),(114,'El cisne negro','Nassim Nicholas Taleb','Random House',2007,'Ensayo','978-1234567869',20,17),(115,'Los hombres son de Marte, las mujeres son de Venus','John Gray','HarperOne',1992,'Relaciones','978-1234567870',18,14),(116,'El monje que vendió su Ferrari','Robin Sharma','HarperSanFrancisco',1997,'Autoayuda','978-1234567871',21,18),(117,'La magia del orden','Marie Kondo','Ten Speed Press',2011,'Autoayuda','978-1234567872',17,14),(118,'Come, reza, ama','Elizabeth Gilbert','Viking',2006,'Memorias','978-1234567873',22,20),(119,'El alquimista','Paulo Coelho','HarperTorch',1988,'Aventura','978-1234567874',25,22),(120,'El poder del ahora','Eckhart Tolle','New World Library',1997,'Autoayuda','978-1234567875',23,19),(121,'La sombra del viento','Carlos Ruiz Zafón','Planeta',2001,'Misterio','978-1234567876',22,20),(122,'El juego de Ender','Orson Scott Card','Tor Books',1985,'Ciencia Ficción','978-1234567877',20,18),(123,'Cien años de soledad','Gabriel García Márquez','Editorial Sudamericana',1967,'Realismo Mágico','978-1234567878',10,7),(125,'Colegas','Gabriel García Márquez','Edition Diana',2000,'Novela','ISBN-040',50,10),(126,'La magdalena','Brandon','USB',2000,'Novela','445',5,2),(129,'biblia','Brandon','Sudamericana',2000,'Historia','ISBN-005',5,2);
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamos`
--

DROP TABLE IF EXISTS `prestamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamos` (
  `id_prestamo` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_libro` int DEFAULT NULL,
  `fecha_prestamo` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` enum('PRESTADO','DEVUELTO','RETRASADO') DEFAULT NULL,
  PRIMARY KEY (`id_prestamo`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_libro` (`id_libro`),
  CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id_libro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamos`
--

LOCK TABLES `prestamos` WRITE;
/*!40000 ALTER TABLE `prestamos` DISABLE KEYS */;
INSERT INTO `prestamos` VALUES (5,17,10,'2025-06-16','2025-06-20','DEVUELTO'),(6,17,20,'2025-06-16',NULL,'PRESTADO'),(7,22,30,'2025-06-16',NULL,'PRESTADO');
/*!40000 ALTER TABLE `prestamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `ci` varchar(20) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `tipo_usuario` enum('Estudiante','Docente','Administrador','Otro') DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `ci` (`ci`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (15,'María','López','87654321','maria.lopez@hotmail.com','78901234','Av. 6 de Agosto, La Paz','Docente'),(17,'Ana','Torres','11223344','ana.torres@universidad.edu','76483920','Calle 10, Villa Fátima','Administrador'),(18,'Luis Mamani','Mamani','99887766','luis_mamani.mamani@gmail.com','70112233','Av. Busch, El Alto','Docente'),(19,'Carla','Quispe','55443322','carlaq@outlook.com','77778888','Calle Pando, Cochabamba','Estudiante'),(20,'Rodrigo','Rojas','66778899','rodrigo.rojas@correo.com','79990000','Av. Blanco Galindo','Docente'),(21,'Elena','Salazar','22334455','elena.salazar@instituto.bo','78123456','Zona Central, Sucre','Estudiante'),(22,'Martín','Castro','33445566','mcastro@admin.edu.bo','70001122','Calle Landaeta, La Paz','Administrador'),(23,'Gabriela','Fernández','77889900','gfernandez@gmail.com','78978978','Av. América, Cochabamba','Otro'),(34,'María José','González Pérez','643345678','mariaj.gonzalez@example.com','5557654321','Avenida Secundaria 456','Estudiante'),(37,'Melani fernanda','Sanchez Salazar','93418559','melani22@prueba.com','67454548','enrique segoviano','Estudiante');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17  0:08:14
