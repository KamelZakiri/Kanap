/* On récupère l'ID du canapé */

let str = window.location;
let url = new URL(str);
let id = url.searchParams.get("id");
let lien = `http://localhost:3000/api/products/${id}`;

/* On affiche le canapé */

let afficherKanap = function (){
fetch(lien)
.then(function(res) {
    if (res.ok){
        return res.json();
    }
    })

.then( (data) => {
    console.table(data);
    let image = document.querySelector('.item__img');
    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`;

    let nom = document.getElementById('title');
    nom.innerHTML = `<h1 id="title">${data.name}</h1>`;

    let describe = document.getElementById('description');
    describe.innerHTML = `<p id="description">${data.description}</p>`;

    let price = document.getElementById('price');
    price.innerHTML =`${data.price}`;

/* On fait une boucle avec un length pour avoir toute les couleurs des canapé */

    let couleurs = document.getElementById("colors");
    for (let i = 0; i < data.colors.length; i++){
    couleurs.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}`
    };

});

};

afficherKanap();

/* Ajout des articles au panier */

const addToCart = document.getElementById("addToCart")
let colors = document.getElementById("colors")
let qty = document.getElementById("quantity")

addToCart.addEventListener("click", () => {
    const products = {
        _id: id,
        qty: qty.value,
        colors: colors.value,
    };

/* Si on veut ajouté un canapé dans le localstorage */
    let arrayProductsInCart = [];

    arrayProductsInCart.push(products);
    localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
   
/* Si le localstorage existe on récupere le contenu et on le met dans l'array ce qui renverra le nouveau produit */
    if (localStorage.getItem("products") !== null) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));

}});

























