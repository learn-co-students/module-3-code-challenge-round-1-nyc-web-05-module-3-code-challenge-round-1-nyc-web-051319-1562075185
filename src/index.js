document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(json => {
      for (const thisBeer of json) {
        //CREATE LIST OF BEERS
        const beerList = document.querySelector('#list-group')
        beerList.className = "list-group"
        const aBeer = document.createElement('li')
        aBeer.className = "list-group-item"
        aBeer.innerText = thisBeer.name

        aBeer.addEventListener('click',
        function(e){

          const beer = json.find(beer => beer.name === thisBeer.name)

          //CREATE BEER DETAILS
          const beerDetailList = document.querySelector('#beer-detail')

          const beerDetailName = document.createElement('h1')
          beerDetailName.innerText = beer.name

          const beerDetailImage = document.createElement('img')
          beerDetailImage.setAttribute('src', beer.image_url)

          const beerDetailTagLine = document.createElement('h3')
          beerDetailTagLine.innerText = beer.tagline

          const beerDetailDescription = document.createElement('textarea')
          beerDetailDescription.innerText = beer.description

          const beerEdit = document.createElement('button')
          beerEdit.id = "edit-beer"
          beerEdit.className = "btn btn-info"
          beerEdit.innerText = "Save"
          beerEdit.addEventListener('click',
          function(e){
            e.preventDefault()
            fetch('http://localhost:3000/beers' + '/' + beer.id, {
              method: "PATCH",
              headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
              },
              body: JSON.stringify({
                "name": "Kevin"
              })
            })
              .then(res => res.json())
              .then(function(editedBeer){
                beerDetailName.innerText = editedBeer.name
                aBeer.innerText = editedBeer.name
              })
          })

          //RESET BEER DETAILS
          beerDetailList.innerHTML = ''

          //APPEND NEW BEER DETAILS
          beerDetailList.appendChild(beerDetailName)
          beerDetailList.appendChild(beerDetailImage)
          beerDetailList.appendChild(beerDetailTagLine)
          beerDetailList.appendChild(beerDetailDescription)
          beerDetailList.appendChild(beerEdit)
        })

        beerList.appendChild(aBeer)
      }
    })
})
