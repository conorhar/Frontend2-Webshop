const cartArray = JSON.parse(localStorage.getItem("cartArray"));

renderCart();
renderTotal();
renderCartQuantity();

document.getElementById("btn-checkout").addEventListener("click", checkCart)

function checkCart(event){
    if (window.localStorage.length == 0 || cartArray.length == 0){
        alert("Cart is empty.")
    }
    else{
        window.location.href = "checkout.html";
    }
}


function renderCartQuantity(){
    if (cartArray != null){
        output = `<span class="number">${getTotalQuantity()}</span>`

        document.getElementById("cart-quantity").innerHTML += output;
    }
}

function getTotalQuantity(){
    let quantity = 0;
    
    cartArray.forEach(item => {
        quantity += parseInt(item.quantity);
    });
    return quantity;
}

function renderTotal(){
    if (cartArray != null){
        let total = 0;
    
    cartArray.forEach((cartItem) => {
        total += (cartItem.price * cartItem.quantity);
    });

    document.getElementById("order-total").innerText = total.toFixed(2);
    }
}

function renderCart(){
    if (cartArray != null){
        let output = "";

        cartArray.forEach((cartItem) => {
            output += `<tr>
                            <input class="item-id" type="hidden" value="${cartItem.id}">
                            <td>
                            <img class="cart-thumbnail" src="${cartItem.image}">
                            </td>
                            <td class="product-name">
                            <h2 class="h5 text-black">${cartItem.title}</h2>
                            </td>
                            <td>${parseInt(cartItem.price).toFixed(2)}</td>
                            <td>
                            <div class="input-group mb-3" style="min-width: 50px;">
                                <div class="input-group-prepend">
                                <button id="change-quantity" class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                                </div>
                                <input type="text" class="quantity-input form-control text-center" value="${cartItem.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" readonly>
                                <div class="input-group-append">
                                <button id="change-quantity" class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                                </div>
                            </div>
    
                            </td>
                            <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                            <td><a href="#" id="btn-remove" class="btn btn-primary height-auto btn-sm">X</a></td>
                        </tr>`
        });

        document.getElementById("output").innerHTML = output;

        document.getElementById("output").addEventListener("click", quantityChanged)
        document.getElementById("output").addEventListener("click", removeClicked);
        document.getElementById("btn-empty-cart").addEventListener("click", emptyCartClicked);
    }
}

function removeClicked(event){
    if (event.target && event.target.id == "btn-remove"){

        let button = event.target;
        let cartRow = button.parentElement.parentElement;
        let id = cartRow.getElementsByClassName("item-id")[0].value;
        
        removeFromLocalStorage(id);
    }
}

function removeFromLocalStorage(id){
    let cartArray = [];

    JSON.parse(localStorage.getItem("cartArray")).map(x =>{
        if (x.id != id)
            cartArray.push(x);
    });

    localStorage.setItem("cartArray", JSON.stringify(cartArray));
    window.location.reload();
}

function quantityChanged(event){
    if (event.target && event.target.id == "change-quantity"){
        let button = event.target;
        let tableElement = button.parentElement.parentElement;
        let cartRow = button.parentElement.parentElement.parentElement.parentElement;
        let newQuantity = tableElement.getElementsByClassName("quantity-input")[0].value;
        let id = cartRow.getElementsByClassName("item-id")[0].value;

        updateLocalStorage(id, newQuantity);

        window.location.reload();
    }
}

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

    localStorage.setItem("cartArray", JSON.stringify(updatedCartArray));
}

function emptyCartClicked(event){
    localStorage.clear();

    window.location.reload();
}
