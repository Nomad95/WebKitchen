


INSERT INTO  user_account(id, country, email, is_enabled, is_filled, is_verified, username, nick, password,authorities)
VALUES (999999999995,'Polska' ,'igokop99@gmail.com',true,true,true,'ciasteczka',	'Ciasteczex','$2a$06$hMOcRg69ji1BmFvnAFvEEOxVzWb5pj5v7GBMlSu8FHzofGlw8A34G','ROLE_USER'),
(999999999996,	'Polska','borkowski95@onet.pl',true,	true,true,'noth168','Braines','$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm','ROLE_USER'),
(999999999997,'Polska','jechaneztymkoksem@wp.pl',true,true,true,'Terqa5','Terka99'	,'$2a$06$86wYILRRu.fGIrXn9uuxG.CQHLPtfzjsssd9jMY62eM6FKcvFniOm', 'ROLE_USER'),
(999999999998,'Polska', 'emailpo@gmail.com',true,true, true, 'admin','admin','$2a$06$Vsgf.quMHsFTOWJXayJV1umaJMcs1FUFrs9uwc1QFBJRh9RHkPQNC','ROLE_ADMIN'),
(999999999999,'Polska', 'arek@gmail.com',true,true, true, 'arek','arek','$2a$06$Vsgf.quMHsFTOWJXayJV1umaJMcs1FUFrs9uwc1QFBJRh9RHkPQNC','ROLE_USER');



INSERT INTO cuisines(name)
VALUES
('kuchnia argentyńska'),
('kuchnia brazylijska'),
('kuchnia amerykańska (USA)'),
('kuchnia alaskańska'),
('kuchnia amerykańsko-chińska'),
('kuchnia amerykańsko-indyjska'),
('kuchnia hawajska'),
('kuchnia indiańska (zróżnicowana)'),
('kuchnia kalifornijska'),
('kuchnia luizjańska (cajun)'),
('kuchnia murzyńska'),
('kuchnia portorykańska'),
('kuchnia teksańska'),
('kuchnia white trash'),
('kuchnia kanadyjska'),
('kuchnia kubańska'),
('kuchnia meksykańska'),
('kuchnia australijska'),
('kuchnia arabska'),
('kuchnia chińska'),
('kuchnia indonezyjska'),
('kuchnia indyjska'),
('kuchnia japońska'),
('kuchnia tajska'),
('kuchnia turecka'),
('kuchnia uzbecka'),
('kuchnia wietnamska'),
('kuchnia austriacka'),
('kuchnia baskijska'),
('kuchnia białoruska'),
('kuchnia brytyjska'),
('kuchnia angielska'),
('kuchnia szkocka'),
('kuchnia walijska'),
('kuchnia bułgarska'),
('kuchnia chorwacka'),
('kuchnia czeska'),
('kuchnia estońska'),
('kuchnia fińska'),
('kuchnia francuska'),
('kuchnia grecka'),
('kuchnia hiszpańska'),
('kuchnia holenderska'),
('kuchnia irlandzka'),
('kuchnia katalońska'),
('kuchnia litewska'),
('kuchnia maltańska'),
('kuchnia niemiecka'),
('kuchnia polska'),
('kuchnia portugalska'),
('kuchnia rosyjska'),
('kuchnia rumuńska'),
('kuchnia słoweńska'),
('kuchnia śląska'),
('kuchnia ukraińska'),
('kuchnia węgierska'),
('kuchnia włoska');


INSERT INTO user_details(id, birth_date, city, description, flat_number, interests, name, phone_number, photo, post_code, profile_completion, sex, street, street_number, surname, user_account_id)
VALUES
(999999999995,	'1995-05-17','Krasnystaw',null,20,'Informatyka','Łukasz',725150126,	null,'22-300',8,'m','Piekarskiego',	20,	'Borkowski',999999999995),
(999999999996,	'1992-12-12','Lublin',null,12,'Rolnictwo','Izabela',12313123,null,'44-555',	8,'k','Rzecka',	23,	'Łęcka',999999999996),
(999999999997,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999997),
(999999999998,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999998),
(999999999999,	'1985-11-11','Opole',null,44,'Kolarstws o, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chycha',100,'Terka',999999999999)

