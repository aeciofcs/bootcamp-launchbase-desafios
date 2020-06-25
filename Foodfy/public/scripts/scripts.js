const recipes       = document.querySelectorAll('.recipe');
const esconderSpans = document.querySelectorAll('span');
const listagem      = document.querySelectorAll('.lista-ingredientes')
//const modalOverlay  = document.querySelector('.modal-overlay');
//const modal         = document.querySelector('.modal');
//const btnCloseModal = document.querySelector('.close-modal');

// => Ouvir o clique de todas as receitas da pagina

/* Abrir o Modal Overlay */
for (const recipe of recipes) {
    recipe.addEventListener('click', ()=>{
        const title    = recipe.getAttribute('id');
        window.location.href = `/recipes/${title}`
        //console.log(title)
        //console.log(`/courses/${title}`)
        
        //modalOverlay.classList.toggle('active');
        //modal.querySelector('img').src = `./assets/${imgId}.png`;
        //modal.querySelector('h3').innerHTML = recipe.querySelector('h3').innerHTML;
        //modal.querySelector('h4').innerHTML = recipe.querySelector('h4').innerHTML;        
    });
}

/*
// Fechar o Modal Overlay 
btnCloseModal.addEventListener('click', ()=>{
    modalOverlay.classList.toggle('active');
});

// <= Ouvir o clique de todas as receitas da pagina
*/

/* => Ouvindo todos os cliques no label ESCONDER */
//console.log(listagem.classList.contains('invisible'))

//console.log(listagem[0].parentElement.className)
//console.log(listagem[1].parentElement.className)
//console.log(listagem[2].parentElement.className)
for (const esconder of esconderSpans) {    
    esconder.addEventListener( 'click', () => {        
        for (const lista of listagem) {
            //console.log(esconder.parentElement.firstElementChild.innerHTML.substr(1,5))
            //console.log(esconder.parentElement.firstElementChild.innerHTML.substr(8,4))
               // ==> console.log(lista.parentElement.className)
               // => console.log(esconder.parentElement.firstElementChild.innerHTML)
            //console.log(lista.parentElement.className.includes(esconder.parentElement.firstElementChild.innerHTML.substr(8,3)))            
            //console.log(esconder.parentElement.firstElementChild.innerHTML.substr(8,3))
            //console.log(lista.parentElement.getAttribute('id'))
            //console.log(esconder.getAttribute('id'))
            //if(esconder.parentElement.firstElementChild.innerHTML == lista.parentElement.className){
            //if(lista.parentElement.className.includes(esconder.parentElement.firstElementChild.innerHTML.substr(9,2))){
            if(lista.parentElement.getAttribute('id') === esconder.getAttribute('id')){
                lista.classList.toggle('invisible')
                //esconder.innerText = 'MOSTRAR'                
            }
        }
    } )
}

/*
for (const esconder of esconderSpans) {
    esconder.addEventListener('click', () => {
        console.log(esconder.innerText)
        if (esconder.innerText == 'MOSTRAR'){
            //listagem.classList.toggle('invisible')
            esconder.innerText = 'ESCONDER'
        }
    })    
}*/
/* <= Ouvindo todos os cliques no label ESCONDER */