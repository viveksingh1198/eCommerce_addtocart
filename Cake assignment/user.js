const allData = [];

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const data = localStorage.getItem(key);
    const parsedData = JSON.parse(data);

//     This line assigns a unique identifier (id) to each element (item) in the array.
//      The unique identifier is created by concatenating the key with the index of the current element, separated by an underscore _.

// key is assumed to be a unique identifier from localStorage.
// index is the index of the current element in the array.
    parsedData.forEach((item, index) => {
        item.id = key + '_' + index;
    });

    // parse covert json format to  js object
    allData.push(...parsedData);
    console.log(parsedData)
}

const searchInput = document.querySelector('#srch');


searchInput.addEventListener('input', () => {

    const searchTerm = searchInput.value.trim().toLowerCase();

    const matchingCake = allData.find(cake => cake.ItemName.toLowerCase() === searchTerm);

    if (matchingCake) {
        displayMatchingCakes([matchingCake]);
    } else {
        displayMatchingCakes([]);
       
    }
});

const cakeButtons = document.querySelectorAll('.btn');
cakeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cakeName = button.getAttribute('data-cname');
        let matchingCakes;

        if (cakeName === 'ALL') {
    
            matchingCakes = allData;
        } else {
            matchingCakes = allData.filter(cake => cake.Cname === cakeName);
        }

        displayMatchingCakes(matchingCakes);
    });
});

function displayMatchingCakes(matchingCakes) {
    const imgContainer = document.querySelector('.imgContainer');
    imgContainer.innerHTML = '';

   
    matchingCakes.forEach(cake => {
        const cakeElement = document.createElement('div');
        cakeElement.classList.add('don');
        cakeElement.innerHTML = `
            <img src="${cake.image}" alt="${cake.ItemName}">
            <div class="donut-price">
                <p>${cake.ItemName}</p>
                <p>$${cake.Price}</p>
                <button class="add_to_cart" data-item-id="${cake.id}">Add-to-Cart</button>

            </div>
        `;
        imgContainer.appendChild(cakeElement);
    });
}
// Array to store items in the cart
let cartItems = [];

// Function to add an item to the cart
function addToCart(item) {
    cartItems.push(item);
    updateCart();
}

// Function to update the cart icon's display
function updateCart() {
    const cartIcon = document.querySelector('.cart_icon');
    cartIcon.textContent = cartItems.length;
}
// Event listener for adding items to cart when the "Add to Cart" button is clicked
const imgContainer = document.querySelector('.imgContainer');
imgContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add_to_cart')) {
        const itemId = event.target.getAttribute('data-item-id');
        const selectedItem = allData.find(item => item.id === itemId);
        if (selectedItem) {
            addToCart(selectedItem);
            updateCart();
        }
    }
});
// Function to display cart details
function displayCartDetails() {
    const cartContainer = document.querySelector('.cart_container');
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart_item');
        cartItemElement.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.ItemName}" width="50">
                <span>${item.ItemName} - $${item.Price}</span>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
        totalPrice += parseFloat(item.Price);
    });
    const totalPriceElement = document.createElement('div');
    totalPriceElement.textContent = `Total Price: $${parseFloat(totalPrice).toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
}
// Event listener for displaying cart details when the cart icon is clicked
const cartIcon = document.querySelector('.cart_icon');
cartIcon.addEventListener('click', () => {
    // Toggle the display of the cart container
    const cartContainer = document.querySelector('.cart_container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    // If the container is displayed, show cart details
    if (cartContainer.style.display === 'block') {
        displayCartDetails();
    }
});


