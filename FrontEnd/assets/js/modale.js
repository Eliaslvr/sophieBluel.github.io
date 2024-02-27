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
    //    document.addEventListener('click', function(event) {
    //     let modaleElement = document.querySelector('.modaleElement');
    //     if (event.target !== modaleElement && !modaleElement.contains(event.target)) {
    //       modaleElement.style.display = "none";
    //     }
    // });
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
    bin.forEach(trash => {
        trash.addEventListener('click', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const dataId = trash.getAttribute('data-id');
            console.log(dataId);

            const init = {
                    method: 'DELETE',
                    headers: {
                    Authorization: `Bearer ${token}`,
                    }
                }

            await fetch(`http://localhost:5678/api/works/${dataId}`, init)
            .then(response => {
                response.json()
                buildGalleryModale();  
            })
            let figure = document.querySelector(`figure[data-figure-id="${dataId}"]`);
            figure.remove();
            console.log(figure);  
        })
    })
}

const clickArrow = document.createElement('a');

function nextModale() {
    //const newForm = document.createElement('form');
    //newForm.id = 'newForm'
    // modaleElement.appendChild(newForm)
    // newForm.appendChild(inModale);

    inModale.appendChild(clickArrow);
    const arrowLeft = document.createElement('i');
    arrowLeft.classList.add('fas','fa-arrow-left', 'arrow');
    clickArrow.appendChild(arrowLeft);
    modale.insertBefore(clickArrow, modale.firstChild)
    titleModale.innerHTML = 'Ajout photo';

    blockInModale.innerHTML = `<div class='ajoutPhoto'>
                                    <i class='far fa-image'></i>
                                    <input type='file' id='image' class='imageValue' name='image'>
                                        <label class='labelFile' for="image">+ Ajouter photo</label>
                                    <p class='paraInput'>jpg, png : 4mo max</p>
                                </div>
                                <div class='emplacement'>
                                    <p>Titre</p>
                                    <input type="text" id='titleValue' name='title'>
                                </div>
                                <div class='emplacement'>
                                    <p>Catégorie</p>
                                    <label type="text" id='category' >
                                    <select class="select" name='category'>
                                        <option value=""></option>
                                        <option value="1">Objets</option>
                                        <option value="2">Appartements</option>
                                        <option value="3">Hotels & restaurants</option>
                                    </select>
                                </div>`
    buttonAjout.innerHTML = 'Valider';
    buttonAjout.classList.remove('buttonAjout');
    buttonAjout.classList.add('valider');
}
//     //onchange se produit lorsque la valeur de l'HTML est modifiée
//     image.onchange = function(e) {
//         //"file" fournit des informations sur les fichiers et permet à JavaScript dans une page Web d'accéder à son contenu.
//         const file = e.target.files[0];
//         //FileReader permet à des applications web de lire le contenu de fichiers 
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             ajoutPhoto.innerHTML = '';
//             const modifPhoto = document.createElement('img');
//             modifPhoto.classList.add('modifPhoto');
//             ajoutPhoto.appendChild(modifPhoto)
//             modifPhoto.src = e.target.result;
//             modifPhoto.alt = e.target.result;
//             ajoutPhoto.style.padding = '0'
//         };

//         reader.readAsDataURL(file);
//     }

