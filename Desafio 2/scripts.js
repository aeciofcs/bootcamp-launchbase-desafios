const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const btnCloseModal = document.querySelector('.close-modal');

for (const card of cards) {
    card.addEventListener('click', function(){
        modalOverlay.classList.toggle('active');
    });
}


/* Posso também, não declarar uma variavel para o close do Modal,
pois não vamos utilizar para nada. Somente para clicar no botão.
Então podemos colocar direto: 
document.querySelector('.close-modal').addEventListiner('click', ()=>{} ) */

btnCloseModal.addEventListener('click',function(){
    modalOverlay.classList.toggle('active');
});