const gallery = () =>  document.querySelector('.gallery');

async function fetchWorks() {
    let response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}

let works = [];

async function buildGallery(works) {
    // console.log(works);
    gallery().innerHTML = "";

   for(let affiche of works) {
    gallery().innerHTML += 
    `<figure>
        <div data-category=${affiche.categoryId}></div>
        <img src=${affiche.imageUrl} alt=${affiche.title}>
        <figcaption>${affiche.title}</figcaption>
    </figure>`
   }
};

document.addEventListener('DOMContentLoaded', async function() {
    works = await fetchWorks()
    buildGallery(works)
})

async function setElement() {
    return await fetch("http://localhost:5678/api/categories")
    .then(data => data.json())
    .then(data => {
        const projet = document.querySelector('.projets');
        let tous = document.createElement('button');
        tous.classList.add('tous');
        tous.innerHTML = "Tous";
        projet.appendChild(tous);

        tous.addEventListener("click", function() {
            buildGallery(works)
        })

        for(let categorie of data) {
            let objet = document.createElement('button');
            objet.innerText = categorie.name;
            objet.setAttribute("data-id", categorie.id)            
            projet.appendChild(objet);
               

            objet.addEventListener("click", function() {
                console.log(this.dataset);
                let affiche = works.filter(element => categorie.id == element.categoryId)
                buildGallery(affiche)
            })
        }
    })
}

setElement()

//    const objetSelect = document.querySelector('.objetSelect');

//    const category = works.map(categorie => categorie.categoryId)

//    const filterObjets = category.filter(obj => obj == 1);
//    console.log(filterObjets);

//    const filterAppartement = category.filter(obj => obj == 2);
//    console.log(filterAppartement);
//    const filterHotel = category.filter(obj => obj == 3);
//    console.log(filterHotel);

//    objetSelect.addEventListener("click", () => {
//     if(filterAppartement) {
//         filterAppartement.remove();
//     } if (filterHotel) {
//         filterHotel.remove();
//     }
//    })

//    objetSelect.addEventListener("click", () => {
//         const category = works.map(categorie => categorie.categoryId)
//         // console.log(category);
//         for(let i = category.lenght -1; i>=0; i++) {
//             if (category[i] = 1) {
//                 category.splice(i,1);
//                 console.log(category);
//             }
//         }
//     })