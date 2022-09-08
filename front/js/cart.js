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



/* Je configure le formulaire avec les regex */

/* Je met l'ensemble des regex que je vais utiliser pour ce formulaire */
 let regexPrenom = /^([a-zA-Z]){2,20}$/;
 let regexNom = /^[a-z][A-Z]{2,26}$|^$/i;
 let regexAdresse = /^([0-9]{1,5}[a-zA-Z]{2,8}[a-zA-Z -.,]{3,40})$/;
 let regexVille = /^([a-z][A-Z]{2,25}[0-9]{4,7})$/ ;
 let regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* Je prepare les variables concernant les formulaires */

const prenom = document.getElementById('#firstName');
const nom = document.getElementById('#lastName');
const adresse = document.getElementById('#address');
const ville = document.getElementById('#city');
const mail = document.getElementById('#email');

/* Je mets en place les conditions pour chaque élément présent du formulaire */

/* Nom */

let commanderBouton = document.getElementById('#order')

commanderBouton.addEventListener("click", () => {

let nomError = document.getElementById('#lastNameErrorMsg')

function nomValide () {
if (regexNom.test(nom) == false) {
  prenomError.innerHTML = 'Le prénom est invalide'
  return false;
  
} else {

  return true;
  
}
}

nomValide ();

/* Prénom */

const prenomError = document.getElementById('#firstNameErrorMsg')

function prenomValide () {
  if (regexPrenom.test(prenom) == false) {
    prenomError.innerHTML = 'Le prénom est invalide'
    return false;
    
  } else {
    
    return true;
    
  }
  }

prenomValide ();

/* Adresse */

let adressError = document.getElementById('#addressErrorMsg')

function adresseValide () {
  if (regexAdresse.test(adresse) == false) {
   adressError.innerHTML = 'Les données renseignés sont invalide'
   return false;
      
  } else {
      
    return true;
      
  }
}

adresseValide();

/* Ville */

const villeError = document.getElementById('#cityErrorMsg')

function villeValide () {
  if (regexVille.test(ville) == false) {
    villeError.innerHTML = 'La ville est invalide'
    return false;
    
  } else {
    
    return true;
    
  }
  }

  villeValide();

/* Mail */

const mailError = document.getElementById('#emailErrorMsg')

function mailValide () {
  if (regexMail.test(mail) == false) {
    mailError.innerHTML = 'Le mail est invalide'
    return false;
    
  } else {
    
    return true;
    
  }
  }

  mailValide();
});

