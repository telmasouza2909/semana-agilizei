#language: pt

Funcionalidade: Cadastro

    Como usuário, desejo realizar um Cadastro
    Para que possa acessar o sistema

    Cenario: Cadastro de novo usuário
        Dado que acesso o site
        Quando informar meus dados
        E Salvar
        Então devo ser cadastrado com sucesso 

    # Given / Dado-> contexto (dado que)
    # When / Quando -> ação executada
    # Then / Então -> resultado esperado
    # And / E -> continuidade do passo anterior 

