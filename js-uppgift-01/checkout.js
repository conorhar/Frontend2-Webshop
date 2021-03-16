const cartArray = JSON.parse(localStorage.getItem("cartArray"));

const form = document.getElementById("form");

const errorElementFirstName = document.getElementById("error-element-first-name");
const errorElementLastName = document.getElementById("error-element-last-name");
const errorElementAddress1 = document.getElementById("error-element-address-1");
const errorElementAddress2 = document.getElementById("error-element-address-2");
const errorElementCountry = document.getElementById("error-element-country");
const errorElementStateRegion = document.getElementById("error-element-state-region");
const errorElementPostalZip = document.getElementById("error-element-postal-zip");
const errorElementEmail = document.getElementById("error-element-email");
const errorElementPhone = document.getElementById("error-element-phone");

renderOrderDetails();
renderCartQuantity();

//Validates form, cannot be submitted unless unless all bools have been set to true
//If form is valid a user object is created and added to localStorage
form.addEventListener("submit", (e) => {
    const firstName = document.getElementById("c_fname").value.trim();
    const lastName = document.getElementById("c_lname").value.trim();
    const address1 = document.getElementById("c_address").value.trim();
    const address2 = document.getElementById("c_address_2").value.trim();
    const stateRegion = document.getElementById("c_state_country").value;
    const postalZip = document.getElementById("c_postal_zip").value.trim();
    const email = document.getElementById("c_email_address").value;
    const phone = document.getElementById("c_phone").value.trim();
    let firstNameValid = true;
    let lastNameValid = true;
    let address1Valid = true;
    let address2Valid = true;
    let stateRegionValid = true;
    let postalZipValid = true;
    let emailValid = true;
    let phoneValid = true;
    let countryValid = true;

    if(checkIfEmpty(firstName) == true){
        e.preventDefault();
        errorElementFirstName.innerText = "Must enter first name";
        firstNameValid = false;
    }
    else {
        errorElementFirstName.innerText = "";
        firstNameValid = true;
    }

    if(checkIfEmpty(lastName) == true){
        e.preventDefault();
        errorElementLastName.innerText = "Must enter last name";
        lastNameValid = false;
    }
    else {
        errorElementLastName.innerText = "";
        lastNameValid = true;
    }

    if(checkIfEmpty(address1) == true){
        e.preventDefault();
        errorElementAddress1.innerText = "Must enter address";
        address1Valid = false;
    }
    else {
        errorElementAddress1.innerText = "";
        address1Valid = true;
    }

    if(checkIfEmpty(address2) == true){
        e.preventDefault();
        errorElementAddress2.innerText = "Must enter address";
        address2Valid = false;
    }
    else {
        errorElementAddress2.innerText = "";
        address2Valid = true;
    }

    let dropDown = document.getElementById("c_country");

    if (dropDown.options[dropDown.selectedIndex].value == 1){
        e.preventDefault();
        errorElementCountry.innerText = "Must choose a country"
        countryValid = false;
    }
    else {
        errorElementCountry.innerText = "";
        countryValid = true;
    }

    if(checkIfEmpty(stateRegion) == true){
        e.preventDefault();
        errorElementStateRegion.innerText = "Must enter state / region";
        stateRegionValid = false;
    }
    else {
        errorElementStateRegion.innerText = "";
        stateRegionValid = true;
    }

    if(checkIfEmpty(postalZip) == true){
        e.preventDefault();
        errorElementPostalZip.innerText = "Must enter postal / zip";
        postalZipValid = false;
    }
    else {
        errorElementPostalZip.innerText = "";
        postalZipValid = true;
    }
    
    if (!validateEmail(email)) {
        e.preventDefault();
        errorElementEmail.innerText = "Invalid email address";
        emailValid = false;
    }
    else {
        errorElementEmail.innerText = "";
        emailValid = true;
    }

    if(checkIfEmpty(phone) == true){
        e.preventDefault();
        errorElementPhone.innerText = "Must enter phone";
        phoneValid = false;
    }
    else {
        errorElementPhone.innerText = "";
        phoneValid = true;
    }
    
    if (firstNameValid == true && lastNameValid == true && address1Valid == true && address2Valid == true && countryValid == true && stateRegionValid == true && postalZipValid == true && emailValid == true && phoneValid == true){

        let userObj = {
            firstName: firstName,
            lastName: lastName,
            address1: address1,
            address2: address2,
            country: dropDown.options[dropDown.selectedIndex].text,
            stateRegion: stateRegion,
            postalZip: postalZip,
            email: email,
            phone: phone
        }

        localStorage.setItem("user", JSON.stringify(userObj));
    }
})

//Checks if email address is valid
function validateEmail(email) {
    const re = /^[^@]+@\w+(\.\w+)+\w$/;
    return re.test(email);
}

//Checks if input is empty
function checkIfEmpty(value){
    if (typeof value === 'undefined' || value == null || value == "") return true;
}

//Renders amount of products in cart to be shown at top of page
function renderCartQuantity(){
    output = `<span class="number">${getTotalQuantity()}</span>`

    document.getElementById("cart-quantity").innerHTML += output;
}

//Retrieves cartArray and iterates over it to get total cart quantity
function getTotalQuantity(){
    let quantity = 0;
    
    cartArray.forEach(item => {
        quantity += parseInt(item.quantity);
    });
    return quantity;
}

//Retrieves product array from localStorage and renders order details at top of page
function renderOrderDetails(){
    if (cartArray != null){
        let output = "";
        let total = getTotal();

        cartArray.forEach((cartItem) => {
            output += `<tr>
                            <td><img class="total-thumbnail" src="${cartItem.image}"></td>
                            <td>${cartItem.title} <strong class="mx-2">x</strong> ${cartItem.quantity}</td>
                            <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                        </tr>`
        });

        output += `<tr>
                        <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
                        <td class="text-black font-weight-bold"><strong>${total.toFixed(2)}</strong></td>
                    </tr>`

        document.getElementById("output").innerHTML = output;
    }
}

//Calculates total price of products in localStorage array
function getTotal(){
    let total = 0;

    cartArray.forEach((cartItem) => {
        total += (cartItem.price * cartItem.quantity);
    });
    
    return total;
}

