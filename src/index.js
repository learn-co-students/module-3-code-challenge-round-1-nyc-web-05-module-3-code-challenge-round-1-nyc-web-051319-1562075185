// console.log('script at the bottom of the page')

/// DOM ELEMENTS ///
const beersUrl = 'http://localhost:3000/beers'
const oneBeerUrl = 'http://localhost:3000/beers/'
const beerDiv = document.querySelector('#beer-detail')
const beerNameContainer = document.querySelector('#list-group')


// console.log(beerNameContainer)
// console.log(beerDiv)


/// fetches ///
function fetchBeers(beersUrl){
  fetch(beersUrl)
  .then(r => r.json())
  .then(beersData => {
    // console.log(beersData)
    beersData.forEach(beer => {
      renderOneBeer(beer)
      // console.log(beer)
    }) // end of forEach
  })// end of Fetch
} // end of fetchBeers


///eventListeners ///

beerNameContainer.addEventListener('click', e => {
  // console.log(e.target.dataset.id)
  const beerId = e.target.dataset.id
  // console.log(beerId)
  if(e.target.dataset.id){
    // console.log('click a beer')
    fetch(oneBeerUrl+beerId)
    .then(r => r.json())
    .then(beerObj =>{
      renderMoreInfo(beerObj)
      // console.log(beerObj)
    })// end of fetch

  }// end of if


})// end of beerNameContainer listener

beerDiv.addEventListener('click', e => {
  // console.log(e.target.parentElement.childNodes[7].innerHTML);
  // console.log(e.target.dataset.id)
  let description = document.getElementById('text').value
  const selectedBeerId = e.target.dataset.id
  // console.log(selectedBeerId)

  if(e.target.id === 'edit-beer'){
    // console.log('udpate beer')
    // console.log(description)

    fetch(oneBeerUrl+selectedBeerId, {
      method:'PATCH',
      headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
      body: JSON.stringify({
         description: description
      })// endo of body
    })// end of fetch
      .then(r => r.json())
      // .then(beer => {
      //   // console.log(beer)
      //
      // })

  }// end of if



})// end of BeerDiv listener


///render func ///

function renderOneBeer(beer){
  beerNameContainer.innerHTML +=`
  <li data-id='${beer.id}' class="list-group-item">${beer.name}</li>
  `

} // end of renderOnerBeer

function renderMoreInfo(beerObj){
  beerDiv.innerHTML = ''
  beerDiv.innerHTML += `
  <h1>${beerObj.name}</h1>
  <img src=${beerObj.image_url}>
  <h3>${beerObj.tagline}</h3>
  <textarea id='text'>${beerObj.description}</textarea>
  <button data-id="${beerObj.id}" id="edit-beer" class="btn btn-info">
  Save
  </button>
  `
}/// end of renderMoreInfo

///invoke///
fetchBeers(beersUrl)
