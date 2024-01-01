let projetPortfolio = document.getElementById("portfolio");
let projet = projetPortfolio.querySelector('h2');
projet.innerHTML = `Mes Projets <a href=#modale class='mofidy'>modifier</a>`
let projetH2 = projet.querySelector('a');
let modale = document.getElementById('modale')

// let modale = document.createElement('aside');
// modale.id = 'modale';
// projetPortfolio.appendChild(modale)

// let divProjets = projetPortfolio.querySelector('.projets');
// // Ajoutez la nouvelle div juste avant la div "projets"
// projetPortfolio.insertBefore(modale, divProjets);

//Coder l'intérieur du modale
let modaleElement = document.createElement('div');
modaleElement.classList.add('modaleElement');
modale.appendChild(modaleElement)

let inModale = document.createElement('p');
inModale.classList.add('inModale');
modaleElement.appendChild(inModale);
inModale.innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam hic quae ad et ipsa, consequuntur ipsum similique incidunt voluptates sequi quos aut numquam vero magni optio deserunt a. Eos, voluptatibus.`


projetH2.addEventListener("click", (e) => {
    e.preventDefault();   
    if (modale) {
        modale.style.display = null
    }
}) 

let cross = document.querySelector(".cross");

cross.addEventListener('click', (e) => {
    e.preventDefault();
    modale.style.display = "none"
})

window.addEventListener('click', function (event) {
    if (event.target == modale) {
        modale.style.display = 'none';
    }
});
