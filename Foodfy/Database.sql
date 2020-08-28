-- Criando DATABASE
CREATE DATABASE FOODFY;

--Criando TABELAS
CREATE TABLE recipes(
  ID SERIAL PRIMARY KEY,
  CHEF_ID INT NULL,
  IMAGE TEXT NULL,
  TITLE TEXT NOT NULL,
  INGREDIENTS TEXT[] NULL,
  PREPARATION TEXT[] NULL,
  INFORMATION TEXT NULL,
  CREATED_AT TIMESTAMP NOT NULL
);

CREATE TABLE CHEFS(
  ID SERIAL PRIMARY KEY,
  NAME TEXT NOT NULL,
  AVATAR_URL TEXT NULL,
  CREATED_AT TIMESTAMP NOT NULL 
);


insert into recipes (CHEF_ID, IMAGE, TITLE, 
                     INGREDIENTS, PREPARATION, 
                     INFORMATION, CREATED_AT ) 
values (6,'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/launchbase/receitas/pizza.png', 
         'Pizza 4 estações', 
         Array['1 xícara (chá) de leite', '1 ovo'],
         Array['No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.', 'Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.'],
         'Pizza de liquidificador é uma receita deliciosa e supersimples de preparar. Feita toda no liquidificador, ela é bem prática para o dia a dia. Aqui no TudoGostoso você também encontra diversas delícias práticas feitas no liquidificador: massa de panqueca, torta de frango de liquidificador, pão de queijo de liquidificador, bolo de banana, bolo de chocolate e muito mais!',
         CURRENT_DATE)