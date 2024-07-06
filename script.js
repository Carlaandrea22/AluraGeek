// Función para guardar productos en localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Función para obtener productos de localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Función para agregar producto a la lista y al localStorage
function addProduct(name, price, imageSrc) {
    const products = getProducts();
    products.push({ name, price, imageSrc });
    saveProducts(products);
    renderProducts();
}

// Función para eliminar un producto de la lista y localStorage
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderProducts();
}

// Función para renderizar productos
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const products = getProducts();
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.imageSrc}" alt="${product.name}">
            <p>${product.name}</p>
            <p>$ ${product.price}</p>
            <button class="delete-button" onclick="deleteProduct(${index})">🗑️</button>
        `;
        productList.appendChild(productCard);
    });
}

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const imageInput = document.getElementById('image');
    const image = imageInput.files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageSrc = e.target.result;
        addProduct(name, price, imageSrc);
    };
    reader.readAsDataURL(image);

    // Limpiar el formulario
    document.getElementById('product-form').reset();
    document.getElementById('image-preview').style.display = 'none';
});

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('product-form').reset();
    document.getElementById('image-preview').style.display = 'none';
});

document.getElementById('image').addEventListener('change', function() {
    const image = this.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('image-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(image);
});

// Renderizar productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});
