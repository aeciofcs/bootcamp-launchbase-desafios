const currentPage = location.pathname
const menuItems   = document.querySelectorAll("header .links a")
const formDelete  = document.querySelector('#form-delete')

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

/* TELINHA DE CONFIRMAÇÃO NO DELETE DOS FORMULARIOS */
formDelete.addEventListener('submit', (event) => {
    const confirmation = confirm('Desaja realmente excluir?')
    if(!confirmation) event.preventDefault()
})