const modalOverlay     = document.querySelector('.modal-overlay');
const modal            = document.querySelector('.modal');
const cards            = document.querySelectorAll('.card');
const btnCloseModal    = document.querySelector('.close-modal');
const btnMaximizeModal = document.querySelector('.maximize-modal');
const btnMinimizeModal = document.querySelector('.minimize-modal');

/* Abrir/Fechar o Modal -> */
for (const card of cards) {
    card.addEventListener('click', function(){
        const pageId = card.getAttribute('id');
        modalOverlay.classList.toggle('active');
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${pageId}`;
    });
}

/* Posso também, não declarar uma variavel para o close do Modal,
pois não vamos utilizar para nada. Somente para clicar no botão.
Então podemos colocar direto: 
document.querySelector('.close-modal').addEventListiner('click', ()=>{} ) */

btnCloseModal.addEventListener('click',function(){
    modalOverlay.classList.toggle('active');
    modalOverlay.querySelector('iframe').src = "";
});

/* <- Abrir/Fechar o Modal */


/* Maximizar e Minimizar o Modal -> */
btnMaximizeModal.addEventListener('click', function(){
    modal.classList.toggle('maximized');
    btnMinimizeModal.classList.toggle('active');
    btnMaximizeModal.classList.toggle('active');   
});

btnMinimizeModal.addEventListener('click', function(){
    btnMaximizeModal.classList.toggle('active');
    btnMinimizeModal.classList.toggle('active');    
    modal.classList.toggle('maximized');
});
/* <- Maximizar e Minimizar o Modal */