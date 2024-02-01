// let projetPortfolio = document.getElementById("portfolio");
// let projet = projetPortfolio.querySelector('h2');
// projet.innerHTML = `Mes Projets <a href=#modale class='mofidy'>modifier</a>`
// let projetH2 = projet.querySelector('a');
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

let inModale = document.createElement('div');
inModale.classList.add('inModale');
modaleElement.appendChild(inModale);

//Creation de la div title
let title = document.createElement('div');
title.classList.add('titleInModale');
inModale.appendChild(title)
let titleModale = document.createElement('h2');
titleModale.classList.add('titleModale');
title.appendChild(titleModale);

let blockInModale = document.createElement('div');
blockInModale.classList.add('blockInModale');
inModale.appendChild(blockInModale)

//Creation du boutton
let buttonInModale = document.createElement('div');
buttonInModale.classList.add('buttonInModale');
inModale.appendChild(buttonInModale);
let buttonAjout = document.createElement('button');
buttonAjout.classList.add('buttonAjout');
buttonInModale.appendChild(buttonAjout);


function titleInModale() {
    //let inModaleClass = document.querySelector('.inModale')
    titleModale.innerHTML = "Galerie photo";
}

let modify = document.querySelector(".modify");

async function fetchWorksModale() {
    let response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}

modify.addEventListener("click", () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
})

async function buildGalleryModale() {
    let work = await fetchWorksModale()
    if (blockInModale) {
        blockInModale.innerHTML = ""
        for(let affiche of work) {
            blockInModale.innerHTML += 
            `<figure class='modaleElementAffiche'>
                <span class='bin' data-id='${affiche.id}'>
                    <i class='fas fa-dumpster'></i>
                </span>
                <img src=${affiche.imageUrl} alt=${affiche.title}>
            </figure>`
       }
       fetchBin();
    }
    //fetchBin();
};


 function buttonModale() {
    buttonAjout.innerHTML = 'Ajouter une photo'
}

async function fetchBin() {
    const bin = document.querySelectorAll('span.bin');
    const token = localStorage.getItem('token');
    bin.forEach(trash => {
        trash.addEventListener('click', async (e) => {
            const dataId = trash.getAttribute('data-id');
            console.log(dataId);

            const init = {
                    method: 'DELETE',
                    headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
                    }
                }
                
            await fetch(`http://localhost:5678/api/works/${dataId}`, init)
            })
                
        })
    }

buttonAjout.addEventListener('click', () => {
    titleModale.innerHTML = 'Ajout photo';
    blockInModale.innerHTML = ` <div></div>
                                <div>
                                    <p>Titre</p>
                                    <input type="text">
                                </div>
                                <div>
                                    <p>Catégorie</p>
                                    <input type="text">
                                </div>`
    buttonAjout.innerHTML = 'Valider'
    buttonAjout.classList.remove('buttonAjout')
    buttonAjout.classList.add('valider')
})

// function fetchBin() {

//     let bin = document.querySelectorAll('span.bin');    

//     let arrayBin = Array.from(bin);

//     arrayBin.forEach(element => {
//         element.addEventListener('click', () => {

//             // let divsAvecDataCategory = document.querySelectorAll('div[data-category]');
//             // console.log(divsAvecDataCategory);

//             let modaleElementAffiche = document.querySelectorAll('.modaleElementAffiche');

//             modaleElementAffiche.forEach(function(modaleElementAffiche) {
//                 modaleElementAffiche.addEventListener('click', function() {
//                     let dataCategory = modaleElementAffiche.querySelector('div').getAttribute('data-category');
//                     console.log("id = " + dataCategory);
//                     // const apiUrl = `http://localhost:5678/api/works/`;

//                     // fetch(apiUrl)
//                     // .then(response => response.json())
//                     // .then(data => {
//                     //     for (let i = 0; i < data.lenght; i++) {
//                     //         const element = data[i]
//                     //         console.log("ID:", element.id);
//                     //     }
//                     // })

//                     const apiFetch = fetch(`http://localhost:5678/api/works`)
//                     .then((response) => {
//                         return response.json()
//                     })
//                     .then((data) => {
//                         console.log(data);
//                         for (let id of data) {
//                             //console.log(id.id);
//                         }
//                         for (let i = 0; i < data; i++) {
//                             let element = data[i]
//                             console.log(element);
//                             console.log("ID:", element.id);
//                         }
//                     })

//                     const init = {
//                         method: 'DELETE',
//                         headers: {
    //                      token
//                         'Content-Type': 'application/json'
//                         }
//                     }
//                     // fetch(`http://localhost:5678/api/works/` +dataCategory,init)
//                     // .then(response => {
//                     //     if(!response.ok) {
//                     //         console.log("Delete échoué");
//                     //     }
//                     //     return response.json()
//                     // })
//                     // .then((data) => {
//                     //     console.log("Delete reussi",data)
//                     // })
//                 });
//             });

//             // let arrayElement = Array.from(modaleElementAffiche)
//             // console.log(arrayElement);

            
//             // arrayElement.forEach(elementArray => {
//             //     console.log(elementArray);
//             //     let dataCategory = elementArray.querySelector('div').getAttribute('data-category')
//             //     console.log(dataCategory);
//             // })

//             // let dataCategory = modaleElementAffiche.querySelector('div').getAttribute('data-category')
//             // console.log(dataCategory);


//                 // Récupérer la valeur de l'attribut data-category pour chaque div
//                 //let valeurDataCategory = divsAvecDataCategory.dataset.category;
            
//                 // Afficher la valeur dans la console
//                 //console.log(valeurDataCategory);

//             // var maDiv = document.querySelectorAll("maDiv");
//             // var valeurDataCategory = maDiv.dataset.category;
//             // console.log(valeurDataCategory);

//             // const urlParams = new URLSearchParams(window.location.search);
//             // const id = urlParams.get('id');
//             //fetch(`http://localhost:5678/api/users/works/{id}?category=${category}`)
            

//             // const postBin = {
//             //     method: 'POST',
//             //     headers: {
//             //       'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify(arrayBin) // Convertit les données en format JSON
//             //   };
//         });
//     });
// }

//document.addEventListener('DOMContentLoaded', async function () {
    //     await titleInModale();   // Afficher titleModale() en premier
    //     await buildGalleryModale(); // Attendre la construction de la galerie
    //     buttonModale();  // Afficher buttonModale() en dernier
    // });

// async function render() {
//     await titleInModale();
//     buildGalleryModale();
//     buttonModale();
// }
// render();





// Insertion du bouton après l'élément avec la classe "modaleElementAffiche"
//modaleElementAffiche.parentNode.insertBefore(buttonAjout, modaleElementAffiche.nextSibling);

