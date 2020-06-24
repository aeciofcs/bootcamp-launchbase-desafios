const recipes      = document.querySelectorAll('.recipe');
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