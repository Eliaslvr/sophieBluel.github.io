document.addEventListener('DOMContentLoaded', function() {
    const test = document.querySelector('.formu');

    let title = document.createElement("h2");

    title.classList.add('titre');
    title.innerHTML = 'Login';

    let formulaire = document.createElement('form');
    formulaire.classList.add('formulaire');

    formulaire.innerHTML = `<form id="overlayForm" method="POST">

                                <label for="name">E-mail</label>
                                <input type="email" id="email" name="email" required autocomplete="current-email">

                                <label for="password">Mot de passe</label>
                                <input type="password" id="password" name="password" required autocomplete="current-password">

                                <br>
                                <span id="error"></span>

                                <button type="button" id="button">se connecter</button>
                                <a class="forgot_password" href=#>Mot de passe oublié</a>

                            </form>`
    test.appendChild(title)
    test.appendChild(formulaire)
});





document.addEventListener('DOMContentLoaded', function() {

    let button = document.getElementById('button');
    console.log(button);

    button.addEventListener("click", async (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let motDePasse = document.getElementById('password').value;

    let donneesFormulaire = {
        email,
        password: motDePasse,
    }

    console.log(donneesFormulaire);

    const fetchAwait = await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donneesFormulaire)
        })  

        if (fetchAwait.ok) {
            // window.location.href = "../../index.html";
            let data = await fetchAwait.json()
            console.log(data);
            if (data && data.token) { //si data existe et que data.token existe dans data
                let token = data.token;
                console.log(token);
                localStorage.setItem('token', token)
                localStorage.getItem(token)
            
                // Faites ce que vous devez faire avec le token ici
            } 
        } else {
            let error = document.getElementById("error");
        error.innerHTML = `L'adresse mail ou le mot de passe est invalide`
        event.preventDefault();
        }
        console.log(fetchAwait);
    })

});



 


