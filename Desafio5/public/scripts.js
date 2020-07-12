const currentPage = location.pathname
const menuItems   = document.querySelectorAll("header .links a")
const formDelete  = document.querySelector("#form-delete")

/* ### MENU ATIVO ### */
for (const menu of menuItems) {
    if(currentPage.includes(menu.getAttribute('href'))) menu.classList.add('active')
    if(menu.getAttribute('href') == '/') menu.classList.remove('active')
}

formDelete.addEventListener('submit', (event) => {
    const confirmation = confirm("Deseja realmente excluir?? ")
    
    if (!confirmation) event.preventDefault()
})