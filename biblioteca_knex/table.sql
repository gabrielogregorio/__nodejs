create database estudos;

create table estudo_tabela (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null,
  price float not null
) 

create table studios (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null,
  game_id int,
  FOREIGN KEY(game_id) REFERENCES estudo_tabela(id)
) 

/* M p M*/
create table filme (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null
) 

create table produtora (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null
) 

create table filme_produtora(
  id int PRIMARY KEY AUTO_INCREMENT,
  filme_id int,
  produtora_id int,
  FOREIGN KEY(filme_id) REFERENCES filme(id),
  FOREIGN KEY(produtora_id) REFERENCES produtora(id)
)