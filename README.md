# DesafioDock

Aplicação API REST em Node JS com conexão ao banco de dados MySQL para realização de tranferências bancárias

## Começando

A aplicação foi feita com duas tabelas, conta e transação. Para realizar um depósito ou saque é necessário que exista pelo menos uma conta para passar seu id na transferência,
o mesmo vale para consulta, alteração, bloqueio, desbloqueio, exclusão de dados ou consulta de transações, por período ou não, de uma determinada conta.

Como foi utilizado um banco de dados para criação da aplicação, é necessário que seja alterado os dados do arquivo .env para que sejam feitos os testes. 

### Pré requisitos

Para rodar a aplicação você dever ter no seu sistema o Node JS, um gerenciador de banco de dados MYSQL e uma ferramente para análise e testes de API

### Instalando

```
npm install
```
```
npm start
```

## Executando testes

Primeiramente vamos criar uma conta, usando o verbo POST e indo na url:
```
/conta/criarConta
```
Vamos ao body passar dois parâmetros, nome e cpf, exemplo:
```
{
  "nome": "Heliton Lima",
  "cpf": "51869097858"
}
```

Agora para consultar todas as contas criadas, usando o verbo GET, vá na url:
```
/conta/consultarContas
```

Caso queira ver os dados apenas de uma conta, usando o verbo GET, vá na url e passe o id
```
/conta/consultarConta/1
```

Para alterar os dados da conta (nome e cpf), usando o verbo PATCH, vá na url:
```
/conta/alterarDados
```
E passe o id da conta, nome e cpf, exemplo:
```
{
  "idConta": 1,
  "nome": "Heliton Martins",
  "cpf": "12345678910"
}
```

Para o bloqueio da conta, usando o verbo PATCH, vá na url:
```
/conta/bloquearConta
```
E passe o id da conta que irá bloquear, exemplo:
```
{
  "idConta": 1
}
```

Para o desbloqueio da conta, usando o verbo PATCH, vá na url:
```
/conta/desbloquearConta
```
E passe o id da conta que irá desbloquear, exemplo:
```
{
  "idConta": 1
}
```

Agora vamos realizar um depósito, usando o verbo PATCH, na url:
```
/transacao/depositar
```
Passe o id da conta, uma descrição e um valor, exemplo:
```
{
  "idConta": 1,
  "descricao": "deposito no valor de R$: 100,00",
  "valor": 100
}
```

Para sacar, usando o verbo PATCH, na url:
```
/transacao/sacar
```
Passe o id da conta, uma descrição e um valor, exemplo:
```
{
  "idConta": 1,
  "descricao": "saque no valor de R$: 20,00",
  "valor": 20
}
```

Para consultar todas as transações, usando o verbo GET, vá na url:
```
/transacao/consultarTransacoes
```

Caso queira consultar de uma conta específica, usando o verbo GET, vá na url:
```
/transacao/consultarTransacao/1
```

Agora para ver em um determinado perído, usando o verbo GET, vá na url:
```
/transacao/extratoPeriodo
```
Passando uma data de início e uma de fim, exemplo:
```
{
  "dataInicio": "17/07/2020",
  "dataFim": "24/07/2020"
}
```

Por fim, vamos excluir a conta, usando o verbo DELETE, na url:
```
/conta/excluirConta
```
E passe o id da conta que irá excluir, exemplo:
```
{
  "idConta": 1
}
```

## Testando no Postman

### Criando uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/criarConta.PNG)

### Consultando todas as contas
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/consultarContas.PNG)

### Consultando uma conta específica
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/consultarConta.PNG)

### Alterar dados de uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/alterarDados.PNG)

### Bloquear uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/bloquearConta.PNG)

### Desbloquear uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/desbloquearConta.PNG)

### Depositar
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/depositar.PNG)

### Sacar
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/sacar.PNG)

### Consultar transações de todas contas
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/consultarTransacoes.PNG)

### Consultar transações de uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/consultarTransacao.PNG)

### Extrato por período
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/extratoPeriodo.PNG)

### Excluir uma conta
![](https://github.com/HelitonLima/DesafioDock/blob/master/prints/excluirConta.PNG)
