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
class Products {}

//warn ==> display the products
class UI {}

//warn ==> storage
class Storage {}

document.addEventListener("DOMContentLoaded", (e) => {
  const ui = new UI();
  const products = new Products();

  console.log(e.target);
});
