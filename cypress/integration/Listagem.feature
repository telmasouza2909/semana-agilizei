#language: pt
Funcionalidade: Listagem
    Como usuário, desejo acessar a listagem
    Para que possa visualizar meus dados de cadastro

Cenário: Listagem sem registros
    Dado que o site não possua registros
    Quando acessar a listagem
    Então devo visualizar a listagem vazia

Cenário: Listagem com apenas um registros
    Dado que o site possua apenas um registro
    Quando acessar a listagem
    Então devo visualizar apenas um registro
