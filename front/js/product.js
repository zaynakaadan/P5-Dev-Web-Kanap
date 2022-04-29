//récupère la barre d'adresse sur la fenêtre----
const produit = window.location.search.split("id=").join("");
const produit2 = produit.replace("?", "");
console.log(produit);
console.log(produit2);

let produit2Data= [];


const fetchproduit = async() => {
   await fetch(`http://localhost:3000/api/products/${produit2}`)
   .then((res) => res.json())
   .then((promiseData) => {

    produit2Data=promiseData
     console.log(produit2Data);

   });
   
};

//afficher nos produits---
const produit2Display = async () => {
 await fetchproduit();

//pour démarrer le code ici---
// Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src =produit2Data.imageUrl;
  productImg.alt = produit2Data.altTxt;


// Inseration du titre 
   let productName = document.querySelector('#title');
   productName.innerHTML = produit2Data.name;

// Inseration du prix
    let productPrice = document.querySelector('#price');
    productPrice.innerHTML = produit2Data.price;


// Inseration de la description
    let productDescription = document.querySelector('#description');
    productDescription.innerHTML = produit2Data.description;  


// La variable productColors insere les options de couleurs dans le HTML (DOM)--
   produit2Data.colors.forEach((color) => {  //j'ai fait une boucle dans cette tableau avec la méthode forEach--
   let productColors = document.createElement("option"); // j'ai fait un variable productcolors et dedans j'ai créé un élément option
    document.getElementById("colors").appendChild(productColors);//productcolors est l'enfant du colors
    console.log(productColors);
    productColors.value = `${color}`;
    productColors.innerHTML = `${color}`; //injecter un Html
    }

    )
    addBasket(produit2Data);
};
produit2Display();

const addBasket = () => {//appeler le fonction
let bouton = document.getElementById("addToCart"); //j'ai fait variable bouton qui contein l 'id du produit
console.log(bouton);
bouton.addEventListener("click" , () => {
//ajouter l'élément dans le LocalStorage
 let productInLocalStorage = JSON.parse(localStorage.getItem('cartItems'));//j'ai vérifié s'il y a quelque chose dans le local storage
let productColors = document.getElementById("colors"); //j'ai récupéré les colors
let productQuantity = document.getElementById("quantity"); //j'ai récupéré les quantity

console.log(productColors.value);
console.log(productQuantity.value);

const fusionProduit = Object.assign({} , produit2Data ,{//ajouter le valeur avec un methode assign qui permet d'assigner quelque chose à un objet (qui existe déja) et de rajouter des valeurs des éléments dans cet objet dans ce tableau d'objets
colors: `${productColors.value}`, //créé un nouvel objet pour ajouter ce qu'on veut comme valeur la color et quantite 
quantite:Number(`${productQuantity.value}`),
} );
console.log(fusionProduit);
if(productInLocalStorage== null){ //j'ai fait un condition si le productinlocalstorage est null le productinlocalstorage ça sera un tableau vide
 // si le panier est vide on crée l'élément avec son id et sa couleur et sa quantité
  productInLocalStorage = [];
  
  productInLocalStorage.push(fusionProduit);
   
  console.log(productInLocalStorage);// on vas le trouver dans un tableau
  alert ("L'article a bien été ajouté à votre panier")
  localStorage.setItem('cartItems',JSON.stringify(productInLocalStorage));//pour faire un cartitems dans local storage et avec methode stringify il vas transormer le produitinlocalstorage en string pour le stocker dans mon local storage
  productInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
  

} else if (productInLocalStorage != null) {
 
  for (i = 0; i < productInLocalStorage.length; i++) {
    console.log("test");
    
    if (
      productInLocalStorage[i]._id == produit2Data._id && //la meme id 
      productInLocalStorage[i].colors == produit2Data.value
    ) {
      return (
        productInLocalStorage[i].quantite++,
        console.log("quantite++"),
        localStorage.setItem("produit", JSON.stringify(productInLocalStorage)),
        alert ("L'article a bien été ajouté à votre panier"),
        productInLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
        
      );
    }
    
  }

for(i=0; i < productInLocalStorage.length; i++){
  if (
    productInLocalStorage[i]._id == produit2Data._id &&
    productInLocalStorage[i].colors != produit2Data.value ||
    productInLocalStorage[i]._id != produit2Data._id//nouveu id
  ){
    return (
      console.log("new"),
      productInLocalStorage.push(fusionProduit),//pousser un nouvel objet qui jel'ai crée 
      localStorage.setItem('cartItems',JSON.stringify(productInLocalStorage)),
    alert ("L'article a bien été ajouté à votre panier"),
      
      productInLocalStorage= JSON.parse(localStorage.getItem("cartItems"))
      
      )
    }
  }
}
 

});





return (productInLocalStorage= JSON.parse(localStorage.getItem("cartItems"))


  );
};

