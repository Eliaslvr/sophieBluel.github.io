let modale = document.getElementById('modale')

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
// let buttonInModale = document.createElement('div');
// buttonInModale.classList.add('buttonInModale');
// inModale.appendChild(buttonInModale);
let buttonAjout = document.createElement('button');
buttonAjout.classList.add('buttonAjout');
inModale.appendChild(buttonAjout);


function titleInModale() {
    titleModale.innerHTML = "Galerie photo";
}

async function fetchWorksModale() {
    let response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}

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
};


 function buttonModale() {
    buttonAjout.innerHTML = 'Ajouter une photo'
}

let modify = document.querySelector(".modify");

modify.addEventListener("click", () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
})

async function fetchBin() {
    const bin = document.querySelectorAll('span.bin');
    const token = localStorage.getItem('token');
    bin.forEach(trash => {
        trash.addEventListener('click', async (e) => {
            e.preventDefault();
            const dataId = trash.getAttribute('data-id');
            console.log(dataId);

            const init = {
                    method: 'DELETE',
                    headers: {
                    Authorization: `Bearer ${token}`,
                    //'Content-Type': 'application/json'
                    }
                }
                
            await fetch(`http://localhost:5678/api/works/${dataId}`, init)
            .then(response => {
                response.json()})
            })
        })
        return false;
    }

const clickArrow = document.createElement('a');

function nextModale() {
    //const newForm = document.createElement('form');!
    //newForm.id = 'newForm'!
    // newForm.classList.add('newForm');
    //modaleElement.appendChild(newForm)!
    //newForm.appendChild(inModale)!
    // newForm.appendChild(inModale);
    //document.body.appendChild(newForm);

    inModale.appendChild(clickArrow);
    const arrowLeft = document.createElement('i');
    arrowLeft.classList.add('fas','fa-arrow-left', 'arrow');
    clickArrow.appendChild(arrowLeft);
    modale.insertBefore(clickArrow, modale.firstChild)
    titleModale.innerHTML = 'Ajout photo';

    blockInModale.innerHTML = `<div class='ajoutPhoto'>
                                    <i class='far fa-image'></i>
                                    <input type='file' id='image' name='image'>
                                        <label class='labelFile' for="image">+ Ajouter photo</label>
                                    <p>jpg, png : 4mo max</p>
                                </div>
                                <div class='emplacement'>
                                    <p>Titre</p>
                                    <input type="text" id='title' name='title'>
                                </div>
                                <div class='emplacement'>
                                    <p>Catégorie</p>
                                    <input type="text" id='category' name='category'>
                                    <ul class='deroulant'>
                                        <li><a href='#' id='1'>Objets</a></li>
                                        <li><a href='#' id='2'>Appartements</a></li>
                                        <li><a href='#' id='3'>Hôtels & restaurants</a></li>
                                    </ul>
                                </div>`
    buttonAjout.remove()
    // buttonAjout.innerHTML = 'Valider';
    // buttonAjout.classList.remove('buttonAjout');
    // buttonAjout.classList.add('valider');
    // buttonAjout.setAttribute("type", "button");
    const deroulant = document.querySelector('.deroulant');
    deroulant.style.display = 'none';
    const buttonValider = document.createElement('button');
    buttonValider.classList.add('valider');
    buttonValider.innerHTML = 'valider'
    inModale.appendChild(buttonValider);
}

buttonAjout.addEventListener('click', (e) => {
    e.preventDefault();
    nextModale();

    const ajoutPhoto = document.querySelector('.ajoutPhoto');
    const image = document.getElementById('image');

    //onchange se produit lorsque la valeur de l'HTML est modifiée
    image.onchange = function(e) {
        //"file" fournit des informations sur les fichiers et permet à JavaScript dans une page Web d'accéder à son contenu.
        const file = e.target.files[0];
        //FileReader permet à des applications web de lire le contenu de fichiers 
        const reader = new FileReader();

        reader.onload = function(e) {
            ajoutPhoto.innerHTML = '';
            const modifPhoto = document.createElement('img');
            modifPhoto.classList.add('modifPhoto');
            ajoutPhoto.appendChild(modifPhoto)
            modifPhoto.src = e.target.result;
            modifPhoto.alt = e.target.result;
            ajoutPhoto.style.padding = '0'
        };

        reader.readAsDataURL(file);
    }

    const buttonValider = document.querySelector('.valider');

    buttonValider.addEventListener('click', () => {
        const token = localStorage.getItem('token');

        const modifPhoto = document.querySelector('.modifPhoto');
        const image =  modifPhoto.getAttribute('src', 'alt');
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;

        console.log("valeur", {image, title, category});
        const valeurFinal = {
            image,
            title,
            category
        }

        console.log(valeurFinal);

        fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: valeurFinal,
            })
                .then(res => res.json())
                .then(res => console.log(res))        
    })
    clickArrow.style.display = 'flex'
})

