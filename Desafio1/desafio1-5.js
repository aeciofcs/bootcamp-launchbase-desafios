/* 
    ### Usuários e tecnologias ###
    Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e 
    suas tecnologias (novo array), por exemplo:
        const usuarios = [
            { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
            { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
            { nome: "Tuane", tecnologias: ["HTML", "Node.js"] }
        ];
    Percorra a lista de usuários com uma estrutura de repetição imprimindo em tela as informações dos usuários:
        Carlos trabalha com HTML, CSS
        Jarmine trabalha com JavaScript, CSS
        Tuane trabalha com HTML, Node.js
*/

const usuarios = [
    { Nome: "Carlos", Tecnologias: ["HTML", "CSS", "PYTHON", "JAVA"], },
    { Nome: "Jasmine", Tecnologias: ["JavaScript", "CSS", "Ruby"], },
    { Nome: "Tuane", Tecnologias: ["HTML", "Node.js"], },
];

for (let index = 0; index < usuarios.length; index++) {
    
    let message = `${usuarios[index].Nome} trabalha com `;

    for (let i = 0; i < usuarios[index].Tecnologias.length; i++) {
        if (i === usuarios[index].Tecnologias.length - 1){
            message += `${usuarios[index].Tecnologias[i]} `;
            break;
        }
        message += `${usuarios[index].Tecnologias[i]}, `;
    }

    console.log(message);
}