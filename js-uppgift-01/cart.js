renderCart();
renderTotal();
renderCartQuantity();

document.getElementById("btn-checkout").addEventListener("click", checkCart);
document.getElementById("btn-empty-cart").addEventListener("click", emptyCartClicked);

//User is not allowed to proceed if cart is empty
function checkCart(event){
    let cartArray = JSON.parse(localStorage.getItem("cartArray"));
    
    if (window.localStorage.length == 0 || cartArray.length == 0){
        alert("Cart is empty.")
    }
    else{
        window.location.href = "checkout.html";
    }
}

//Renders amount of products in cart to be shown at top of page
function renderCartQuantity(){
    let totalQuantity = getTotalQuantity();
    let output = "";

    if (totalQuantity != 0){
        output = `<span class="icon-shopping-bag"></span>
                        <span class="number">${totalQuantity}</span>`;
    }
    else {
        output = `<span class="icon-shopping-bag"></span>`;
    }

    document.getElementById("cart-quantity").innerHTML = output;
}

//Retrieves cartArray and iterates over it to get total cart quantity
function getTotalQuantity(){
    let updatedCartArray = JSON.parse(localStorage.getItem("cartArray"));
    let quantity = 0;
    
    if (updatedCartArray != null){
        updatedCartArray.forEach(item => {
            quantity += parseInt(item.quantity);
        });
    }
    
    return quantity;
}

//Renders total to be shown at bottom of page
function renderTotal(){
    let updatedCartArray = JSON.parse(localStorage.getItem("cartArray"));
    let total = 0;

    if (updatedCartArray != null){    
        updatedCartArray.forEach((cartItem) => {
            total += (cartItem.price * cartItem.quantity);
        });   
    }

    document.getElementById("order-total").innerText = total.toFixed(2);
}

//Renders cart and updates if changes are made
function renderCart(){
    let updatedCartArray = JSON.parse(localStorage.getItem("cartArray"));
    let output = "";
    
    if (updatedCartArray != null){

        updatedCartArray.forEach((cartItem) => {
            output += `<tr>
                            <input class="item-id" type="hidden" value="${cartItem.id}">
                            <td>
                            <img class="cart-thumbnail" src="${cartItem.image}">
                            </td>
                            <td class="product-name">
                            <h2 class="h5 text-black">${cartItem.title}</h2>
                            </td>
                            <td>${parseFloat(cartItem.price).toFixed(2)}</td>
                            <td>
                            <div class="input-group mb-3">
                                <input style="width: 20px;" id="change-quantity" type="number" min="0" class="quantity-input form-control text-center" value="${cartItem.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                            </div>
    
                            </td>
                            <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                            <td><a href="#" id="btn-remove" class="btn btn-primary height-auto btn-sm">X</a></td>
                        </tr>`
        });
        
        document.getElementById("output").addEventListener("change", quantityChanged);
        document.getElementById("output").addEventListener("click", removeClicked);
    }

    document.getElementById("output").innerHTML = output;
}

//Removes clicked product from cart and renders page according to changes
function removeClicked(event){
    if (event.target && event.target.id == "btn-remove"){

        let button = event.target;
        let cartRow = button.parentElement.parentElement;
        let id = cartRow.getElementsByClassName("item-id")[0].value;
        
        removeFromLocalStorage(id);

        renderCart();
        renderTotal();
        renderCartQuantity();
    }
}

//Removes product with matching id from localStorage array
function removeFromLocalStorage(id){
    let cartArray = [];

    JSON.parse(localStorage.getItem("cartArray")).map(x =>{
        if (x.id != id)
            cartArray.push(x);
    });

    localStorage.setItem("cartArray", JSON.stringify(cartArray));
}

//Updates localStorage array if product quantity is changed and renders page according to changes
function quantityChanged(event){
    if (event.target && event.target.id == "change-quantity"){
        let input = event.target;
        let cartRow = input.parentElement.parentElement.parentElement;
        let newQuantity = input.value;
        let id = cartRow.getElementsByClassName("item-id")[0].value;

        updateLocalStorage(id, newQuantity);

        renderCart();
        renderTotal();
        renderCartQuantity();
    }
}

//Updates localStorage array if quantity is changed
function updateLocalStorage(id, newQuantity){
    let cartArray = [];
    let updatedCartArray = [];

    JSON.parse(localStorage.getItem("cartArray")).forEach(item => {
        cartArray.push(item);
    });

    cartArray.forEach(item => {
        if (item.id == id)
            item.quantity = newQuantity;

        if (item.quantity != "0")
            updatedCartArray.push(item);
    });

    if (updatedCartArray.length == 0){
        localStorage.clear();
    }
    else {
        localStorage.setItem("cartArray", JSON.stringify(updatedCartArray));
    }
}

//Clears localStorage if empty cart is clicked, renders page again according to changes
function emptyCartClicked(event){
    localStorage.clear();

    renderCart();
    renderTotal();
    renderCartQuantity();
}
