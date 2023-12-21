let container = document.querySelector(".item-container");
let totalPrice = document.querySelector(".Total-Price");
let grandTotal = 0;

// Define item object with quantity
let itemsArray = [
  { id: 1, item: "bread", quantity: 1, price: 70 },
  { id: 2, item: "apple", quantity: 1, price: 35 },
  { id: 3, item: "milk", quantity: 1, price: 65 },
  { id: 4, item: "sugar", quantity: 1, price: 420 },
];

// Create a div element for each item
itemsArray.forEach((item) => {
  let subItem = document.createElement("div");
  subItem.className = "items";
  subItem.innerHTML = `
        <p>${
          item.item
        } <button class="reduceQuantity" onclick="reduceQuantity(${item.id})">
        <img src="./images/minus.svg"></button>
<span id="quantityDisplay-${item.id}">${item.quantity}</span>

        <button class="addQuantity" onclick="addQuantity(${
          item.id
        })"><img src="./images/add.svg"></button>

        <span class="itemPrice" ${item.id}>Ksh${item.price}</span>
        <span id="totalPrice-${item.id}">Total Price:Ksh${
    item.quantity * item.price
  } </span>
        <button class="like-btn"><img src="./images/favorite-like.svg" class="like-img"></button> 
        <button class="del-button"><img src="./images/delete.svg" class="delete-btn"></button> 
       
        </p>`;
  container.appendChild(subItem);
});

let quantity = 0; // Initial quantity

// function for increasing quantity by 1
function addQuantity(itemId) {
  // Find the item in the array based on the ID
  let selectedItem = itemsArray.find((item) => item.id === itemId);

  // Update the quantity of the selected item
  selectedItem.quantity++;

  // Update the HTML to display the new quantity
  document.querySelector(`#quantityDisplay-${itemId}`).innerHTML =
    selectedItem.quantity;
  updatePrice(itemId);
  calculateAddGrandTotal(itemId);
}

// Function for reducing the quantity by 1 when quantity is greater than 1
function reduceQuantity(itemId) {
  // Find the item in the array based on the ID
  let selectedItem = itemsArray.find((item) => item.id === itemId);

  if (selectedItem.quantity > 1) {
    // Update the quantity of the selected item
    selectedItem.quantity = selectedItem.quantity - 1;
  }
  //Update the HTML to display the new quantity
  document.querySelector(`#quantityDisplay-${itemId}`).innerHTML =
    selectedItem.quantity;
  updatePrice(itemId);
  reduceGrandTotal(itemId);
}

// Function for updating the total price for each item
function updatePrice(itemId) {
  // Find the item in the array based on the itemId
  let selectedItem = itemsArray.find((item) => item.id === itemId);
  if (selectedItem) {
    // If the item is found, calculate the total price
    let totalPrices = selectedItem.quantity * selectedItem.price;

    // Update the total price in the HTML if the element exists
    let totalPriceElement = document.querySelector(`#totalPrice-${itemId}`);
    if (totalPriceElement) {
      totalPriceElement.innerHTML = totalPrices.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  } else {
    console.error(`Item with ID ${itemId} not found in the array.`);
  }
}

// Increase the Grand Total Price when the add button is clicked
function calculateAddGrandTotal() {
  let grandTotal = 0;

  // Get all the spans inside the container that have IDs starting with "totalPrice-"
  let totalSpans = document.querySelectorAll('[id^="totalPrice-"]');
  let grandValueElement = document.querySelector("#grand-totals");

  // Iterate through each span and add up the parsed values
  totalSpans.forEach((span) => {
    let value = parseFloat(span.innerHTML);
    if (!isNaN(value)) {
      grandTotal = grandTotal + value;
    }
  });

  // Format the grandValue with two decimal points and separators
  let formattedGrandValue = grandTotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Update the HTML element with the new formatted grandValue
  grandValueElement.innerHTML = formattedGrandValue;
  console.log(`New Grand Total: ${formattedGrandValue}`);
}

// Reduces the Grand Total value when the reduce buttin is clicked
function reduceGrandTotal() {
  // Get all the spans inside the container that have IDs starting with "totalPrice-"
  let totalSpans = document.querySelectorAll('[id^="totalPrice-"]');
  let grandValueElement = document.querySelector("#grand-totals");
  let grandValue = parseFloat(grandValueElement.innerHTML);

  // Iterate through each span and subtract the parsed values
  totalSpans.forEach((span) => {
    let value = parseFloat(span.innerHTML);
    if (!isNaN(value)) {
      grandValue = value;
    }
  });

  // Format the grandValue with two decimal points and separators
  let formattedGrandValue = grandValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Update the HTML element with the new grandValue
  grandValueElement.innerHTML = formattedGrandValue;
}

// Event listener for like button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-img")) {
    if (e.target.src.includes("favorite")) {
      e.target.src = e.target.src.replace("favorite-like", "fill-like");
    } else {
      e.target.src = e.target.src.replace("fill-like", "favorite-like");
    }
  }
});

// Event Listener for removing items in the shopping cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Do you want to delete the item?")) {
      // Get the parent div element and remove it
      const items = e.target.closest("div");
      if (items) {
        items.remove();
      }
    }
  }
});

function moveGrandTotalToBottom() {
  // Get the container element
  let container = document.querySelector(".item-container");

  // Get the grand total element
  let grandTotal = document.querySelector("#grand-totals");

  // Remove the grand total element from its current position
  grandTotal.parentNode.removeChild(grandTotal);

  // Append the grand total element to the end of the container
  container.appendChild(grandTotal);
}

// Cmove the grand total element to the bottom
moveGrandTotalToBottom();