buttonAjout.addEventListener('click', (e) => {
    //e.preventDefault();
    // const newFormClass = document.querySelector('#newForm');
    // if (newFormClass == null) {
    //     nextModale();
    // } else {
    //showImage();
    nextModale();
    const ajoutPhoto = document.querySelector(".ajoutPhoto");
    const image = document.getElementById('image');
    const iconeImage = document.querySelector('.fa-image');
    const labelFile = document.querySelector('.labelFile');
    const paraInput = document.querySelector('.paraInput')

    //onchange se produit lorsque la valeur de l'HTML est modifiée
    image.onchange = function(e) {
        //"file" fournit des informations sur les fichiers et permet à JavaScript dans une page Web d'accéder à son contenu.
        const file = e.target.files[0];
        //FileReader permet à des applications web de lire le contenu de fichiers 
        const reader = new FileReader();

        reader.onload = function(e) {
            iconeImage.style.display = 'none';
            labelFile.style.display = 'none';
            paraInput.style.display = 'none';
            const modifPhoto = document.createElement('img');
            modifPhoto.classList.add('modifPhoto');
            ajoutPhoto.appendChild(modifPhoto)
            modifPhoto.src = e.target.result;
            modifPhoto.alt = e.target.result;
            ajoutPhoto.style.padding = '0'
        };

        reader.readAsDataURL(file);
    }
    const imageSelect = document.querySelector('.modifPhoto');
    console.log(imageSelect);
    
    const valider = document.querySelector('.valider');
    valider.addEventListener('click', async (e) => {
        e.preventDefault();
        //const newFormClass = document.querySelector('#newForm');
        const token = localStorage.getItem('token');
        const formData = new FormData();
        const imageSelect = document.querySelector('.modifPhoto');
        if (imageSelect) {
            console.log(imageSelect);
        } else {
            alert('aa')
        }

        let title = document.getElementById('titleValue');
        let category = document.querySelector('.select');

        console.log(title.value);

        formData.append('imageUrl', imageSelect.currentSrc);
        formData.append('title', title.value);
        formData.append('category', category.value);

        // console.log(formData.get('image'));
        // console.log(formData.append('title'));
        // const valueImage = formData.get('image');
        // const valueTitle = formData.get('title');
        // const valueCategory = formData.get('category');
        // console.log('form', {valueImage, valueTitle, valueCategory});

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(res => {
                res.json()
                buildGalleryModale();
            })

            // let gallery = document.querySelector('.gallery');
            //     gallery.innerHTML += 
            //     `<figure data-figure-id="1">
            //         <div data-category=${valueCategory}></div>
            //         <img src=${valueImage} alt=${valueImage}>
            //         <figcaption>${valueTitle}</figcaption>
            //     </figure>`
            // let figure = document.querySelector(`figure[data-figure-id="1"]`);
            // console.log(figure);  

        titleInModale();
        buildGalleryModale();
        buttonModale();
        clickArrow.style.display = 'none';

        const buttonValider = document.querySelector('.valider');
        buttonValider.remove();
        inModale.appendChild(buttonAjout);
        buttonAjout.classList.remove('valider')
        buttonAjout.classList.add('buttonAjout');
        modaleElement.classList.remove('modaleElementAjout');
        modaleElement.classList.add('modaleElement');

        //supprimer form newForm pour re afficher la div inModale
        //newFormClass.remove();
        modaleElement.appendChild(inModale);
        })

    }

    //clickArrow.style.display = 'flex'
)

const valueCategory = document.querySelector('.valueCategory');

clickArrow.addEventListener('click', () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
    clickArrow.style.display = 'none';
    
    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    buttonAjout.classList.remove('valider')
    buttonAjout.classList.add('buttonAjout');
    modaleElement.classList.remove('modaleElementAjout');
    modaleElement.classList.add('modaleElement');

    //supprimer form newForm pour re afficher la div inModale
    // const newFormClass = document.querySelector('#newForm');
    // newFormClass.remove();
    modaleElement.appendChild(inModale);
})

const cross = document.querySelector('.cross');

cross.addEventListener('click', () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
    clickArrow.style.display = 'none';

    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    buttonAjout.classList.remove('valider')
    buttonAjout.classList.add('buttonAjout');
    modaleElement.classList.remove('modaleElementAjout');
    modaleElement.classList.add('modaleElement');

    //supprimer form newForm pour re afficher la div inModale
    const newFormClass = document.querySelector('#newForm');
    newFormClass.remove();
    modaleElement.appendChild(inModale);
})

// document.addEventListener('click', function(event) {
//     let modaleElement = document.querySelector('.modaleElement');
//     if (event.target !== modaleElement && !modaleElement.contains(event.target)) {
//       modaleElement.style.display = "none";
//     }
// });


