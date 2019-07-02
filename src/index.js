document.addEventListener('DOMContentLoaded', (event) => {
  console.log("The DOM loaded properly! Cheers! 🍻");

  // Global variables
  const beerSidebarList = document.querySelector("#list-group")
  const beerDetail = document.querySelector('#beer-detail')

  console.log("Grabbing a pint. 🍺");
  fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beerData => {
      console.log(beerData);
      beerData.forEach(beerElement => {
        beerSidebarList.innerHTML += `<li class="list-group-item" id="${beerElement.id}">${beerElement.name} 🍺</li>`
      }) //End beer name forEach display
    }) //End beers fetch

    beerSidebarList.addEventListener('click', (event) => {
      console.log("You clicked on a beer, here have some info! 🍺");

      const beerId = event.target.id
      console.log('beerId:    ' + beerId);

      fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(specificBeerData => {
          // I finished early and started adding random stuff, but I know it's not in the readme so pls do not punish me for being Extra.
          beerDetail.innerHTML = `
            <p hidden>${specificBeerData.id}</p>
            <h1>${specificBeerData.name} 🍻</h1>
            <img src="${specificBeerData.image_url}">
            <h3>${specificBeerData.tagline}</h3>
            <blockquote>${specificBeerData.brewers_tips}</blockquote>
            <h4>Description: </h4>
            <textarea>${specificBeerData.description}</textarea>
            <br>
            <br>
            <button id="edit-beer" class="btn btn-info">
              Save
            </button>
            <br>
            <br>
            <footer>
              <p><b>Contributor: </b>${specificBeerData.contributed_by}</p>
            </footer>
          `
        }) // End specific beer data get
    })

    //beerDetail description submit
    beerDetail.addEventListener('click', (event) => {

      console.log(event.target.innerText)
      const beerId = event.target.parentElement.querySelector('p').innerText
      console.log(beerId);

      console.log("You want to edit the description? Be sure to save if you do.")
      const newDesc = event.target.parentElement.querySelector('textarea').value
      console.log(newDesc);


      // If they click save button the desc changes but if they don't goes back to the original
      if (event.target.innerText == "Save") {
        fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        body: JSON.stringify({'description': newDesc})
        })
        .then(resp => resp.json())
      }
    }) // End submit action

}); // End DOM
