// ------Récupération des donées du local storage------
let someProducts = [];
let sectionCarts = JSON.parse(localStorage.getItem('cartItems'));
const cartDisplay = async () => { //--j'ai construire mon fonction qui vas tout le code à l'intérieur*/
    //----------------Affichage des éléments dans le code HTML-----------------

    for (let product in sectionCarts) {
        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", sectionCarts[product]._id);
        productArticle.setAttribute("data-color", sectionCarts[product].colors);
        console.log(productArticle);

        // Insertion de l'élément "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = sectionCarts[product].imageUrl;
        productImg.alt = sectionCarts[product].altTxt;

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
        productTitle.innerHTML = sectionCarts[product].name;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = sectionCarts[product].colors;

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = sectionCarts[product].price + " €";


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
        productQuantity.value = sectionCarts[product].quantite;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", 1);
        productQuantity.setAttribute("max", 100);
        productQuantity.setAttribute("name", "itemQuantity");
        productQuantity.setAttribute("data-id", sectionCarts[product]._id);
        productQuantity.setAttribute("data-color", sectionCarts[product].colors);

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.setAttribute("data-id", sectionCarts[product]._id);
        productSupprimer.setAttribute("data-color", sectionCarts[product].colors);
        productSupprimer.addEventListener("click", () => {
            console.log("vous avez supprimé l'item");
        })
    }
}
cartDisplay();


function getTotals() {
    // Récupération du total des quantités  et du prix total
    let productTotalQuantity = document.getElementById('totalQuantity');
    let productTotalPrice = document.getElementById('totalPrice');
    if (sectionCarts && sectionCarts.length) {//-----Additionner toutes les valeurs de la tableau sectionCarts------//
        const totalQuantity = sectionCarts.reduce((acc, sectionCarts) => acc + Number(sectionCarts.quantite), 0)
        productTotalQuantity.textContent = totalQuantity;

        const totalPrice = sectionCarts.reduce((acc, sectionCarts) => acc + (sectionCarts.price * sectionCarts.quantite), 0)
        productTotalPrice.innerHTML = totalPrice;

        console.log('sectionCarts', sectionCarts)
        console.log('totalQuantity', totalQuantity)
        console.log('totalPrice', totalPrice)

    } else {
        productTotalQuantity.textContent = 0;
        productTotalPrice.innerHTML = 0;
    }
}
getTotals();

// Ajoute un plus de la quantité depuis la page panier
const updateQuantity = async (cartDisplay) => {
    await cartDisplay;
    console.log("fonction plus");
    let quantityField = document.querySelectorAll(".itemQuantity"); //**** je sélectionne les inputs de quantité*****

    for (let q = 0; q < quantityField.length; q++) { //**** pour chaque input de quantité on vérifie s'il y a un changement de valeur ***/
        quantityField[q].addEventListener("input", (event) => {
            event.preventDefault();
            if (event.target.value > 100) event.target.value = 100 //****Une conditin si le quantité plus de 100 alors le quantité =100 *****/
            if (event.target.value < 0) event.target.value = 0 //****Une conditin si le quantité moins de 0 alors le quantité = 0 *****/
            

            let quantityArticles = quantityField[q].value; //***Attibution de la valeur de l'input dans "quantityArticles" ***/
            sectionCarts[q].quantite = quantityArticles; //****Mise àjour de la quantité dans le sectionCarts[q].quantite  ***/

            localStorage.setItem("cartItems", JSON.stringify(sectionCarts));//******Réenregistrement du panier *****/

            console.log("quantite++");
            //Refresh rapide de la page
            location.reload();
        });
    }
}
updateQuantity();

