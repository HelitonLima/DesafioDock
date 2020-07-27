DROP DATABASE IF EXISTS bddesafiodock;
CREATE DATABASE bddesafiodock;
USE bddesafiodock;

CREATE TABLE conta (
idConta INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(256) NOT NULL,
cpf VARCHAR(11) NOT NULL,
saldo DOUBLE NOT NULL,
flagAtivo BOOL NOT NULL,
dataCriacao DATE NOT NULL
);

CREATE TABLE transacao (
idConta INT NOT NULL,
descricao VARCHAR(256) NOT NULL,
valor double NOT NULL,
dataTransacao DATE NOT NULL,
CONSTRAINT fkConta FOREIGN KEY(idConta)
REFERENCES conta(idConta)
);

CREATE VIEW vwConta 
AS SELECT idConta, nome, cpf, saldo, flagAtivo, date_format(dataCriacao, '%e/%m/%Y') 
AS dataCriacao FROM conta;

CREATE VIEW vwTransacao 
AS SELECT idConta, descricao, valor, date_format(dataTransacao, '%e/%m/%Y') 
AS dataTransacao FROM transacao;