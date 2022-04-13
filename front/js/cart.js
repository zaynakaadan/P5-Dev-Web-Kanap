// ------Récupération des donées du local storage------

let addProduit = JSON.parse(localStorage.getItem('cartItems'));
console.log(addProduit);
const cartDisplay = async () => {   //--j'ai construire mon fonction qui vas tout le code à l'intérieur*/
   //----------------Affichage des éléments dans le code HTML-----------------
   
for (let product in addProduit){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id",addProduit[product]._id);
    console.log(productArticle);

// Insertion de l'élément "div"
let productDivImg = document.createElement("div");
productArticle.appendChild(productDivImg);
productDivImg.className = "cart__item__img";


// Insertion de l'image
let productImg = document.createElement("img");
productDivImg.appendChild(productImg);
productImg.src = addProduit[product].imageUrl;
productImg.alt = addProduit[product].altTxt;

// Insertion de l'élément "div"
let productItemContent = document.createElement("div");
productArticle.appendChild(productItemContent);
productItemContent.className = "cart__item__content";


// Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = addProduit[product].name;

     // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = addProduit[product].colors;

// Insertion du prix
let productPrice = document.createElement("p");
productItemContentTitlePrice.appendChild(productPrice);
productPrice.innerHTML = addProduit[product].price+ " €" ;


// Insertion de l'élément "div"
let productItemContentSettings = document.createElement("div");
productItemContent.appendChild(productItemContentSettings);
productItemContentSettings.className = "cart__item__content__settings";

// Insertion de l'élément "div"
let productItemContentSettingsQuantity = document.createElement("div");
productItemContentSettings.appendChild(productItemContentSettingsQuantity);
productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

// Insertion de "Qté : "
let productQte = document.createElement("p");
productItemContentSettingsQuantity.appendChild(productQte);
productQte.innerHTML = "Qté : ";

// Insertion de la quantité
let productQuantity = document.createElement("input");
productItemContentSettingsQuantity.appendChild(productQuantity);
productQuantity.value = addProduit[product].quantite;
productQuantity.className = "itemQuantity";
productQuantity.setAttribute("type", "number");
productQuantity.setAttribute("min", "1");
productQuantity.setAttribute("max", "100");
productQuantity.setAttribute("name", "itemQuantity");

// Insertion de l'élément "div"
let productItemContentSettingsDelete = document.createElement("div");
productItemContentSettings.appendChild(productItemContentSettingsDelete);
productItemContentSettingsDelete.className = "cart__item__content__settings__delete";


// Insertion de "p" supprimer
let productSupprimer = document.createElement("p");
productItemContentSettingsDelete.appendChild(productSupprimer);
productSupprimer.className = "deleteItem";
productSupprimer.innerHTML = "Supprimer";
productSupprimer.addEventListener("click", () => {
    console.log("vous avez supprimé le item");
}
)
}
}
    cartDisplay();

function getTotals(){
    let QuantityTotalcalcul =[];
    // Récupération du total des quantités
    for ( i = 0; i < addProduit; ++i) {
        totalQuantity += elemsQuantity[i].valueAsNumber;
    }
    let productTotalQuantity = document.getElementById('totalQuantity');
    let elemsQuantity = document.getElementsByClassName('itemQuantity');
    productTotalQuantity.innerHTML =  elemsQuantity[i].valueAsNumber;
    QuantityTotalcalcul.push(totalQuantity)

    console.log(QuantityTotalcalcul);

    // Récupération du prix total
    let prixTotalcalcul =[];
    for ( i = 0; i < addProduit; ++i) {
        totalPrice += elemsQuantity[i].valueAsNumber* addProduit[i].price;
    }
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = elemsQuantity[i].valueAsNumber * addProduit[i].price;
    prixTotalcalcul.push(totalPrice)
    console.log(totalPrice);
}
getTotals();











               
























