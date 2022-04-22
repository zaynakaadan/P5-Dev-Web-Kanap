// ------Récupération des donées du local storage------
let someProduct = [];

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
productQuantity.setAttribute("min", 1);
productQuantity.setAttribute("max", 100);
productQuantity.setAttribute("name", "itemQuantity");
productQuantity.setAttribute("data-id",addProduit[product]._id);
productQuantity.setAttribute("data-color",addProduit[product].colors);


// Insertion de l'élément "div"
let productItemContentSettingsDelete = document.createElement("div");
productItemContentSettings.appendChild(productItemContentSettingsDelete);
productItemContentSettingsDelete.className = "cart__item__content__settings__delete";


// Insertion de "p" supprimer
let productSupprimer = document.createElement("p");
productItemContentSettingsDelete.appendChild(productSupprimer);
productSupprimer.className = "deleteItem";
productSupprimer.innerHTML = "Supprimer";
productSupprimer.setAttribute("data-id",addProduit[product]._id);
productSupprimer.setAttribute("data-color",addProduit[product].colors);
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

// ajoute un plus de la quantité depuis la page panier
const plusQuantite = async (cartDisplay) => {
    await cartDisplay;
    console.log("fonction plus");
    let plus = document.querySelectorAll(".itemQuantity") 
    console.log(plus);
    plus.forEach((positive) => {
        
        positive.addEventListener("click" , () =>  {
            console.log(positive);

            for(i=0; i< addProduit.length;i++){
                if(addProduit[i]._id == positive.dataset.id && 
                    addProduit[i].colors == positive.dataset.color){
                    return addProduit[i].quantite++,
                    
                    localStorage.setItem("cartItems",JSON.stringify(addProduit)),
                    
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



const minQuantite = async (cartDisplay) => {
  await cartDisplay;
  let moins = document.querySelectorAll(".itemQuantity");
  moins.forEach((negative) => {
    negative.addEventListener("click" , ()  => {
      console.log(negative);


    let totalAddProduit = addProduit.length;
    for(i=0 ; i<totalAddProduit; i++){
    console.log(totalAddProduit);
   
    if(addProduit[i].quantite == 1 && totalAddProduit == 1){
        return (
         localStorage.removeItem('cartItems'),
        (location.href = "cart.html") ,
        console.log("remove moins tout")
        );   
    }
    if(addProduit[i].quantite == 1 && totalAddProduit != 1 &&      //un condition pour 1 produit et plusieur produits
        addProduit[i]._id == negative.dataset.id && addProduit[i].colors == negative.dataset.color ){///il y a plusieur produits dans le tableau mais il y en a un qui a une 1 quantité il faut suprimer cette produit la
        addProduit.splice(i,1)    //pour supprimer un 1 élément à cet index
        
        localStorage.setItem('cartItems', JSON.stringify(addProduit));
//Refresh rapide de la page
        location.href = "cart.html";
        console.log("moins un produit dans le panier ");
    }
    if(
        addProduit[i].quantite != 1 && totalAddProduit != 1 &&
        addProduit[i]._id == negative.dataset.id && addProduit[i].colors == negative.dataset.color){

        return (
            addProduit[i].quantite--,
            localStorage.setItem("cartItems",JSON.stringify(addProduit),
            
            console.log("quantite--"))
            );
    }
}

      
    })  
    })
};

minQuantite();


const removeProduct = async (cartDisplay) => {
        await cartDisplay
        
    console.log("remove product");
    let corbeilles = document.querySelectorAll(".deleteItem")
    console.log(corbeilles);
    corbeilles.forEach((corbeille) => {corbeille.addEventListener("click", ()=> {
console.log(corbeille);

let totalAddProduitRemove = addProduit.length;
console.log(totalAddProduitRemove);
alert("Votre article est bien supprimé")
if(totalAddProduitRemove ==1) {//si il y a 1 produit
    return (localStorage.removeItem('cartItems'),
    
    console.log("remove tout le panier")
    )
}
else {
someProduct = addProduit.filter(el => {
    if(corbeille.dataset.id != el._id || corbeille.dataset.color !=el.colors){
        return true;
       
    }
    
   }
    )
    console.log(someProduct);
    localStorage.setItem('cartItems',JSON.stringify(someProduct));
    
    location.href = "cart.html";
    console.log(" corbeille remove le produit en question");
    
}
    });
});
return;
};

removeProduct();
































