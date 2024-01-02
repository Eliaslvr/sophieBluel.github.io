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
// inModale.innerHTML = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam hic quae ad et ipsa, consequuntur ipsum similique incidunt voluptates sequi quos aut numquam vero magni optio deserunt a. Eos, voluptatibus.`

let titleModale = document.createElement('h2');
titleModale.classList.add('titleModale');
let inModaleClass = document.querySelector('.inModale')
inModaleClass.appendChild(titleModale);
titleModale.innerHTML = "Galerie photo";

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



//Ajouter element à l'interieur du modale
// const fetchLog = fetch('http://localhost:5678/api/works')
// .then(data => data.json())
// .then(data => {
//     return `<figure>
//         <div data-category=${data.categoryId}></div>
//         <img src=${data.imageUrl} alt=${data.title}>
//         <figcaption>${data.title}</figcaption>
//     </figure>`
// })




function fetchAffiche(){ 
    async function fetchWorks() {
    let response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}

let works = [];

async function buildGallery(works) {
   for(let affiche of works) {
    inModale.innerHTML += 
    `<figure class='modaleElementAffiche'>
        <img src=${affiche.imageUrl} alt=${affiche.title}>
    </figure>`
   }
};

document.addEventListener('DOMContentLoaded', async function() {
    works = await fetchWorks()
    buildGallery(works)
})
}


function buttonModale() {
    let buttonAjout = document.createElement('button');
    buttonAjout.innerHTML = 'Ajouter une photo'
    buttonAjout.classList.add('buttonAjout');
    inModale.appendChild(buttonAjout)
}


async function render() {
    const skeletun = `
    <div>
        <section>
            ${fetchAffiche()}
        </section>
        <section>
            ${buttonModale()}
        </section>
    </div>`
    append(skeletun)
}

render()





// Insertion du bouton après l'élément avec la classe "modaleElementAffiche"
//modaleElementAffiche.parentNode.insertBefore(buttonAjout, modaleElementAffiche.nextSibling);