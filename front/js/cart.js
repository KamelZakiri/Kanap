/* Je récupère le panier du localStorage */

let items = JSON.parse(localStorage.getItem("products"));
let basketKanap = document.querySelector('#cart__items');
let prixTotalCalcul = [];

/* Je crée une boucle for pour afficher tout les produits du panier */

let title = document.getElementById('#cartAndFormContainer')
if (items === 0){
title.innerHTML += `<h1>Votre panier est vide</h1>`
}else {
  let prixTotal = 0;
  for (let i = 0; i < items.length; i++) {  


/* Je rajoute un [i] pour pouvoir avoir l'id de chaque item déclarer dans le localstorage */

            let itemId = items[i]._id;
            let itemUrl = `http://localhost:3000/api/products/${itemId}`;

            fetch(itemUrl)
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                })

                .then((data) => {

                    /*console.table(data.price)*/
                    basketKanap.innerHTML +=`<article class="cart__item" data-id="${items[i]._id}" data-color="${items[i].colors}">
                    <div class="cart__item__img">
                      <img src="${data.imageUrl}" alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${data.name}</h2>
                        <p>${items[i].colors}</p>
                        <p>${data.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté :</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${items[i].qty}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`;



/* Je rajoute le calcul du montant final des canapés ainsi que les quantités */
    

    let prixPanier = data.price ;
    let quantiteProduit = items[i].qty

   prixTotalCalcul = prixPanier * quantiteProduit ;
   prixTotal = prixTotal + (items[i].qty * parseInt(data.price))

  showTotalprice(prixTotal)

   console.log("data_price",data.price)




 



 console.table(prixTotalCalcul);

 /*let prixFinal = document.getElementById('#totalPrice');
 prixFinal.innerHTML = "";

 let qtyFinal = document.getElementById('#totalQuantity');
 qtyFinal.innerHTML = "";*/


 /* Je mets en place l'option pour supprimer un article */

/* let deleteItem = document.getElementsByClassName('deleteItem');

 deleteItem.addEventListener("click", () => {
  localStorage.clear(items[i].qty);
});*/

  });
  };   

}

console.log("Totale_Price",prixTotalCalcul)

function showTotalprice(prixTotal){
  console.log(prixTotal,"total")
  }


/* Je configure le formulaire avec les regex 

/* Je met l'ensemble des regex que je vais utiliser pour ce formulaire */
function regexPrenom(value){
return /^[a-z-A-Z\s]{3,20}$/.test(value)
}
function regexNom(value){
return /^[a-z-A-Z\s]{3,26}$/.test(value) 
}
function regexAdresse(value){
return /^[0-9]{1,5}[a-z-A-Z\s]{2,8}[a-z-A-Z -.,]{3,40}$/.test(value)
}
function regexVille(value){
return /^[a-z-A-Z\s]{2,25}[0-9]{4,7}$/.test(value)
}
function regexMail(value){
return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
}

/* Je prepare les variables concernant les formulaires */

const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city');
const mail = document.getElementById('email');

/* Je mets en place les conditions pour chaque élément présent du formulaire */

/* Nom */

let nomError = document.getElementById('lastNameErrorMsg'); 

nom.addEventListener('change',( ) => {
if (regexNom(nom.value)) {
nomError.classList.add('opacity');
nomError.innerHTML = "";

 
 return false;
 
} else {
  nomError.classList.remove('opacity');
  nomError.innerHTML = "Le Nom est invalide";
 return true;
 
}
});


/* Prénom */

const prenomError = document.getElementById('firstNameErrorMsg')

prenom.addEventListener ('change',() => {
 if (regexPrenom(prenom.value)) {
   prenomError.innerHTML = "";
   return false;
   
 } else {
   prenomError.innerHTML = 'Le prénom est invalide';
   return true;
   
 }
 })



/* Adresse */

let adressError = document.getElementById('addressErrorMsg')

adresse.addEventListener ('change',() => {
 if (regexAdresse(adresse.value)) {
  adressError.innerHTML = "";
  return false;
     
 } else {
    adressError.innerHTML = 'Les données renseignés sont invalides';
   return true;
     
 }
});



/* Ville */

const villeError = document.getElementById('cityErrorMsg')

ville.addEventListener ('change',() => {
 if (regexVille(ville.value)) {
   villeError.innerHTML = "";
   return false;
   
 } else {
   villeError.innerHTML = 'La ville est invalide';
   return true;
   
 }
 });



/* Mail */

const mailError = document.getElementById('emailErrorMsg')

mail.addEventListener ('change',() => {
 if (regexMail(mail.value)) {
   mailError.innerHTML = "";
   return false;
   
 } else {
   mailError.innerHTML = 'Le mail est invalide';
   return true;
   
 }
 });







