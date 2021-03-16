fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>renderProducts(data))

const cartArray = JSON.parse(localStorage.getItem("cartArray"));

renderCartQuantity();

function renderCartQuantity(){
    
    if(cartArray != null){
        let totalQuantity = getTotalQuantity();
        
        output = `<span class="number">${totalQuantity}</span>`

        document.getElementById("cart-quantity").innerHTML += output;
    }
}

function getTotalQuantity(){
    let updatedCartArray = JSON.parse(localStorage.getItem("cartArray"));
    let quantity = 0;
    
    updatedCartArray.forEach(item => {
        quantity += parseInt(item.quantity);
    });
    return quantity;
}
            
function renderProducts(products){
    let output = "";
    
    products.forEach((product) => {
        output += `<div class="col-lg-4 col-md-4 item-entry mb-4">
                        <input class="item-id" type="hidden" value="${product.id}">
                        <a href="#" class="product-item md-height bg-gray d-block">
                            <img class="item-img" src=${product.image}>
                        </a>
                        <h2 class="item-title">${product.title}</h2>
                        <strong class="item-price">${product.price.toFixed(2)}</strong>
                        <p>${product.description}</p>
                        <button id = "btn-shop" class="btn btn-primary btn-sm px-4 btn-shop" type="button">Purchase</button>
                    </div>`
    });
    
    document.getElementById("output").innerHTML = output;

    document.getElementById("output").addEventListener("click", purchaseClicked);
}
   
function purchaseClicked(event){
    if (event.target && event.target.id == "btn-shop"){
        let button = event.target;
        let shopItem = button.parentElement;
        let title = shopItem.getElementsByClassName("item-title")[0].innerText;
        let id = shopItem.getElementsByClassName("item-id")[0].value;
        let image = shopItem.getElementsByClassName("item-img")[0].src;
        let price = shopItem.getElementsByClassName("item-price")[0].innerText;

        let productItem = {
            id: id,
            title: title,
            price: price,
            image: image,
            quantity: 1
        };

        addtoLocalStorage(productItem);
        alert("Product added to cart")
        renderCartQuantity();
        // window.location.reload();
    }
}

function addtoLocalStorage(productItem){
    let cartArray = [];

    if (JSON.parse(localStorage.getItem("cartArray")) === null){
        cartArray.push(productItem);
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
    else{
        const localStorageArray = JSON.parse(localStorage.getItem("cartArray"));
        localStorageArray.map(x => {
            if (productItem.id == x.id){
                productItem.quantity = x.quantity + 1;
            }
            else {
                cartArray.push(x);
            }
        });
        cartArray.push(productItem);
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
    }
}