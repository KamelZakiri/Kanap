let url = 'http://localhost:3000/api/products';


fetch(url)
.then(function(res) {
    if (res.ok){
        return res.json();
    }
    })
.then( (data) =>  {
    console.table(data);
    let productName = document.querySelector("#items");

    for (let name of data) {
    console.log(productName);
    productName.innerHTML +=`<a href="./product.html?id=${name._id}">
    <article>
      <img src="${name.imageUrl}" alt="${name.altTxt}">
      <h3 class="productName">${name.name}</h3>
      <p class="productDescription">${name.description}</p>
    </article>
    </a>`;
     }});
    



/*.catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
});
*/


