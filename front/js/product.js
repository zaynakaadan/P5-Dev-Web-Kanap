//Récupère la barre d'adresse sur la fenêtre----
const productId = new URL(document.location).searchParams.get("id");
console.log(productId );
let product= [];
const fetchproduct = async () => {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((promiseData) => {

            product = promiseData
            console.log(product);
        });
};
//Afficher nos produits---
const displayProduct = async () => {
    await fetchproduct();

    //pour démarrer le code ici---
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // Inseration du titre 
    let productName = document.querySelector('#title');
    productName.innerHTML = product.name;

    // Inseration du prix
    let productPrice = document.querySelector('#price');
    productPrice.innerHTML = product.price;

    // Inseration de la description
    let productDescription = document.querySelector('#description');
    productDescription.innerHTML = product.description;

    // La variable productColors insere les options de couleurs dans le HTML (DOM)--
    product.colors.forEach((color) => { //j'ai fait une boucle dans cette tableau avec la méthode forEach--
            let productColors = document.createElement("option"); // j'ai fait un variable productcolors et dedans j'ai créé un élément option
            document.getElementById("colors").appendChild(productColors); //productcolors est l'enfant du colors
            console.log(productColors);
            productColors.value = `${color}`;
            productColors.innerHTML = `${color}`; //injecter un Html
        }
    )
    addBasket(product);
};
displayProduct();

const addBasket = () => { //Appeler le fonction
    //-------------Génération d'ID en hexadécimal pour que le filter ne supprime pas deux même items, même s'ils ont des couleurs différentes----
    let id = 0;
    function randomHexId(){
    id = Math.floor(Math.random()*(1677721500000)).toString(16);
    return id;
}

//-----------Fonction de récupération de la couleur, à partir de la couleur sélectionnée dans le Menu déroulant depuis le HTML--------

function productClr() {
    let select = document.getElementById("colors"); //-----------Récupération du Menu déroulant à partir de son ID------
    let option = select.options[select.selectedIndex] ; //--------Récupération de la couleur sélectionnée dans le Menu déroulant------
    return select.selectedIndex !== 0 ? option.text : null ; //------Fin de fonction en attribuant à colorprdt le texte, dans le cas présent on aurait pu récupérer la valeur aussi car elle est identique----
}

  //----------Fonction de récupération de la valeur à partir de la fonction "quantitynumber" depuis le HTML---------

function quantityNumber() {
    let qtyNumber = document.getElementById("quantity");
    return qtyNumber.value;
}
    let bouton = document.getElementById("addToCart"); //j'ai fait variable bouton qui contein l 'id du produit
    console.log(bouton);
    //----Au clic du bouton "Ajouter au panier",il exécute les fonctions appeler précédemment ainsi qu'une fonction de sécurité et enfin liste les détails de la commande dans un objet----

    //------Ecouter le bouton et envoyer le panier-------
    bouton.addEventListener("click", () => {
        let qtyNumber = parseInt(quantityNumber()); //------Convertie du texte en nombre entier------
        let colorprdt = productClr();
        let idDeletion = randomHexId();//------Exécute la fonction qui génère un ID en hexadecimal----
        let cartItem = {
        color: colorprdt,
        productIdSelection:productId,
        quantityProduct: qtyNumber,
        idDeletion : idDeletion, //----Attribution de l'ID de suppression----
    }
console.log(cartItem);
//---------Détection de doublon dans la panier à partir de la couleur et de l'ID et les cumule s'il en trouve------ 
if(qtyNumber < 0){
    alert("Veuillez ne pas mettre une quantité négative")
}
    else{
    if(colorprdt && qtyNumber){
        const localStorage = window.localStorage 
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
        if(cartItems.some(item=>item.productIdSelection === cartItem.productIdSelection) && cartItems.some(item=>item.color === cartItem.color)){ //------on verifie l'existence du cartitem qu'on va ajouter dans le localstorage si oui on incremente sont prix , son total et sa quantité sinon on l'ajoute au localstorage normalement
        const itemToAdd = cartItems.find(item=>item.productIdSelection===cartItem.productIdSelection)
        itemToAdd.quantityProduct+=cartItem.quantityProduct
        cartItems.splice(cartItems.map(item=>item.productIdSelection).indexOf(cartItem.productIdSelection),1,itemToAdd)
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
        }
        else{
        localStorage.setItem("cartItems",JSON.stringify(cartItems.concat(cartItem)))
        }
    alert("Produit(s) ajouté(s) au panier");
    }
    else{
    alert("Veuillez ajouter une couleur et une quantitée")
    }
}
});
};