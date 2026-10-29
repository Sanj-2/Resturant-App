import { menuArray } from './data.js'
const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
let cartArray = []

function getMenu(menuArray) {
    let Menu = ``;
    for (let i = 0; i < menuArray.length; i++) {
        const menuItem = menuArray[i];
        Menu += `
        <div class="menu-item">
            <div class="menu-item-img">${menuItem.emoji}</div>
            <div>
                <h4 class = "menu-item-heading">${menuItem.name}</h4>
                <p class = "menu-item-desc">${menuItem.ingredients.join(", ")}</p>
                <p class = "menu-item-price">$${menuItem.price}</p>
            </div>
            <button data-id = "${menuItem.id}" >
                +
            </button>
        </div>
        `
    }
    return Menu;
}

function renderMenu(menu) {
    menu.innerHTML = getMenu(menuArray)
}

renderMenu(menu)

document.addEventListener('click', function (e) {
    if (e.target.closest('#checkout-button')) {
        if (cartArray.length) {
            document.getElementById('card-details')
            .classList.toggle('display')
        };
    }
    else if (e.target.closest('#remove-button')) {
        const item = e.target.closest('.order-item');
        const name = item.dataset.id;

        cartArray = cartArray.filter(function (item) {
            return item.name !== name;
        });
        if(cartArray.length === 0){
            cart.innerHTML = ""
            return
        }
        getCart()
    }
    else if (e.target.dataset.id >= 0) {
        const el = menuArray[e.target.dataset.id]
        if (cartArray.some(item => item.name === el.name)) {
            return;
        }
        cartArray.push({
            name: el.name,
            price: el.price
        })
        getCart()

    } else {
        return
    }
})

function getCart() {
    let cartBody = `<h4>Your Order</h4>`
    let total = 0
    cartArray.forEach(function (e) {
        cartBody += `
        <div class="order-item" data-id = "${e.name}">
            <p>${e.name}</p>
            <button id="remove-button">remove</button>
            <p class="item-price">$${e.price}</p>
        </div>
        `
        total += e.price
    })
    cartBody += `
    <div class="order-item-total">
        <p>Total price:</p>
        <p class="item-price">$${total}</p>
    </div>
    <button class="checkout-button" id = "checkout-button">Complete Order</button>
    `
    cart.innerHTML = cartBody
}
const cardForm = document.getElementById('card-details');

cardForm.addEventListener('submit', function (e) {
    e.preventDefault();

    cart.innerHTML = `
        <div class="final-message">
            <p>Thanks, James! Your order is on its way!</p>
        </div>
    `;

    cardForm.classList.toggle('display');
    cartArray.length = 0;
});
