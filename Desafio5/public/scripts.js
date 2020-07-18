const currentPage = location.pathname
const menuItems   = document.querySelectorAll("header .links a")
const formDelete  = document.querySelector("#form-delete")

/* ### MENU ATIVO ### */
for (const menu of menuItems) {
    if(currentPage.includes(menu.getAttribute('href'))) menu.classList.add('active')
    if(menu.getAttribute('href') == '/') menu.classList.remove('active')
}

if(formDelete){
    formDelete.addEventListener('submit', (event) => {
        const confirmation = confirm("Deseja realmente excluir?? ")
        
        if (!confirmation) event.preventDefault()
    })
}

/* PAGINAÇÃO */
function paginate(totalPages, selectedPage){
    let pages        = [],
        oldPage
    
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstSecondAndLastPages = (currentPage == 1 || currentPage == 2) || (currentPage == totalPages || currentPage == totalPages - 1)
        const pagesAfterSelectedPage  = currentPage <= selectedPage + 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1 
        
        if( firstSecondAndLastPages || pagesBeforeSelectedPage && pagesAfterSelectedPage){
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
    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page   = +pagination.dataset.page
    const total  = +pagination.dataset.total
    const pages  = paginate(total, page)

    let elements = ''

    for (const page of pages) {
        if(String(page).includes('...')){
            elements += `<span>${page}</span>`
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            }else{
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if(pagination){
    createPagination(pagination)
}


