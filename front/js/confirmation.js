// Récupère l'ID du produit et l'injecte dans le DOM
const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// Suppression des produits du localStorage et du panier lorsque la commande est passée
localStorage.removeItem("product");