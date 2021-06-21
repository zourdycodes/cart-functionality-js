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
      });
    });
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  cartButton() {
    cartBtn.addEventListener("click", this.showCart);
  }

  // cartShowBtn() {
  //   cartBtn.addEventListener("click", this.showCart());
  // }

  setAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populate(cart);

    this.cartButton();
    closeCardBtn.addEventListener("click", this.closeOverlay);
  }

  populate(cart) {
    cart.forEach((item) => this.addCartItems(item));
  }

  /**
   * @param  {} cart
   * @param  {} {lettempTotal=0;letitemsTotal=0;cart.map((item
   * @param  {} {tempTotal+=item.price*item.amount;itemsTotal+=item.amount;}
   * @param  {} ;cartTotal.innerText=+tempTotal.toFixed(2
   */
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
      <span class="remove-item" data-id='${item.id}'>remove</span>
    </div>
    <div>
      <i class="fas fa-chevron-up" data-id='${item.id}'></i>
      <p class="item-amount">${item.amount}</p>
      <i class="fas fa-chevron-down" data-id='${item.id}'></i>
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

  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  cartLogic() {
    //warn: clear cart
    clearCardBtn.addEventListener("click", () => {
      this.clearCart();
    });

    //warn: cart functionality
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }

      if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        //* finding the amount and increase it
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount++;
        Storage.saveProduct(cart);
        this.setCartValues(cart);

        // set
        addAmount.nextElementSibling.innerText = tempItem.amount;
      }

      if (event.target.classList.contains("fa-chevron-down")) {
        let decreaseAmount = event.target;
        let id = decreaseAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount--;
        Storage.saveProduct(cart);
        this.setCartValues(cart);

        decreaseAmount.previousElementSibling.innerText = tempItem.amount;

        if (tempItem.amount === 0) {
          cartContent.removeChild(decreaseAmount.parentElement.parentElement);
          this.removeItem(id);
          this.hideCart();
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    console.log(cartContent.children);
    this.hideCart();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveProduct(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class='fas fa-shopping-cart'></i> add to cart`;
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
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

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const ui = new UI();
  const products = new Products();

  //* SETUP APP
  ui.setAPP();

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
      ui.cartLogic();
    });
});
