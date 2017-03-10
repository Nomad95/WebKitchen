

INSERT INTO  user_account(id, country, e_mail, is_filled, is_verified, username, nick, password,authorities)
VALUES (1,'Polska' ,'Truskawki@gmail.com',true,true,'walecznyrycerz99',	'Pogromca smaku','$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm','ROLE_USER'),
(2,	'Polska','borkowski95@onet.pl',	true,true,'noth168','Braines','$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm','ROLE_USER'),
( 3,'Polska','jechaneztymkoksem@wp.pl',true,true,'Terqa5','Terka99'	,'$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm', 'ROLE_USER'),
(4,'Polska', 'emailpo@gmail.com',true, true, 'admin','admin','$2a$06$Vsgf.quMHsFTOWJXayJV1umaJMcs1FUFrs9uwc1QFBJRh9RHkPQNC','ROLE_ADMIN');


INSERT INTO cuisines(name)
VALUES
('kuchniaargentyńska'),
('kuchniabrazylijska'),
('kuchniaamerykańska (USA)'),
('kuchniaalaskańska'),
('kuchniaamerykańsko-chińska'),
('kuchniaamerykańsko-indyjska'),
('kuchniahawajska'),
('kuchniaindiańska (zróżnicowana)'),
('kuchniakalifornijska'),
('kuchnialuizjańska (cajun)'),
('kuchniamurzyńska'),
('kuchniaportorykańska'),
('kuchniateksańska'),
('kuchniawhite trash'),
('kuchniakanadyjska'),
('kuchniakubańska'),
('kuchniameksykańska'),
('kuchniaaustralijska'),
('kuchniaarabska'),
('kuchniachińska'),
('kuchniaindonezyjska'),
('kuchniaindyjska'),
('kuchniajapońska'),
('kuchniatajska'),
('kuchniaturecka'),
('kuchniauzbecka'),
('kuchniawietnamska'),
('kuchniaaustriacka'),
('kuchniabaskijska'),
('kuchniabiałoruska'),
('kuchniabrytyjska'),
('kuchniaangielska'),
('kuchniaszkocka'),
('kuchniawalijska'),
('kuchniabułgarska'),
('kuchniachorwacka'),
('kuchniaczeska'),
('kuchniaestońska'),
('kuchniafińska'),
('kuchniafrancuska'),
('kuchniagrecka'),
('kuchniahiszpańska'),
('kuchniaholenderska'),
('kuchniairlandzka'),
('kuchniakatalońska'),
('kuchnialitewska'),
('kuchniamaltańska'),
('kuchnianiemiecka'),
('kuchniapolska'),
('kuchniaportugalska'),
('kuchniarosyjska'),
('kuchniarumuńska'),
('kuchniasłoweńska'),
('kuchniaśląska'),
('kuchniaukraińska'),
('kuchniawęgierska'),
('kuchniawłoska');

