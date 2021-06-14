const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cartList: [],
        isVisibleCart: false,
        sum: 0,
    },

    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                alert("Ошибка при соединении с сервером");
            }            
        },

        filterGoods(){
            const regExp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
        },

        showCart(){
            if (this.isVisibleCart == false) {
                this.isVisibleCart = true;
            } else {
                this.isVisibleCart = false;
            }
        },

        clearCart(){
            this.cartList = [];
        },

        addItemToCart(item){
            this.isVisibleCart = true;
            // const itemId = item.target.attributes[1].value;
            const itemId = item.target.getAttribute('dataId');
            const product = this.goods.find(good => good.id_product == itemId);
            const findItem = this.cartList.find(good => good.id_product == itemId);
            if (findItem === undefined) {
                this.cartList.push({
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                });
            } else {
                findItem.quantity += 1;
            }    
            this.sumOfGoods();       
        },

        deleteItemFromCart(item){
            this.cartList.forEach((good, index) => {
                if (good.id_product == item.target.getAttribute('dataId')) {
                    if (good.quantity == 1) {
                        this.cartList.splice(index, 1);
                    } else {
                        good.quantity -= 1;
                    }  
                    return false;              
                }
            });
            this.sumOfGoods();       
        },

        sumOfGoods() {
            this.sum = 0;
            this.cartList.forEach(good => {
                this.sum += good.price * good.quantity;           
            });
        },
    },

    async mounted() {
        await this.getProducts();
    }
});