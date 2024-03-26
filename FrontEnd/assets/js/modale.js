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

let buttonAjout = document.createElement('button');
buttonAjout.classList.add('buttonAjout');
inModale.appendChild(buttonAjout);


function titleInModale() {
    titleModale.innerHTML = "Galerie photo";
}

async function fetchWorksModale() {
    //await bloque l'execution tant qu'il n'a pas recup le fetch
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
            buildGalleryModale();  
            let figure = document.querySelector(`figure[data-figure-id="${dataId}"]`);
            figure.remove();
            console.log(figure);  
        })
    })
}

const clickArrow = document.createElement('a');

function nextModale() {
    const arrow = document.querySelector('.arrow')
    const modaleClick = document.getElementById('modaleClick')
    if(arrow) {
        arrow.style.display = 'initial'
    } else {
    inModale.appendChild(clickArrow);
    const arrowLeft = document.createElement('i');
    arrowLeft.classList.add('fas','fa-arrow-left', 'arrow');
    clickArrow.appendChild(arrowLeft);
    modaleClick.insertBefore(clickArrow, modaleClick.firstChild)
    }
    
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
    buttonAjout.remove();
    const valider = document.createElement('button');
    valider.classList.add('valider');
    inModale.appendChild(valider);
    valider.innerHTML = 'Valider'
}

buttonAjout.addEventListener('click', (e) => {
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
            iconeImage.remove();
            labelFile.remove();
            paraInput.remove();

            const modifPhoto = document.createElement('img');
            modifPhoto.classList.add('modifPhoto');
            ajoutPhoto.appendChild(modifPhoto)
            modifPhoto.src = e.target.result;
            modifPhoto.alt = e.target.result;
            ajoutPhoto.style.padding = '0'
        };
        reader.readAsDataURL(file);
    }

    const valider = document.querySelector('.valider');
    valider.addEventListener('click', (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        let imageSelect = document.getElementById('image');
        let title = document.getElementById('titleValue');
        let category = document.querySelector('.select');

        console.log(imageSelect.value);
        console.log(title.value);
        console.log(category.value);

        formData.append('image', imageSelect.files[0]);
        formData.append('title', title.value);
        formData.append('category', category.value);

        formData.get('image');
        formData.get('title');
        formData.get('category');

        if (imageSelect.value == '' || title.value =="" || category.value == '') {
            alert(`Veuillez sélectionner une image, un titre ainsi qu'une catgorie`)
        } else {
            fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(async res => {
                res.json()
                works = await fetchWorks()
                buildGallery(works)
            })

        titleInModale();
        buildGalleryModale();
        buttonModale();
        clickArrow.style.display = 'none';
        modaleClick.id = 'modale'

        const buttonValider = document.querySelector('.valider');
        const images = document.querySelectorAll('img');
        const body = document.querySelector('body')
        buttonValider.remove();
        inModale.appendChild(buttonAjout);
        buttonAjout.classList.remove('valider')
        buttonAjout.classList.add('buttonAjout');
        body.style = 'max-width: none; background-color: white;';
        images.forEach(image => {
            image.style.filter = 'none';
            image.style.zIndex = '1';
        });
        }
        })
     }
)


clickArrow.addEventListener('click', () => {
    titleInModale();
    buildGalleryModale();
    buttonModale();
    const arrow = document.querySelector('.arrow');
    arrow.style.display = 'none';
    
    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    buttonAjout.classList.remove('valider')
    buttonAjout.classList.add('buttonAjout');
    modaleElement.appendChild(inModale);
})

const cross = document.querySelector('.cross');

cross.addEventListener('click', () => {
    const arrow = document.querySelector('.arrow');
    titleInModale();
    buildGalleryModale();
    buttonModale();
    arrow.style.display = 'none';

    const buttonValider = document.querySelector('.valider');
    buttonValider.remove();
    inModale.appendChild(buttonAjout);
    buttonAjout.classList.remove('valider')
    buttonAjout.classList.add('buttonAjout');
})


window.addEventListener('click', function(e) {
    let modaleClick = document.getElementById('modaleClick')
    const images = document.querySelectorAll('img');
    const body = document.querySelector('body');
    const buttonValider = document.querySelector('.valider');
    const arrow = document.querySelector('.arrow');
    if (e.target == modaleClick) {
        modaleClick.id = 'modale'
        body.style = 'max-width: none; background-color: white;';
        images.forEach(image => {
            image.style.filter = 'none';
            image.style.zIndex = '1';
        });
        buttonValider.remove();
        inModale.appendChild(buttonAjout);
        buttonAjout.classList.add('buttonAjout');

        titleInModale();
        buildGalleryModale();
        buttonModale();
        arrow.style.display = 'none';
    }
})