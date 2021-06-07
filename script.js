const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
    constructor(product_name = "None", price = 0, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }

    render() {
        return `<div class="goods-item" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">
                <h3>${this.product_name}</h3>
                <p>price: ${this.price}</p>
                <button class="btnCart" data-task="add" type="button">Add to Cart</button></div>`;
    }
};

class CartItem extends GoodsItem {
    constructor(product_name, price, id_product, quantity = 1){
        super(product_name, price, id_product);
        this.quantity = quantity;
    }
};

class GoodsList {
    constructor() {
        this.goods = [];
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
            const catalogItems = await responce.json();
            this.goods = catalogItems;
        } else {
            alert("Ошибка при соединении с сервером");
        }
    }

    render(classList) {
        let listHtml = "";      
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector(`.${classList}`).innerHTML = listHtml;
    }

    sumOfGoods() {
        let sum = 0;
        this.goods.forEach(good => {
            if (isNaN(good.quantity)) {
                sum += good.price;
            } else {
                sum += good.price * good.quantity;
            }            
        });
        return sum;
    }
}

class CarttList extends GoodsList {
    addItemToCart(item) {
        let productId = item.getAttribute('data-id');
        let productName = item.getAttribute('data-name');
        let productPrice = item.getAttribute('data-price');
        let product = new CartItem(productName, productPrice, productId, 1);
        const findItem = this.goods.find(good => product.id_product == good.id_product);             
        if (findItem === undefined) {
            this.goods.push(product);
        } else {
            findItem.quantity += 1;
        } 
        let sum = this.sumOfGoods();       
        this.render("cart-list");   
        this.editCart(sum);            
    }

    deleteItemFromCart(item) {       
        this.goods.forEach((good, index) => {
            if (good.id_product == item.getAttribute('data-id')) {
                if (good.quantity == 1) {
                    this.goods.splice(index, 1);
                } else {
                    good.quantity -= 1;
                }  
                return false;              
            }
        });
        let sum = 0;
        if (this.goods.length != 0) {
            sum = this.sumOfGoods();  
        }
        this.render("cart-list");   
        this.editCart(sum);         
    }

    editCart(sum) {
        document.querySelector('.cart-list').querySelectorAll('.goods-item').forEach((item) => {
            item.className = "cart-item";
            const findItem = this.goods.find(good => good.id_product == item.getAttribute('data-id'));
            item.querySelector('p').insertAdjacentHTML("afterend", `<p>quantity: ${findItem.quantity}</p>`);
        });
        document.querySelector('.cart-list').querySelectorAll('.btnCart').forEach((item) => {
            item.textContent = "Delete";
            item.setAttribute('data-task', "delete");
        });
        if (sum != 0) {
            document.querySelector(`.cart-list`).insertAdjacentHTML("beforeend",`<h3 class="sum__heading">Total sum: ${sum}</h3>`);
        }           
    }
    
    clearCart() {
        document.querySelector('.cart-list').innerHTML = "";
        this.goods = [];
    }

    getCartList() {
        let listHtml = '<ul>'; 
        this.goods.forEach(good => {
            listHtml += `<li class="cartItemList">
                            <h3>${good.product_name}</h3>
                            <p>price: ${good.price}</p>
                            <p>quantity: ${good.quantity}</p>                
                         </li>`;
        })
        listHtml += '</ul>'
        if (this.goods.length == 0) {
            listHtml = '<h3 class = "top__heading">Your cart is empty</h3>'
        } else {
            listHtml += `<h3 class = "top__heading">${document.querySelector('.sum__heading').textContent}</h3>`;
        }
        Swal.fire({
            title: '<strong>Cart list</strong>',
            html:
              `${listHtml}`,
            showCloseButton: true,
            confirmButtonText:'Ok',
            width: '300px'
          })
    }
};

const init = async () => {
    const list = new GoodsList();
    await list.fetchGoods();
    list.render("goods-list");
  
    const listCart = new CarttList();
    document.querySelectorAll(".btnCart[data-task='add']").forEach(item => {
        item.addEventListener('click', function(event){
            listCart.addItemToCart(event.target.parentNode); 
        });
    });    
    document.body.addEventListener('click', function(event){
        if (event.target.getAttribute('data-task') == 'delete') {
            listCart.deleteItemFromCart(event.target.parentNode);
        }
    });
    document.querySelector(".clear-button").addEventListener('click', function() {
        listCart.clearCart();
    });
    document.querySelector(".cartList").addEventListener('click', function() {
        listCart.getCartList();
    })
};

window.onload = init;