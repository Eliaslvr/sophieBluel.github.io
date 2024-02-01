const gallery = () =>  document.querySelector('.gallery');

async function fetchWorks() {
    let response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}

let works = [];

async function buildGallery(works) {
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

const token = localStorage.getItem('token');

if (token) {
    let loginButon = document.getElementById('loginButton');
    loginButon.innerHTML = 'Logout'
    let header_login = document.createElement('div');
    header_login.className = 'header_login';
    header_login.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>' +
                        '<p>Mode édition</p>';
                        document.body.insertBefore(header_login, document.body.firstChild);

    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const body = document.querySelector('body');
    
    body.style = 'max-width: none; background-color: white;';
    header.style = 'max-width: 1140px; margin: 50px auto;';
    main.style = 'max-width: 1140px; margin: 0px auto;';
    footer.style = 'max-width: 1140px; margin: 0px auto;';

    let projetPortfolio = document.getElementById("portfolio");
    let projet = projetPortfolio.querySelector('h2');
    projet.innerHTML = `Mes Projets <a href=#modale class='modify'>modifier</a>`
    let projetH2 = projet.querySelector('a');
    let modale = document.getElementById('modale')

    projetH2.addEventListener("click", (e) => {
        e.preventDefault();   
        if (modale) {
            modale.style.display = null
            body.style = 'background-color: rgba(0, 0, 0, 0.3);';
        } else {
            body.style = 'background-color: white;';
        }
    }) 
    

    let cross = document.querySelector(".cross");
    // cross.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log(body.style.background);
    //     body.style = 'background-color: red;'
    // })
    
    // cross.addEventListener('click', (event) => {
    //     if (event.target == cross ) {
    //         modale.style.display = "none";
    //     //body.style = 'max-width: none; background-color: white;';
    //         body.style = 'max-width: none; background-color: white;';
    //     }
    //     // modale.style.display = "none";
    //     // //body.style = 'max-width: none; background-color: white;';
    //     // body.style = 'max-width: none; background-color: white;';
    //     console.log(body);

    // })

    cross.addEventListener('click', (event) => {
        event.preventDefault();
        modale.style.display = 'none';
        body.style = 'max-width: none;';
        body.style.backgroundColor = 'white;';
    })
    
    window.addEventListener('click', function (event) {
        let modaleElement = document.querySelector('.modaleElement')
        // event.preventDefault();
        // if (event.target == modale) {
        //     modale.style.display = 'none';
        //     body.style = 'max-width: none; background-color: white;';
        // } else {
        //     body.style = 'max-width: none; background-color: rgba(0, 0, 0, 0.3);';
        // }
        if (event.target == modaleElement) {
            modale.style.display = 'none';
            body.style = 'max-width: none; background-color: white;';
        }
    });

    // document.querySelector('.projets').style = 'display: none;'

    // loginButon.addEventListener('click', (e) => {
    //     localStorage.clear()
    //     window.location.reload()
    // })

}