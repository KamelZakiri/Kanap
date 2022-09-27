// Je récupère les données stocké dans localStorage en JSON
let localStorageProducts = JSON.parse(localStorage.getItem("products"));

let prixTotale = 0;
nbrTotal(localStorageProducts.length);

// Je boucle sur les produits stocké dans le localstorage 
for (let product of localStorageProducts) {

  console.log(product._id, "P")
  //Je requête l'API pour récuperer le reste des info necessaire a la construction de notre panier
  const productUrl = "http://localhost:3000/api/products/" + product._id;

  fetch(productUrl)

    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    // ce qui est été traiter en json sera appelé item
    .then(function (item) {
      afficherProductPanier(item);
    })

    // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
    .catch((err) => {
      document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api:" + err);
    });

  function afficherProductPanier(item) {
    console.log(item, "item")

    // Créer un élément <article> et ajoutez-le au document :
    let ArticlePanier = document.createElement("article");
    // ajouter la classe CSS cart__item à ArticlePanier.
    ArticlePanier.classList.add("cart__item");
    // ajouter la data-id
    ArticlePanier.dataset.id = product.productId;
    // ajouter la data-color
    ArticlePanier.dataset.color = product.couleur;
    // ajouter ArticlePanier en tant que enfant de l'élément avec l'id="cart__items": 
    document.querySelector("#cart__items").appendChild(ArticlePanier);


    // Créer un élément <div> et ajoutez-le au document :
    let div = document.createElement("div");
    // ajouter la classe CSS cart__item__img à div.
    div.classList.add("cart__item__img");
    // ajouter div en tant que enfant de l'élément ArticlePanier: 
    ArticlePanier.appendChild(div);

    // Créer un élément <img> et ajoutez-le au document :
    let imgArticle = document.createElement("img");
    // ajouter l'image du produit
    imgArticle.src = item.imageUrl;
    // ajouter imgArticle en tant que enfant de l'élément div: 
    div.appendChild(imgArticle);


    // Créer un élément <div> et ajoutez-le au document :
    let divContent = document.createElement("div");
    // ajouter la classe CSS cart__item__content à divContent.
    divContent.classList.add("cart__item__content");
    // ajouter divContent en tant que enfant de l'élément ArticlePanier: 
    ArticlePanier.appendChild(divContent);


    // Créer un élément <div> et ajoutez-le au document :
    let divContentDescription = document.createElement("div");
    // ajouter la classe CSS cart__item__content__description à divContentDescription.
    divContentDescription.classList.add("cart__item__content__description");
    // ajouter divContentDescription en tant que enfant de l'élément divContent: 
    divContent.appendChild(divContentDescription);


    // Créer un élément <h2> et ajoutez-le au document :
    let title = document.createElement("h2");
    // ajouter le nom du produit
    title.innerHTML = item.name;
    // ajouter title en tant que enfant de l'élément divContentDescription: 
    divContentDescription.appendChild(title);


    // Créer un élément <p> et ajoutez-le au document :
    let paragrapheColor = document.createElement("p");
    // ajouter la couleur du produit
    paragrapheColor.innerHTML = product.colors;
    // ajouter paragrapheColor en tant que enfant de l'élément divContentDescription:
    divContentDescription.appendChild(paragrapheColor);


    // Créer un élément <p> et ajoutez-le au document :
    let paragraphePrice = document.createElement("p");
    // ajouter le prix du produit
    paragraphePrice.innerHTML = item.price += " " + "\u20AC";
    // ajouter paragraphePrice en tant que enfant de l'élément divContentDescription:
    divContentDescription.appendChild(paragraphePrice);


    // Créer un élément <div> et ajoutez-le au document :
    let divContentSettings = document.createElement("div");
    // ajouter la classe CSS cart__item__content__settings à divContentSettings. 
    divContentSettings.classList.add("cart__item__content__settings");
    // ajouter divContentSettings en tant que enfant de l'élément divContentSettings:
    divContent.appendChild(divContentSettings);

    // Créer un élément <div> et ajoutez-le au document :
    let divContentSettingsQuantity = document.createElement("div");
    // ajouter la classe CSS cart__item__content__settings__quantity à divContentSettingsQuantity. 
    divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    // ajouter divContentSettingsQuantity en tant que enfant de l'élément divContentSettings:
    divContentSettings.appendChild(divContentSettingsQuantity);

    // Créer un élément <p> et ajoutez-le au document :
    let paragrapheQuantity = document.createElement("p");
    // Ajouter Qté à la balise p
    paragrapheQuantity.innerHTML = "Qté :";
    // ajouter paragrapheQuantity en tant que enfant de l'élément divContentSettingsQuantity:
    divContentSettingsQuantity.appendChild(paragrapheQuantity);


    // Créer un élément <input> et ajoutez-le au document :
    let itemQuantity = document.createElement("input");
    // ajouter la classe CSS itemQuantity à itemQuantity.
    itemQuantity.classList.add("itemQuantity");
    // Ajouter les attributs de l'input
    itemQuantity.setAttribute("name", "itemQuantity");
    itemQuantity.setAttribute("type", "number");
    itemQuantity.setAttribute("min", "1");
    itemQuantity.setAttribute("max", "100");
    itemQuantity.setAttribute("value", product.qty);
    divContentSettingsQuantity.appendChild(itemQuantity);


    // Je crée l'événement de modification de type change
    itemQuantity.addEventListener("change", updateValue);
    // Je crée la fonction de updateValue 
    function updateValue() {
      // pour chaque produit du tableau localStorageProducts
      for (let i = 0; i < localStorageProducts.length; i++) {
        // si id et couleur du produit sont identiques a ceux d'un produit dans le localstorge
        if (product._id === localStorageProducts[i]._id && product.colors === localStorageProducts[i].colors) {
          // eliminer le prix de ce produit de la somme totale
          prixTotale = prixTotale - (localStorageProducts[i].qty * parseInt(item.price));
          // la quantité du produit devient la valeur (nombre) de notre champ itemQuantity
          localStorageProducts[i].qty = parseInt(itemQuantity.value, 10);
          // Ajouter le prix avec la nouvelle quantité
          prixTotale = prixTotale + (localStorageProducts[i].qty * parseInt(item.price));
          // afficher la somme totale des prix grace a la fonction prixTotal 
          prixTotal(prixTotale);
          break;
        }
      }
      // stocker products au localStorage
      localStorage.setItem("products", JSON.stringify(localStorageProducts));
    }


    // Créer un élément <div> et ajoutez-le au document : 
    let divContentSettingsDelete = document.createElement("div");
    // ajouter la classe CSS cart__item__content__settings__delete à divContentSettingsDelete. 
    divContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    // ajouter divContentSettingsDelete en tant que enfant de l'élément divContentSettings:
    divContentSettings.appendChild(divContentSettingsDelete);


    // Créer un élément <p> et ajoutez-le au document : 
    let paragrapheDelete = document.createElement("p");
    // ajouter la classe CSS deleteItem à paragrapheDelete.
    paragrapheDelete.classList.add("deleteItem");
    // ajouter le contenu de la balise p
    paragrapheDelete.innerHTML = "Supprimer";
    // ajouter paragrapheDelete en tant que enfant de l'élément divContentSettingsDelete:
    divContentSettingsDelete.appendChild(paragrapheDelete);

    // Je crée l'événement click du suppression
    paragrapheDelete.addEventListener("click", () => {

      // pour chaque produit du tableau localStorageProducts
      for (let j = 0; j < localStorageProducts.length; j++) {
        // si id et couleur du produit sont identiques a ceux d'un produit dans le localstorge
        if (product._id === localStorageProducts[j]._id && product.colors === localStorageProducts[j].colors) {
          // retirer l'élément ayant laposition j du tableau localStorageProducts 
          // 1>0 donc on va supprimer 
          localStorageProducts.splice(j, 1);
          // actualiser la page
          window.location.reload();
        }
      }
      // Je stocke products au localStorage
      localStorage.setItem("products", JSON.stringify(localStorageProducts));

    })
    // prixTotale initialiser a 0 et a chaque fois on fait le calcule 
    prixTotale = prixTotale + (parseInt(item.price) * parseInt(product.qty));
    prixTotal(prixTotale);
  }
}
function prixTotal(prixTotale) {
  document.getElementById("totalPrice").innerHTML = prixTotale;
}
// J'affiche le nbr Total des articles qui egale au nbr des elements du tableau du localstorage 
function nbrTotal(nbrArticles) {
  document.getElementById("totalQuantity").innerHTML = nbrArticles;
}

