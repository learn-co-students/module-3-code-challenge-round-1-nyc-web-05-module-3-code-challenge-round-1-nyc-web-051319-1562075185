const beerGroup = document.querySelector('#list-group')
const beerGos = document.querySelector('#beer-detail')

function getBeers() {
    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(beersObj => renderBeers(beersObj))
    .then(getBeer)
}

function renderBeers(beersObj) {
    beersObj.forEach(beer => {
        beerGroup.innerHTML += `<li class="list-group-item">${beer.name}</li>`
    })
}

function getBeer() {
    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(beersObj => getSingleBeer(beersObj))
}

function getSingleBeer(beersObj) {
    beersObj.forEach(beer => {
        displayBeer(beer)
    })
}


function displayBeer(beer) {
    beerGroup.addEventListener('click', function(e) {
        if(e.target.innerHTML === beer.name) {
            // e.target.innerHTML = beer.name wrote this instead and was freaking out over this silly mistake
            beerGos.innerHTML = `<h1>${beer.name}</h1>
            <img src="<${beer["image_url"]}>">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
              Save
            </button>
            <h1> ${beer.id} </h1>
            `
        }
    })

    beerGos.addEventListener("click", function(event) {
        // server crashed and didnt understand why was working and didnt resolve the issue until
        // i only had 25 minutes left. Couldn't fixed my bugs in my code. 
        if(event.target.id === "edit-beer") {
            // Because I didnt fetch from a single beer I wasnt able to grab the id I wanted
            // should have fetch from a single GET http://localhost:3000/beers/:id instead.
        console.log(event.target.id) }
        // got to work on the patch a little bit realizing I should have did things a little different.
        // wished I realized my server went down and was going back and forth figuing out what to do.
        fetch('http://localhost:3000/beers' + `/${beer.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({description: event.target.innerText}),
        })
        .then(res => res.json())
    
    })
}


//beerGos.addEventListener("click", function(e) {
 //   console.log(id)
  //  fetch('http://localhost:3000/beers' + `/${id}`, {
   //     method: 'PATCH', 
    //    headers: {
     //       'Content-Type': 'application/json',
    //        'Accept': 'application/json'
  //      },
  //      body: JSON.stringify({description: "your new description"}),
  //  })
  //  .then(res => res.json())
//})

  



getBeers()
