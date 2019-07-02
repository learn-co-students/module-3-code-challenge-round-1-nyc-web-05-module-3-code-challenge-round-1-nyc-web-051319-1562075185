const list = document.querySelector('#list-group')
const beerDetail = document.querySelector('#beer-detail')


function fetchBeers() {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(beer => {
            list.innerHTML += `
            <li class="list-group-item" id=${beer.id}>${beer.name}</li>`

        })
    })
}

fetchBeers()

list.addEventListener('click', function(e) {
    if (e.target.className === 'list-group-item') {
        fetch(`http://localhost:3000/beers/${e.target.id}`)
        .then(resp => resp.json())
        .then(beer => {
            beerDetail.innerHTML = `
                <h1 id=${beer.id}>${beer.name}</h1>
                <img src=${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <textarea class="textbox">${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">
                    Save
                </button> `
        })
    }
})

beerDetail.addEventListener('keydown', function(e){
     e.target.textContent += e.key   
})


beerDetail.addEventListener('click', function(e) {
    const textBox = e.target.parentElement.querySelector("textarea")
    if (e.target.className === 'btn btn-info') {
            fetch(`http://localhost:3000/beers/${e.target.parentElement.querySelector("h1").id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: textBox.textContent
            })
        })
        .then(resp => resp.json())
        .then(patch => {
            textBox.textContent = patch.description
        })
    }
})
