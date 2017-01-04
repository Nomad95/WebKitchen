

INSERT INTO  user_account(id, country, e_mail, is_filled, is_verified, login, nick, password)
VALUES (1,'Polska' ,'Truskawki@gmail.com',true,true,'walecznyrycerz99',	'Pogromca smaku','123456'),
(2,	'Polska','borkowski95@onet.pl',	true,true,'noth168','Braines','borkowski95'),
( 3,'Polska','jechaneztymkoksem@wp.pl',true,true,'Terqa5','Terka99'	,'terkavlog');


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


INSERT INTO user_details (id, birth_date, city, description, flat_number, interests, name, phone_number, photo, post_code, profile_completion, sex, street, street_number, surname,preferred_cuisine_id, user_account_id)
VALUES
(2,	'1995-05-17','Krasnystaw',null,20,'Informatyka','Łukasz',725150126,	null,'22-300',8,'m','Piekarskiego',	20,	'Borkowski',10,2),
(1,	'1992-12-12','Lublin',null,12,'Rolnictwo','Izabela',12313123,null,'44-555',	8,'k','Rzecka',	23,	'Łęcka',19,1),
(3,	'1985-11-11','Opole',null,44,'Kolarstwo, Filmy','Tomasz',997997997,null,'99-777',8,'m','Chujowa',100,'Terka',3,3);