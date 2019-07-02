const BEERS_URL = "http://localhost:3000/beers"
const beerList = document.querySelector("#list-group")

function getBeers(beerList) {
    fetch(BEERS_URL)
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(beer => {
            beerList.innerHTML += `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
        })
    })
}

document.addEventListener("DOMContentLoaded", () => getBeers(beerList))

beerList.addEventListener("click", showBeer)

function showBeer(e) {
    const beerId = e.target.dataset.id
    fetch(`${BEERS_URL}/${beerId}`)
    .then(resp => resp.json())
    .then(beer => {
        const beerDetailDiv = document.querySelector("#beer-detail")
        beerDetailDiv.innerHTML = `<h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>`
        beerDetailDiv.addEventListener("click", e => {
            const newDescription = document.querySelector("textarea").value
            fetch(`${BEERS_URL}/${beer.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                body: JSON.stringify({description: newDescription})
            })
        })
    })
}

