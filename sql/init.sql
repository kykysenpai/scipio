DROP SCHEMA IF EXISTS tccApp2 CASCADE;
CREATE SCHEMA tccApp2;

create table tccApp2.users(
  id SERIAL PRIMARY KEY,
  first_name varchar(25),
  last_name varchar(25),
  username varchar(25) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  gsm varchar(10)
);

create table tccApp2.permissions(
  id SERIAL PRIMARY KEY,
  name varchar(20) NOT NULL
);

create table tccApp2.roles(
  user_id INTEGER NOT NULL,
  perm INTEGER  NOT NULL,
  FOREIGN KEY (user_id) REFERENCES tccApp2.users(id),
  FOREIGN KEY (perm) REFERENCES tccApp2.permissions(id),
  PRIMARY KEY(user_id, perm)
);

--INSERT INTO tccApp2.users VALUES (DEFAULT, 'John', 'Doe', 'Dummy', '123', NULL);
--INSERT INTO tccApp2.permissions VALUES(DEFAULT, 'admin');
--INSERT INTO tccApp2.permissions VALUES(DEFAULT, 'user');
--INSERT INTO tccApp2.permissions VALUES(DEFAULT, 'bdo');
--INSERT INTO tccApp2.roles VALUES (1,1);
--INSERT INTO tccApp2.roles VALUES (1,3);

--SELECT * FROM tccApp2.users;
--SELECT * FROM tccApp2.permissions;
--SELECT * FROM tccApp2.roles;
