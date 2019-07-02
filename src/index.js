const BEERS_URL = 'http://localhost:3000/beers'
const BEER_URL = 'http://localhost:3000/beers/'
const beerList = document.querySelector('#list-group')
const beerDetail = document.querySelector('#beer-detail')
document.addEventListener('DOMContentLoaded', getBeers)
// labeled all constants for html tags that were given, as well as initialized the js page with dom content loaded
function getBeers(){
    fetch(BEERS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(beer => renderBeers(beer))
    )
}
// fetched beers, parsed data, then took the parsed data and for each beer passed it to the function render beers
// in rednerBeers I created a new element for list and gave it a class name then i defined its inner text by interpolating through the beer argument which i passed in as an argument at the end of my getbeers function
// appended the name to the beer list div which was given to us in the index html and i also defined above as a constant
// At the end of this i added an event listener
function renderBeers(beer){
    const beerName = document.createElement('li')
    beerName.className = "list-group-item"
    beerName.innerText = `${beer.name}`
    beerList.appendChild(beerName)
    beerList.addEventListener('click', e => {
        if (e.target.innerText === `${beer.name}`)
            fetch(BEER_URL+`${beer.id}`)
            .then(resp => resp.json())
            .then(brew => displayBeers(brew))
        })
}

function displayBeers(brew){
    const h1 = document.createElement('h1')
    h1.innerText = `${brew.name}`
    beerDetail.appendChild(h1)
    const img = document.createElement('img')
    img.setAttribute('src', `${brew.image_url}`)
    beerDetail.appendChild(img)
    const h3 = document.createElement('h3')
    h3.innerText = `${brew.tagline}`
    beerDetail.appendChild(h3)
    const text = document.createElement('textarea')
    text.innerText = `${brew.description}`
    beerDetail.appendChild(text)
    const editBtn = document.createElement('BUTTON')
    editBtn.className = "btn btn-info"
    editBtn.setAttribute('id', "edit-beer")
    editBtn.innerText = "Save"
    beerDetail.appendChild(editBtn)
        beerDetail.addEventListener('click', e => {
            if(e.target.innerText === "Save"){
                fetch(BEER_URL+`${brew.id}`, {
                    method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            description: `${text.value}`
                        })
                })
                .then(resp => resp.json())
                .then(breh => console.log(breh))
            }
        })
}