// Je mets en place une fonction qui retourne le tableau du LS
function getLs() {
  // variable qui stock ce que l'on appel dans le localStorage
  let localStorageProducts = localStorage.getItem("products");
  // si le panier est false (vide)
  if (!localStorageProducts) {
      // retourne un tableau vide
      return [];
  } else {
      // retourne le tableau stocké dans le localStorage
      return JSON.parse(localStorageProducts);
  }
}

// Form et Regex

// Je mets en place l'initialisation de l'objet contact
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

// Je mets en place une variable qui stock si les inputs sont valides ou non
let isValidInputs = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};
// Je défini les différentes RegExp dans une constante
const regExpList = {
  firstName: new RegExp("(^[a-zA-Zéè -]{2,20}$)"),
  lastName: new RegExp("(^[a-zA-Z -]{2,30}$)"),
  address: new RegExp("(^[a-zA-Zéè 0-9,-]{4,50}$)"),
  city: new RegExp("(^[a-zA-Zàéè -]{4,30}$)"),
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
};

// Je mets en place une fonction qui vérifie les inputs et les stockes
function checkUserInformations(input, regex, id) {
  if (regex.test(input.value)) {
      input.style.border = "2px solid Green";
      document.getElementById(`${id}ErrorMsg`).innerText = "";
      contact[id] = input.value;
      isValidInputs[id] = true;
  } else {
      input.style.border = "2px solid Red";
      isValidInputs[id] = false;
      if (id == "firstName" || id == "lastName") {
          document.getElementById(`${id}ErrorMsg`).innerText =
              'Le format est incorrect (ex : "Jean")';
      } else if (id == "email") {
          document.getElementById(`${id}ErrorMsg`).innerText =
              'Le format du mail est incorrect (ex: " jeanhakim@hotmail.com ")';
      } else {
          document.getElementById(`${id}ErrorMsg`).innerText =
              "L'information renseignée n'est pas valide";
      }
  }
}

