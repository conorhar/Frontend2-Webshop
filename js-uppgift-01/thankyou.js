const cartArray = JSON.parse(localStorage.getItem("cartArray"));
const userObj = JSON.parse(localStorage.getItem("user"));

renderOrderDetails();
localStorage.clear();

function renderOrderDetails(){
    if (cartArray != null){
        let cartOutput = "";
        let userOutput = "";
        let total = getTotal();    

        cartArray.forEach((cartItem) => {
            cartOutput += `<tr>
                            <td><img class="total-thumbnail" src="${cartItem.image}"></td>
                            <td>${cartItem.title} <strong class="mx-2">x</strong> ${cartItem.quantity}</td>
                            <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                        </tr>`
        });

        cartOutput += `<tr>
                        <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
                        <td class="text-black font-weight-bold"><strong>${total.toFixed(2)}</strong></td>
                    </tr>`
        
        userOutput +=  `<div>Name: ${userObj.firstName} ${userObj.lastName}</div>
                        <div>Address: ${userObj.address1} ${userObj.address2}, ${userObj.stateRegion} ${userObj.postalZip}, ${userObj.country}</div>
                        <div>Email: ${userObj.email}</div>
                        <div>Phone: ${userObj.phone}</div>`
        
        document.getElementById("cart-output").innerHTML = cartOutput;
        document.getElementById("user-output").innerHTML = userOutput;
    }
}

function getTotal(){
    let total = 0;

    cartArray.forEach((cartItem) => {
        total += (cartItem.price * cartItem.quantity);
    });

    total = Math.round(total * 100) / 100;
    return total;
}