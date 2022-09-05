/* Je récupère le panier du localStorage */

let items = JSON.parse(localStorage.getItem("products"));
let basketKanap = document.querySelector('.cart__items');
/* Je crée une boucle for pour afficher tout les produits du panier */

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

                    console.table(data)

                    basketKanap.insertAdjacentHTML("afterbegin", `<article class="cart__item" data-id="${items[i]._id}" data-color="${items[i].colors}">
                    <div class="cart__item__img">
                      <img src="${data.imageUrl}" alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${data.name}</h2>
                        <p>${items[i].colors}</p>
                        <p>${data.price}</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>${items[i].qty}</p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`);

                });
            };

    /* Je rajoute le calcul du montant final des canapés */

    /* Je mets en place une condition si le panier est vide */

    /* Je mets en place l'option pour supprimer un article */

    /* Je mets en place les conditions pour le formulaire */
        
