var productIndexInput = document.getElementById("productIndexInput");
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
// var searchInput = document.getElementById("searchInput");

var productContainer = [];

window.onload = function () {
    var storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
        productContainer = storedProducts;
        displayProduct();
    }
};

function addProduct() {
    var id = productIndexInput.value;
    var name = productNameInput.value;
    var price = productPriceInput.value;
    var category = productCategoryInput.value;
    var desc = productDescInput.value;

    if (id === '' || name === '' || price === '' || category === '' || desc === '') {
        alert('Please fill in all input fields');
        return;
    }

    var product = {
        id: id,
        name: name,
        price: price,
        category: category,
        desc: desc
    };

    productContainer.push(product);
    DeletProduct();
    displayProduct();
    saveToLocalStorage();

}


// function searchProduct() {
//     var searchTerm = searchInput.value.toLowerCase();

//     var filteredProducts = productContainer.filter(function (product) {
//         return (
//             product.id.includes(searchTerm) ||
//             product.name.toLowerCase().includes(searchTerm) ||
//             product.price.toString().includes(searchTerm) ||
//             product.category.toLowerCase().includes(searchTerm) ||
//             product.desc.toLowerCase().includes(searchTerm)
//         );
//     });

//     displayProduct(filteredProducts);
// }


function displayProduct(products) {
    var cartoona = '';
    var displayProducts = products || productContainer;

    for (var i = 0; i < displayProducts.length; i++) {
        cartoona += `
        <tr>
          <td>${i}</td>
          <td>${displayProducts[i].name}</td>
          <td>${displayProducts[i].price}</td>
          <td>${displayProducts[i].category}</td>
          <td>${displayProducts[i].desc}</td>
          <td><button class="btn btn-outline-warning btn-sm" onclick="updateProduct(${i})">Update</button></td>
          <td><button class="btn btn-outline-warning btn-sm" onclick="removeProduct(${i})">Remove</button></td>
        </tr>
        `;
    }

    document.getElementById('tBody').innerHTML = cartoona;
}

function removeProduct(index) {
    productContainer.splice(index, 1);
    displayProduct();
    saveToLocalStorage();

}

function updateProduct(index) {
    var product = productContainer[index];
    productIndexInput.value = product.id;
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productCategoryInput.value = product.category;
    productDescInput.value = product.desc;

    productContainer.splice(index, 1);

    displayProduct();
    saveToLocalStorage();

}


function DeletProduct() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function clearProduct() {
    productIndexInput.value = "";
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}
function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(productContainer));
}