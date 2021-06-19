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
}

//warn ==> storage
class Storage {}

document.addEventListener("DOMContentLoaded", (e) => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then((products) => ui.displayProducts(products));
});
