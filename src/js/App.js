"use-strict";

//* GLOBAL DOM SELECTOR
const cartBtn = document.querySelector(".cart-btn");
const closeCardBtn = document.querySelector(".close-cart");
const clearCardBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
let cart = [];
let buttonsDOM = [];

//warn ==> getting the products
class Products {
  async getProducts() {
    try {
      const res = await fetch("../../products.json");
      const data = await res.json();

      if (!res.ok)
        throw new Error(
          "Fetching Process Failed 404 ==> your connection is down"
        );

      let items = data.items;

      items = items.map((item) => {
        //warn => destructuring
        const {
          fields: {
            image: {
              fields: {
                file: { url },
              },
            },
            price,
            title,
          },
          sys: { id },
        } = item;

        return { url, price, title, id };
      });

      return items;
    } catch (error) {
      console.error(`wait up bruh!, ${error.message}`);
    }
  }
}

//warn ==> display the products
class UI {
  displayProducts(products) {
    let result = "";

    products.forEach((product) => {
      result += `
  <article class="product">
      <div class="img-container">
        <img
          src='${product.url}'
          alt="product"
          class="product-img"
        />
        <button class="bag-btn" data-id='${product.id}'>
          <i class="fas fa-shopping-cart"></i>
          add to bag
        </button>
      </div>
    <h3>${product.title}</h3>
    <h4>$${product.price}</h4>
  </article>
      `;
    });

    productsDOM.innerHTML = result;

    console.log(products);
  }

  getBagButtons() {
    //warn ==> get rid of NodeList turn into Array
    const buttons = [...document.querySelectorAll(".bag-btn")];

    //* fix collide instantiate to the Object
    let globalThis = this;

    buttonsDOM = buttons;

    buttons.forEach((button) => {
      let id = button.dataset.id;
      console.log(id);

      // checking the button already store in cart
      const inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }

      button.addEventListener("click", function (event) {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        //TODO:

        //* Get Product from Products
        let cartItemContent = { ...Storage.getProduct(id), amount: 1 };

        //* add product to the cart
        cart = [...cart, cartItemContent];

        //* save cart in local storage
        Storage.saveProduct(cart);
        //* set cart values
        globalThis.setCartValues(cart);
        //* Display cart item
        globalThis.addCartItems(cartItemContent);
        //* show the cart
        globalThis.showCart();

        //* close btn
        globalThis.closeOverlay();
      });
    });
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount; // increase the price values
      itemsTotal += item.amount;
    });

    cartTotal.innerText = +tempTotal.toFixed(2);
    cartItems.innerText = itemsTotal;
  }

  addCartItems(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
    <img src="${item.url}" />
    <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
      <span class="remove-item" data=id='${item.id}'>remove</span>
    </div>
    <div>
      <i class="fas fa-chevron-up" data=id='${item.id}'></i>
      <p class="item-amount">${item.amount}</p>
      <i class="fas fa-chevron-down" data=id='${item.id}'></i>
    </div>
    `;

    cartContent.appendChild(div);
    console.log(cartContent);
  }

  closeOverlay() {
    closeCardBtn.addEventListener("click", function () {
      cartOverlay.classList.remove("transparentBcg");
      cartDOM.classList.remove("showCart");
    });
  }
}

//warn ==> storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));

    return products.find((product) => product.id === id);
  }

  static saveProduct(cart) {
    return localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const ui = new UI();
  const products = new Products();

  //* display product
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      //* save ==> localStorage

      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
