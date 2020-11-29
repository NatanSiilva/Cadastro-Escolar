const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href")) ) {
        item.classList.add("active")
    }
}



// PAGINAÇÃO 

// totalPages = 20
// selectedPages = 15
// [1, ... , 13, 14, 15, 16, 17, ..., 20]


function paginate(selectedPages, totalPages) {

    let pages = [],
        oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPages = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPages + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPages - 2

        if(firstAndLastPages || pagesBeforeSelectedPage &&  pagesAfterSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }
            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            pages.push(currentPage)
            oldPage = currentPage   
        }
    }
    return pages
}

const pagination = document.querySelector(".pagination")

function createPagination(pagination) {

    const filter = pagination.dataset.filter
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const pages = paginate(page,total)

    let elements = ""

    for (let page of pages) {

        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        } 
    }

    pagination.innerHTML = elements
    
}

if (pagination) {
    createPagination(pagination)
}