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
    productArticle.setAttribute("data-color",addProduit[product].colors);
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
    // Récupération du total des quantités
 const totalQuantity = addProduit.reduce((acc,addProduit) => acc + Number(addProduit.quantite) , 0)
 let productTotalQuantity = document.getElementById('totalQuantity');
 productTotalQuantity.textContent =  totalQuantity;
// Récupération du prix total
const totalPrice = addProduit.reduce((acc,addProduit) => acc + (addProduit.price*addProduit.quantite) , 0)
let productTotalPrice = document.getElementById('totalPrice');
productTotalPrice.innerHTML = totalPrice; 
console.log('addProduit', addProduit)
console.log('totalQuantity', totalQuantity)
console.log('totalPrice', totalPrice)

        
}
getTotals();

const plusQuantite = async (cartDisplay) => {
    await cartDisplay;
    console.log("fonction plus");
    let plus = document.querySelectorAll(".cart__item" )
    console.log(plus);
    plus.forEach((positive) => {
        
        positive.addEventListener("click" , () => {
            console.log(positive);

            for(i=0; i< addProduit.length;i++){
                if(addProduit[i]._id == positive.dataset.id && 
                    addProduit[i].colors == positive.dataset.color){
                    return addProduit[i].quantite++,
                    
                    localStorage.setItem("cartItems",JSON.stringify(addProduit)),
                    (document.querySelectorAll("#totalQuantity")[i].textContent = addProduit[i].quantite),
                    
                    document.querySelectorAll("#totalPrice")[i].textContent = `${addProduit[i].quantite * addProduit[i].price}`,
                    console.log("quantite++"),
                    //Refresh rapide de la page
            location.reload();
                }
            }
        }
        ) 
    }
    )
}

plusQuantite();







/*function deleteItem(){
    const buttonDelete = document.querySelector(".deleteItem")
    buttonDelete.addEventListener("click" , () => {
        console.log( " vous")
    }
    )
}*/





//----------------------supprimer un ITEM------------------------------
/*function deleteItem() {
    let buttonDelete = document.querySelectorAll(".deleteItem");
  
    for (let j = 0; j < buttonDelete.length; j++){
        buttonDelete[j].addEventListener("click" , (e) => {
            e.preventDefault();
  
            // Select pour supprimer Item by Id & Color
            let idDelete = addProduit[j].idProduit;
            let colorDelete = addProduit[j].couleurProduit;
  
            addProduit = addProduit.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            localStorage.setItem("cartItems", JSON.stringify(addProduit));
            
            alert("Ce produit a bien été supprimé du panier");
           location.reload();
        })
    }
  }
  deleteItem();*/

































