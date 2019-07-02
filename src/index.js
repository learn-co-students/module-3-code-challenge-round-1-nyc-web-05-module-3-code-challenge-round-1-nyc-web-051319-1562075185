const beerContainer = document.querySelector('#list-group')
const beerDetail = document.querySelector('#beer-detail')

document.addEventListener('DOMContentLoaded', getbeers())

function getbeers() {
    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(beers => {
            beers.forEach(beer => {
                renderBeer(beer)
                console.log(beer)


            })
        })
}

function renderBeer(beer) {
    const li = document.createElement('li')
    li.className = 'list-group-item'
    li.innerText = beer.name
    li.addEventListener('click', (e) => {
        showBeer(beer)
        
    })
    beerContainer.appendChild(li)
}

function showBeer(beer) {
    const h1 = document.createElement('h1')
    h1.innerText = beer.name
    const img = document.createElement('img')
    img.innerText = beer.image_url
    const h3 = document.createElement('h3')
    h3.innerText = beer.tagline
    const textArea = document.createElement('textarea')
    textArea.innerText = beer.description
    const button = document.createElement('button')
    button.className = 'btn btn-info'
    button.datasetId = 'edit-beer'
    button.innerText = 'Save'
    button.addEventListener('click', (e) => {
        const descripValue = textArea.value
        editBeer(descripValue, beer)
    })
    beerDetail.appendChild(h1)
    beerDetail.appendChild(img)
    beerDetail.appendChild(h3)
    beerDetail.appendChild(textArea)
    beerDetail.appendChild(button)


}

function editBeer(description, beer) {
    fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: description
            })
        })
        .then(resp => resp.json())
        .then(beer => beer)
}

// please dont fail me, i cant figure out how to clear the div of contents when i click on a new beer, i googled it and im not following
// but if you have to fail me I understand 