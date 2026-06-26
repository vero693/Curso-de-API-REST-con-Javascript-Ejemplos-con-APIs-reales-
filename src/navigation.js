window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)
trendingBtn.addEventListener('click', () => location.hash = '#trends')
arrowBtn.addEventListener('click', () => {
    if(
        location.hash.startsWith('#movie=') ||
        location.hash.startsWith('#category=') ||
        location.hash.startsWith('#search=') ||
        location.hash.startsWith('#trends')
    ) {
        history.back();
    } else {
        location.hash = '';
    }
})
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    location.hash = `#search=${encodeURIComponent(searchFormInput.value)}`
})

function navigator() {
    if (location.hash.startsWith('#trends')) trendsPage()
    else if (location.hash.startsWith('#search=')) searchPage()
    else if (location.hash.startsWith('#movie=')) movieDetailsPage()
    else if (location.hash.startsWith('#category=')) categoriesPage()
    else homePage()

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function homePage() {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')
    trendingPrevSection.classList.remove('inactive')
    categoriesPrevSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    searchFormInput.value = ''

    getTrendingMoviesPrev()
    getCategoriesPrev()
}

function trendsPage() {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    trendingPrevSection.classList.add('inactive')
    categoriesPrevSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Tendencias'

    getTrendingMovies()
}

function searchPage() {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')
    trendingPrevSection.classList.add('inactive')
    categoriesPrevSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query] = location.hash.split('=')
    const queryWithSpaces = decodeURI(query)

    searchFormInput.value = queryWithSpaces

    getMoviesBySearch(queryWithSpaces)

    page = 1
}

function movieDetailsPage() {
    headerSection.classList.add('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')
    trendingPrevSection.classList.add('inactive')
    categoriesPrevSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieId] = location.hash.split('=')

    getMovieById(movieId)
}

function categoriesPage() {
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')
    trendingPrevSection.classList.add('inactive')
    categoriesPrevSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')
    const nameWithoutSapces = decodeURI(categoryName)

    headerCategoryTitle.innerHTML = nameWithoutSapces

    page = 1

    getMoviesByCategories(categoryId)
}