// buttonAjout.addEventListener('click', (e) => {
//     e.preventDefault();
//     //const newFormClass = document.querySelector('#newForm');
//     const inModale = document.querySelector('.inModale');
//     if (inModale == null) {
//         nextModale();
//     } else {
//     //const newFormClass = document.querySelector('#newForm');
//     //newFormClass.addEventListener('click', (e) => {
//         e.preventDefault();
//         // const token = localStorage.getItem('token');
//         // const formData = new FormData(newFormClass);
//         // const valueImage = formData.get('image');
//         // const valueTitle = formData.get('title');
//         // const valueCategory = formData.get('category');
//         // console.log('form', {valueImage, valueTitle, valueCategory});

//         // const valueImage = document.querySelector('.labelFile').value;
//         // const valueTitle = document.getElementById('valueTitle').value;
//         // const valueCategory = document.getElementById('valueCategory').value;

//         const modale = document.getElementById('modale');
//         const body = document.querySelector('body')
//         modale.style.display = 'none';
//         body.style.backgroundColor = 'white;';

//             fetch('http://localhost:5678/api/works', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: inModale,
//             })
//                 .then(res => res.json())
//                 .then(res => console.log(res))
//         }

//     clickArrow.style.display = 'flex'
//     }
// )

const valueCategory = document.querySelector('.valueCategory');

// function toggleDropdown(){
//     const deroulant = document.querySelector('.deroulant');
//     if (deroulant.style.display = 'none') {
//         deroulant.style.display = 'block';
//     } else {
//         deroulant.style.display = 'none'
//     }
// }

        //const valider = document.querySelector('.valider');

        // function addMovie(e) {
        //     e.preventDefault();
        //     const formData = new FormData(newFormClass);
        //     console.log(formData);
        //     const valueTitle = formData.get('valueTitle');
        //     console.log(valueTitle);
        // }

        // const titleValue = document.querySelector('#valueTitle');
        // const valueCategory = document.querySelector('#valueCategory');
        
        // valider.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     const formData = new FormData(newFormClass);
        // })
    



clickArrow.addEventListener('click', () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
    clickArrow.style.display = 'none';
    
    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    // buttonAjout.classList.remove('valider')
    // buttonAjout.classList.add('buttonAjout');
    modaleElement.classList.remove('modaleElementAjout');
    modaleElement.classList.add('modaleElement');

    //supprimer form newForm pour re afficher la div inModale
    // const newFormClass = document.querySelector('#newForm');
    // newFormClass.remove();
    modaleElement.appendChild(inModale);
})

const cross = document.querySelector('.cross');

cross.addEventListener('click', () => {
    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    //buttonAjout.classList.remove('valider')
    //buttonAjout.classList.add('buttonAjout');
    modaleElement.classList.remove('modaleElementAjout');
    clickArrow.style.display = 'none';

    // const newFormClass = document.querySelector('#newForm');
    // newFormClass.remove();
    modaleElement.appendChild(inModale);
})

// const newFormClass = document.querySelector('.newForm');
// newFormClass.addEventListener('submit', addMovie);

// function addMovie(e) {
//     e.preventDefault();
//     const formData = new FormData(newFormClass);
//     const titleData = formData.get('title');
//     console.log('title', titleData);
// }


// newFormClass.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const valueTitle = document.querySelector('.valueTitle').value
//     console.log(valueTitle);
// })







// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const titleValue = document.querySelector('valueTitle').value;
//     const valueCategory = document.querySelector('valueCategory').value;
// });



