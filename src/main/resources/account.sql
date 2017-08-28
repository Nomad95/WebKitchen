


INSERT INTO  user_account(id, country, email, is_enabled, is_filled, is_verified, username, nick, password,authorities)
VALUES (99999999995,'Polska' ,'igokop99@gmail.com',true,true,true,'ciasteczka',	'Ciasteczex','$2a$06$hMOcRg69ji1BmFvnAFvEEOxVzWb5pj5v7GBMlSu8FHzofGlw8A34G','ROLE_USER'),
(99999999996,	'Polska','borkowski95@onet.pl',true,	true,true,'noth168','Braines','$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm','ROLE_USER'),
(99999999997,'Polska','jechaneztymkoksem@wp.pl',true,true,true,'Terqa5','Terka99'	,'$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm', 'ROLE_USER'),
(99999999998,'Polska', 'emailpo@gmail.com',true,true, true, 'admin','admin','$2a$06$Vsgf.quMHsFTOWJXayJV1umaJMcs1FUFrs9uwc1QFBJRh9RHkPQNC','ROLE_ADMIN'),
(99999999999,'Polska', 'arek@gmail.com',true,true, true, 'arek','arek','$2a$06$Vsgf.quMHsFTOWJXayJV1umaJMcs1FUFrs9uwc1QFBJRh9RHkPQNC','ROLE_USER');



INSERT INTO cuisines(id,name)
VALUES
(1,'kuchnia argentyńska'),
(2,'kuchnia brazylijska'),
(3,'kuchnia amerykańska (USA)'),
(4,'kuchnia alaskańska'),
(5,'kuchnia amerykańsko-chińska'),
(6,'kuchnia amerykańsko-indyjska'),
(7,'kuchnia hawajska'),
(8,'kuchnia indiańska (zróżnicowana)'),
(9,'kuchnia kalifornijska'),
(10,'kuchnia luizjańska (cajun)'),
(11,'kuchnia murzyńska'),
(12,'kuchnia portorykańska'),
(13,'kuchnia teksańska'),
(14,'kuchnia white trash'),
(15,'kuchnia kanadyjska'),
(16,'kuchnia kubańska'),
(17,'kuchnia meksykańska'),
(18,'kuchnia australijska'),
(19,'kuchnia arabska'),
(20,'kuchnia chińska'),
(21,'kuchnia indonezyjska'),
(22,'kuchnia indyjska'),
(23,'kuchnia japońska'),
(24,'kuchnia tajska'),
(25,'kuchnia turecka'),
(26,'kuchnia uzbecka'),
(27,'kuchnia wietnamska'),
(28,'kuchnia austriacka'),
(29,'kuchnia baskijska'),
(30,'kuchnia białoruska'),
(31,'kuchnia brytyjska'),
(32,'kuchnia angielska'),
(33,'kuchnia szkocka'),
(34,'kuchnia walijska'),
(35,'kuchnia bułgarska'),
(36,'kuchnia chorwacka'),
(37,'kuchnia czeska'),
(38,'kuchnia estońska'),
(39,'kuchnia fińska'),
(40,'kuchnia francuska'),
(41,'kuchnia grecka'),
(42,'kuchnia hiszpańska'),
(43,'kuchnia holenderska'),
(44,'kuchnia irlandzka'),
(45,'kuchnia katalońska'),
(46,'kuchnia litewska'),
(47,'kuchnia maltańska'),
(48,'kuchnia niemiecka'),
(49,'kuchnia polska'),
(50,'kuchnia portugalska'),
(51,'kuchnia rosyjska'),
(52,'kuchnia rumuńska'),
(53,'kuchnia słoweńska'),
(54,'kuchnia śląska'),
(55,'kuchnia ukraińska'),
(56,'kuchnia węgierska'),
(57,'kuchnia włoska');


INSERT INTO user_details(id, birth_date, city, description, flat_number, interests, name, phone_number, photo, post_code, profile_completion, sex, street, street_number, surname, user_account_id)
VALUES
(999999999995,	'1995-05-17','Krasnystaw',null,20,'Informatyka','Łukasz',725150126,	null,'22-300',8,'m','Piekarskiego',	20,	'Borkowski',999999999995),
(999999999996,	'1992-12-12','Lublin',null,12,'Rolnictwo','Izabela',12313123,null,'44-555',	8,'k','Rzecka',	23,	'Łęcka',999999999996),
(999999999997,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999997),
(999999999998,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999998),
(999999999999,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999999)

