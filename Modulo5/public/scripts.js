const currentPage = location.pathname
const menuItems   = document.querySelectorAll("header .links a")
const formDelete  = document.querySelector('#form-delete')

for (const item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

/* TELINHA DE CONFIRMAÇÃO NO DELETE DOS FORMULARIOS */
if(formDelete){
    formDelete.addEventListener('submit', (event) => {
        const confirmation = confirm('Desaja realmente excluir?')
        if(!confirmation) event.preventDefault()
    })
}

/* LOGICA PARA PAGINAÇÃO */
// totalPages = 20
// selectedPage = 12
// [1, ..., 10, 11, 12, 13, 14, ..., 20]
let totalPages   = 20,
    selectedPage = 12,
    pages        = [],
    oldPage

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage        = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage  = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
        if(oldPage && currentPage - oldPage > 2){
            pages.push('...')
        }
        if(oldPage && currentPage - oldPage == 2){
            pages.push(oldPage + 1)
        }
        
        pages.push(currentPage)
        
        oldPage = currentPage
    }
}

console.log(pages)