INSERT INTO user_details(id, birth_date, city, description, flat_number, interests, name, phone_number, photo, post_code, profile_completion, sex, street, street_number, surname,preferred_cuisine_id, user_account_id)
VALUES
(2,	'1995-05-17','Krasnystaw',null,20,'Informatyka','Łukasz',725150126,	null,'22-300',8,'m','Piekarskiego',	20,	'Borkowski',10,2),
(1,	'1992-12-12','Lublin',null,12,'Rolnictwo','Izabela',12313123,null,'44-555',	8,'k','Rzecka',	23,	'Łęcka',19,1),
(3,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chujowa',100,'Terka',3,3),
(4,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chujowa',100,'Terka',3,3)


-- MySQL Workbench Forward Engineering 
 
 
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; 
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; 
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES'; 
 
 
-- ----------------------------------------------------- 
-- Schema inzynieria5 
-- ----------------------------------------------------- 
 
 
-- ----------------------------------------------------- 
-- Schema inzynieria5 
-- ----------------------------------------------------- 
CREATE SCHEMA IF NOT EXISTS `inzynieria5` DEFAULT CHARACTER SET utf8 ; 
USE `inzynieria5` ; 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Kierunek` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Kierunek` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Nazwa` VARCHAR(35) NOT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  UNIQUE INDEX `Nazwa_UNIQUE` (`Nazwa` ASC)) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Student` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Student` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Imie` VARCHAR(25) NOT NULL, 
  `Nazwisko` VARCHAR(35) NOT NULL, 
  `Numer_albumu` VARCHAR(11) NOT NULL, 
  `Pesel` VARCHAR(11) NOT NULL, 
  `Email` VARCHAR(40) NOT NULL, 
  `Kierunek_id` INT NULL, 
  UNIQUE INDEX `Numer_albumu_UNIQUE` (`Numer_albumu` ASC), 
  UNIQUE INDEX `Pesel_UNIQUE` (`Pesel` ASC), 
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  PRIMARY KEY (`id`), 
  INDEX `fk_Student_Kierunek1_idx` (`Kierunek_id` ASC), 
  CONSTRAINT `fk_Student_Kierunek1` 
    FOREIGN KEY (`Kierunek_id`) 
    REFERENCES `inzynieria5`.`Kierunek` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Opiekun` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Opiekun` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Imie` VARCHAR(25) NOT NULL, 
  `Nazwisko` VARCHAR(35) NOT NULL, 
  `Pesel` VARCHAR(11) NOT NULL, 
  `Email` VARCHAR(40) NOT NULL, 
  `Telefon` VARCHAR(12) NOT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  UNIQUE INDEX `Pesel_UNIQUE` (`Pesel` ASC), 
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC), 
  UNIQUE INDEX `Telefon_UNIQUE` (`Telefon` ASC)) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Firma` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Firma` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Nazwa` VARCHAR(50) NOT NULL, 
  `Miasto` VARCHAR(30) NOT NULL, 
  `Ulica` VARCHAR(50) NOT NULL, 
  `Nr` VARCHAR(5) NOT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Praktyka` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Praktyka` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Temat` VARCHAR(250) NOT NULL, 
  `Liczba` TINYINT NOT NULL, 
  `Data_rozpoczecia` DATE NOT NULL, 
  `Data_zakonczenia` DATE NOT NULL, 
  `Opiekun_id` INT NULL, 
  `Firma_id` INT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  INDEX `fk_Praktyka_Opiekun1_idx` (`Opiekun_id` ASC), 
  INDEX `fk_Praktyka_Firma1_idx` (`Firma_id` ASC), 
  CONSTRAINT `fk_Praktyka_Opiekun1` 
    FOREIGN KEY (`Opiekun_id`) 
    REFERENCES `inzynieria5`.`Opiekun` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION, 
  CONSTRAINT `fk_Praktyka_Firma1` 
    FOREIGN KEY (`Firma_id`) 
    REFERENCES `inzynieria5`.`Firma` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Pracownik` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Pracownik` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Imie` VARCHAR(25) NOT NULL, 
  `Nazwisko` VARCHAR(35) NOT NULL, 
  `Email` VARCHAR(40) NOT NULL, 
  `Telefon` VARCHAR(12) NOT NULL, 
  `Firma_id` INT NOT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC), 
  UNIQUE INDEX `Telefon_UNIQUE` (`Telefon` ASC), 
  INDEX `fk_Pracownik_Firma_idx` (`Firma_id` ASC), 
  CONSTRAINT `fk_Pracownik_Firma` 
    FOREIGN KEY (`Firma_id`) 
    REFERENCES `inzynieria5`.`Firma` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Zapis` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Zapis` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `Status_przyjecia` TINYINT(1) NULL, 
  `Data_rozmowy` DATE NOT NULL, 
  `Miejsce_rozmowy` VARCHAR(40) NOT NULL, 
  `CV_link` VARCHAR(40) NOT NULL, 
  `Data_rozpoczecia` DATE NOT NULL, 
  `Data_zakonczenia` DATE NOT NULL, 
  `Student_id` INT NULL, 
  `Praktyka_id` INT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `CV_link_UNIQUE` (`CV_link` ASC), 
  INDEX `fk_Zapis_Student1_idx` (`Student_id` ASC), 
  INDEX `fk_Zapis_Praktyka1_idx` (`Praktyka_id` ASC), 
  CONSTRAINT `fk_Zapis_Student1` 
    FOREIGN KEY (`Student_id`) 
    REFERENCES `inzynieria5`.`Student` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION, 
  CONSTRAINT `fk_Zapis_Praktyka1` 
    FOREIGN KEY (`Praktyka_id`) 
    REFERENCES `inzynieria5`.`Praktyka` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION) 
ENGINE = InnoDB; 
 
 
 
 
-- ----------------------------------------------------- 
-- Table `inzynieria5`.`Dziennik` 
-- ----------------------------------------------------- 
CREATE TABLE IF NOT EXISTS `inzynieria5`.`Dziennik` ( 
  `id` INT NOT NULL AUTO_INCREMENT, 
  `liczba_tygodni_pracy` INT NOT NULL, 
  `data_rozpoczecia_praktyk` DATE NOT NULL, 
  `czas_od` TIME NOT NULL, 
  `czas_do` TIME NOT NULL, 
  `czy_odbyl` TINYINT(1) NULL, 
  `ilosc_dni` SMALLINT NULL, 
  `charakter_praktyki` VARCHAR(60) NOT NULL, 
  `sala` VARCHAR(5) NULL, 
  `uwagi` VARCHAR(255) NULL, 
  `Zapis_id` INT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC), 
  INDEX `fk_Dziennik_Zapis1_idx` (`Zapis_id` ASC), 
  CONSTRAINT `fk_Dziennik_Zapis1` 
    FOREIGN KEY (`Zapis_id`) 
    REFERENCES `inzynieria5`.`Zapis` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE NO ACTION) 
ENGINE = InnoDB; 
 
 
 
 
SET SQL_MODE=@OLD_SQL_MODE; 
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; 
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; 
