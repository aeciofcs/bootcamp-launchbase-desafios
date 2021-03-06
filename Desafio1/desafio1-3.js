/*
    ### Construção e Impressão de Objetos ###

    Crie um programa que armazena dados da empresa Rocketseat dentro de um objeto chamado empresa. 
    Os dados a serem armazenados são:

    Nome: Rocketseat
    Cor: Roxo
    Foco: Programação
    Endereço:
        Rua: Rua Guilherme Gembala
        Número: 260
    
    -> Imprima em tela utilizando console.log o nome da empresa e seu endereço no seguinte formato:
            " A empresa Rocketseat está localizada em Rua Guilherme Gembala, 260 "

*/

const empresa = {
    Nome: "Rocketseat",
    Cor: "Roxo",
    Foco: "Programação",
    Endereco: 
    {
        Rua: "Rua Guilherme Gembala",
        Numero: 260
    }
};

console.log(`A empresa ${empresa.Nome} está localizada em ${empresa.Endereco.Rua}, ${empresa.Endereco.Numero} `);