//Gestion du boutton supprimer de l'article
const removeProduct = async (cartDisplay) => {
    await cartDisplay
    let corbeilles = document.querySelectorAll(".deleteItem")
    console.log(corbeilles);
    corbeilles.forEach((corbeille) => {
        corbeille.addEventListener("click", () => {
            let totalsectionCartsRemove = sectionCarts.length;//---- Le produit va être supprimé en cliquant sur le bouton
            console.log(totalsectionCartsRemove);
            alert("Votre article est bien supprimé")
            if (totalsectionCartsRemove == 1) { //si il y a 1 produit
                return (localStorage.removeItem('cartItems')),
                    //console.log("remove tout le panier");
                    window.location.href = "cart.html";
            } else {
                someProducts = sectionCarts.filter(el => {
                    if (corbeille.dataset.id != el._id || corbeille.dataset.color != el.colors) {
                        return true;
                    }
                })
                console.log(someProducts);
                localStorage.setItem('cartItems', JSON.stringify(someProducts));

                location.href = "cart.html";
                console.log(" corbeille remove le produit en question");
            }
        });
    });
    return;
};
removeProduct();

//**********Instauration formulaire avec regex**********
function getForm() {
    let form = document.querySelector(".cart__order__form");
    //Création des expressions régulières
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let emailRegExp = new RegExp("^[a-zA-Z0-9-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

    // Ecouter de la modification du prénom
    form.firstName.addEventListener('change', function() {
        valideFirstName(this);
    });
    // Ecouter de la modification du nom
    form.lastName.addEventListener('change', function() {
        valideLastName(this);
    });
    // Ecouter de la modification de l'adresse
    form.address.addEventListener('change', function() {
        valideAddress(this);
    });
    // Ecouter de la modification de la ville
    form.city.addEventListener('change', function() {
        valideCity(this);
    });
    // Ecouter de la modification de l'email
    form.email.addEventListener('change', function() {
        valideEmail(this);
    });


    // ********* Validation du prénom **********
    const valideFirstName = function(inputFirstName) {
        //Recuperation de la balise firstNameErrorMsg  
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        //Je test l'expression reguliere
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
            return true;
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };
    // ********* Validation du nom *********
    const valideLastName = function(inputLastName) {
        //Recuperation de la balise lastNameErrorMsg  
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        //Je test l'expression reguliere
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
            return true;
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };
    // ******** Validation de l'adresse ********
    const valideAddress = function(inputAddress) {
        //Recuperation de la balise addressErrorMsg
        let addressErrorMsg = inputAddress.nextElementSibling;
        //Je test l'expression reguliere
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
            return true;
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };
    // ********* Validation de la ville ********
    const valideCity = function(inputCity) {
        //Recuperation de la balise cityErrorMsg  
        let cityErrorMsg = inputCity.nextElementSibling;
        //Je test l'expression reguliere
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
            return true;
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
            return false;
        }
    };
    // ********** Validation de l'email **********
    const valideEmail = function(inputEmail) {
        //Recuperation de la balise emailErrorMsg   
        let emailErrorMsg = inputEmail.nextElementSibling;
        //Je test l'expression reguliere
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = 'adresse  valide';
            return true;
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
            return false;
        }
    };

    //************Au clic du bouton "commander", enregistre les informations du formulaire, tout en testant si les données sont correctes*********
    document.getElementById("order").addEventListener('click', (e) => {
        e.preventDefault()

        const contact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
        }

        //Construction d'un array d'id depuis le local storage
        let products = [];
        for (let i = 0; i < sectionCarts.length; i++) {
            products.push(sectionCarts[i]._id);
        }
        console.log(products);
        // je mets les valeurs du formulaire(contact) et les produits sélectionnés(products) dans un sendFormData
        const sendFormData = {
            contact,
            products,
        }
        // j'envoie le formulaire + localStorage (sendFormData) 
        // ... que j'envoie au serveur

        const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log(options);

        //***********Vérifie que toutes les données du formulaire sont correctes et si oui confirme la commande**********
        if (valideFirstName(form.firstName) && valideLastName(form.lastName) && valideAddress(form.address) && valideCity(form.city) && valideEmail(form.email)) {
            fetch("http://localhost:3000/api/products/order", options)
                .then(response => response.json())
                .then(data => {
                    alert("Merci pour votre commande");
                    localStorage.setItem('orderId', data.orderId);
                    document.location.href = 'confirmation.html?id=' + data.orderId;
                })
            return true;
            //********Sinon demande de vérifier le formulaire pour y corriger les fautes********
        } else {
            alert("Le formulaire n'est pas valide");
            return false,
                console.log();
        };
    })
}
getForm();