// J'appel la fonction de validité et de stockage des inputs à l'aide d'une boucle
for (let input of document.querySelector(".cart__order__form")) {
  if (input.type == "text" || input.type == "email") {
      input.addEventListener("change", (e) => {
          checkUserInformations(
              e.target,
              regExpList[e.target.id],
              e.target.id
          );
      });
  }
}

// Fetch POST

// J'écoute le bouton "commander" au click
// vérification du formulaire et du panier
document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();
  let formValidity = Object.values(isValidInputs).includes(false);
  let localStorageProducts = JSON.parse(localStorage.getItem("products"));
  getLs();
  if (formValidity === true && (localStorageProducts === [] || localStorageProducts === null)) {
      alert(
          "Les données renseignées dans le formulaire ne sont pas valides ou ne sont pas remplies et votre panier est vide"
      );
      return;
  } else if (formValidity === true && localStorageProducts.length != 0) {
      alert(
          "Les données renseignées dans le formulaire ne sont pas valides ou ne sont pas remplies"
      );
      return;
  } else if (formValidity === false && (localStorageProducts === [] || localStorageProducts === null)) {
      alert("Le panier est vide");
      return;
  } else {
      //appel de la fonction d'envoi de la commande
      postOrder();
  }
});

// Fonction d'envoi de la commande
// initialisation d'un tableau à 0 pour stocker les ID des produits
function postOrder() {
  let localStorageProducts = JSON.parse(localStorage.getItem("products"));
  let products = [];
  // ajout de chaque id par produit dans un tableau produit
  for (let k = 0; k < localStorageProducts.length; k++) {
      products.push(localStorageProducts[k]._id);
  }

  // Je mets en place la variable data avec les éléments nécessaires concernant les produits et le formulaire
  let data = {
      contact,
      products,
  };

  // Fonction fetch avec methode post "envoi"
  fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  })
      .then((res) => {
          if (res.status == 201) {
              alert("Votre commande a bien été validée");
              return res.json();
          } else if (res.status !== 201) {
              alert(
                  "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
              );
          }
      })
      .then((res) => {
          // Vide le localStorage
          localStorage.clear();
          // Ouvre la page de confirmation avec le numéro de commande dans l'URL
          window.location.href = `../html/confirmation.html?order_id=${res.orderId}`;
      })
      .catch((error) => console.log("Erreur : " + error));
}
