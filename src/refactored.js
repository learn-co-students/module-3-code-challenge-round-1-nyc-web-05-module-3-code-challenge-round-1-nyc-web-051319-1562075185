// Was messing around with this version as a refactored version to do 2 fetch requests
// 1- fetch all that grabs the names only FOR the li elements
// 2- a seperate fetch that grab individual elements details. i feel that this would have solved my problem
// i have over in index.js where my dad won't reflect changes without a reload, since the
// getting of the API info is done on page load, and the detail container info is string
// interpolated in.

// ALAS time makes fools of us all, so mostly ignore this script :)

// Global Variables
const beersUrl = 'http://localhost:3000/beers'
const beerDetailsContainer = document.querySelector('#beer-detail')
const beersListContainer = document.querySelector('#list-group')

// DOM Loaded?
document.addEventListener('DOMContentLoaded', getBeers())

// Grab all beers --> JSON
function getBeers() {
    fetch(beersUrl)
        .then(r => r.json())
        .then(beers =>
            beers.forEach(beer =>
                renderBeerList(beer)))
}

// Render beer elements
function renderBeerList(beer) {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = beer.name
    li.addEventListener('click', function (e) {
        renderBeerDetails(beer)
    })
    beersListContainer.appendChild(li)
}
// this isnt done but YOU READ MY README >:O (at the top)
function getBeerDetails(id) {
        fetch(`${beersUrl}/${id}`)
            .then(r => r.json())
            .then(beer => renderBeerDetails(beer))
    }

// Render beer deetz element
function renderBeerDetails(beer) {
    beerDetailsContainer.innerHTML = `
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea data-id="${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">Save</button>
    `
    // This method below only APPENDED new beer details below. Curious how you could
    // get something like this to work (ReplaceChild would work but intially child's dont exist)
    // ---------------------------------------------------
    // const h1 = document.createElement('h1')
    // h1.innerText = beer.name
    // const img = document.createElement('img')
    // img.src = beer.image_url
    // const h3 = document.createElement('h3')
    // h3.innerText = beer.tagline
    // const textArea = document.createElement('textarea')
    // textArea.innerText = beer.description
    // const button = document.createElement('button')
    // button.id = 'edit-beer'
    // button.className = 'btn btn-info'
    // button.innerText = 'Save'
    // beerDetailsContainer.appendChild(h1)
    // beerDetailsContainer.appendChild(img)
    // beerDetailsContainer.appendChild(h3)
    // beerDetailsContainer.appendChild(textArea)
    // beerDetailsContainer.appendChild(button)
    // -----------------------------------------------------
}
// Event listener looking for some click action ~*~*~*~*~*~*~*~
beerDetailsContainer.addEventListener('click', function (e) {
    if (e.target.id === 'edit-beer') {
        debugger
        const newDescription = beerDetailsContainer.querySelector('textarea').value
        const id = beerDetailsContainer.querySelector('textarea').dataset.id
        editBeerDescription(id, newDescription)
        // Want to make the DOM show the updated description (need to force another Fetch)
        beerDescription = newDescription
        updateBeer()
        // beer.description = newDescription
        // Cheap cop-out way to DOM to immediately show changes without refresh ;(
        // location.reload()
    }
})

// Edit function for changing beer Description
function editBeerDescription(id, newDescription) {
    fetch(`${beersUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            description: newDescription
        })
    })
        .then(r => r.json())
        .then(editedBeer => renderBeerDetails(editedBeer))
}