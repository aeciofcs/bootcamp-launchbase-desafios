const recipes       = document.querySelectorAll('.recipe');
const esconderSpans = document.querySelectorAll('span');
const listagem      = document.querySelectorAll('.lista-ingredientes')

// => Ouvir o clique de todas as receitas da pagina

/* Abrir o Modal Overlay */
for (const recipe of recipes) {
    recipe.addEventListener('click', ()=>{
        const title    = recipe.getAttribute('id');
        window.location.href = `/recipes/${title}`
    });
}

for (const esconder of esconderSpans) {
    esconder.addEventListener( 'click', () => {
        for (const lista of listagem) {
            if(lista.parentElement.getAttribute('id') === esconder.getAttribute('id')){
                lista.classList.toggle('invisible')
            }
        }
    } )
}

/* CAMPO DINAMICO DA CRIACAO DE RECEITAS, ADMIN */
function addIngrediente() {
    const ingredients = document.querySelector("#ingredientes");
    const fieldContainer = document.querySelectorAll(".ingrediente");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}
  
document
    .querySelector(".add-ingrediente")
    .addEventListener("click", addIngrediente);

function addMododePreparo() {
    const preparos = document.querySelector("#preparos");
    const fieldContainer = document.querySelectorAll(".preparo");
    
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
    
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
    
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparos.appendChild(newField);
}
    
document
    .querySelector(".add-preparo")
    .addEventListener("click", addMododePreparo);