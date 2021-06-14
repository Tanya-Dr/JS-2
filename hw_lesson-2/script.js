const arrayGoods = [
    { title: 'Shirt', price: 150, id: 1},
    { title: 'Socks', price: 50, id: 2},
    { title: 'Jacket', price: 350, id: 3},
    { title: 'Shoes', price: 250, id: 4},
];

class GoodsItem {
    constructor(title = "None", price = 0, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="goods-item" data-id="${this.id}"><h3>${this.title}</h3><p>price: ${this.price}</p><button class="btnCart" data-task="add">Add to Cart</button></div>`;
    }
};

class CartItem extends GoodsItem {
    constructor(title, price, id, quantity = 1){
        super(title, price, id);
        this.quantity = quantity;
    }

    addQuantity() {
        this.quantity += 1;
    }
};

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = arrayGoods;
    }

    render(classList) {
        let listHtml = "";      
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector(`.${classList}`).innerHTML = listHtml;
    }

    sumOfGoods(classList) {
        let sum = 0;
        this.goods.forEach((good) => {
            if (isNaN(good.quantity)) {
                sum += good.price;
            } else {
                sum += good.price * good.quantity;
            }            
        });
        document.querySelector(`.${classList}`).insertAdjacentHTML("beforeend",`<h3 class="sum__heading">Total sum: ${sum}</h3>`)
    }
}

class CarttList extends GoodsList {
    addItemToCart(item) {
        const getProduct = arrayGoods.find((good) => good.id == item.getAttribute('data-id'));
        let product = new CartItem(getProduct.title, getProduct.price, getProduct.id, getProduct.quantity);
        const findItem = this.goods.find((good) => product.id == good.id);
        if (findItem === undefined) {
            this.goods.push(product);
        }
        else {
            findItem.addQuantity();
        }        
    }

    deleteItemFromCart(item) {        
        this.goods.forEach((good, index) => {
            if (good.id == item.getAttribute('data-id')) {
                this.goods.splice(index, 1);
            }
        });
        console.log(this.goods);
    }

    editCart() {
        document.querySelector('.cart-list').querySelectorAll('.goods-item').forEach((item) => {
            item.classList.remove('goods-item');
            item.classList.add('cart-item');
            this.goods.forEach((good) => {
                if (good.id == item.getAttribute('data-id')) {
                    item.querySelector('p').insertAdjacentHTML("afterend", `quantity: ${good.quantity}`);
                }
            });
        });
        document.querySelector('.cart-list').querySelectorAll('.btnCart').forEach((item) => {
            item.textContent = "Delete";
            item.setAttribute('data-task', "delete");
        });
    }
    
    clearCart() {
        document.querySelector('.cart-list').innerHTML = "";
        this.goods = [];
    }
};

const init = () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render("goods-list");
    list.sumOfGoods("goods-list");

  
    const listCart = new CarttList();
    document.querySelectorAll(".btnCart[data-task='add']").forEach((item) => {
        item.addEventListener('click', function(event){
            listCart.addItemToCart(event.target.parentNode);
            listCart.render("cart-list");   
            listCart.editCart();     
            listCart.sumOfGoods("cart-list");    
        });
    });    
    document.body.addEventListener('click', function(event){
        if (event.target.getAttribute('data-task') == 'delete') {
            listCart.deleteItemFromCart(event.target.parentNode);
            listCart.render("cart-list");  
            listCart.editCart();
            listCart.sumOfGoods("cart-list");
        }
    });
    document.querySelector(".clear-button").addEventListener('click', function() {
        listCart.clearCart();
    });
};

window.onload = init;