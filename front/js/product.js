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

let localProduct = JSON.parse(localStorage.getItem(("products")))
    let findProduct = false ;
    let position = 0 ; 

    if(newproducts.qty=== 0 || newproducts.colors === ""){
        alert("Veuillez choisir une couleur ou une quantité")
        return
    }

    
    if(localProduct){

 console.log(localProduct,"produit")   
    for(let i=0; i <localProduct.length;i++){
        
 /* Je verifie l'id du produit = a l'id du produit du localstorage */

       if( newproducts._id ===  localProduct[i]._id &&
        newproducts.colors === localProduct[i].colors ) {
        findProduct = true;
        position = i;
        break;
    }
    }
/* Si le produit trouvé est le même j'ajoute la quantité sinon je push un nouveau produit */

if(findProduct===true){
    localProduct[position].qty = localProduct[position].qty + newproducts.qty

}else{
    localProduct.push(newproducts)
}}
else{
    localProduct=[]
    localProduct.push(newproducts)
}

localStorage.setItem("products",JSON.stringify(localProduct))

})
