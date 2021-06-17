const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component('goods-list',{
    props: ['goods'],
    template: `
        <div>
            <div class="goods-list" v-if = "goods.length !== 0">
                <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" @additem="$emit('additemtocart',goodEntity.id_product)"></goods-item>
            </div>
            <div class="goods-list" v-else>
                <h3 class="list__heading">Нет данных</h3>
            </div>
        </div>      
    `,
});

Vue.component('goods-item', {
    props: ['goodProp'],
    template: `
      <div class="goods-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>{{goodProp.price}}</p>
        <button type="button" @click="$emit('additem')">Add To Cart</button>
      </div>
    `,
});

Vue.component('cart',{
    props: ['goods','visability','sum'],
    template: `
        <div class="cart" v-if = "visability">
            <div class="cart__header">
                <h3 class = "cart__heading">Cart</h3>
                <a href="#" class="cart__delete" @click = "$emit('closecart')">
                <svg class="card__cross" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                </svg>
                </a>
            </div>
    
            <div class="cart-list" v-if = "goods.length !== 0">
                <cart-item v-for="goodEntity in goods" :goodProp="goodEntity" @delitem="$emit('delitemfromcart',goodEntity.id_product)"></cart-item>                   
            </div>
            <h4 class="cart__heading_4" v-if = "goods.length !== 0">Total sum: {{sum}}</h4>
            
            <div class="cart-list" v-if = "goods.length == 0">
                <h4 class="cart__heading_4">Корзина пустая</h4>
            </div>                
            <button class = "clear-button" type = "button" @click = "$emit('clearcart')" v-if = "goods.length !== 0">Clear cart</button>                
        </div>    
    `,    
});

Vue.component('cart-item', {
    props: ['goodProp'],
    template: `
      <div class="cart-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>price: {{goodProp.price}}</p>
        <p>quantity: {{goodProp.quantity}}</p>
        <button type="button" @click="$emit('delitem')">Delete</button>
      </div>
    `,
});

Vue.component('search', {
    props: ['value'],
    template: `
        <div class="search">
            <input type = "text" class = "goods-search" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-on:keyup.enter = "$emit('showresult')">  
            <button class = "search-button btn" type = "button" @click = "$emit('showresult')">Search</button>
        </div>  
    `,
});

Vue.component("error-modal", {
    template: `
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">  
                        <div class="modal-header">
                            <h3>Ошибка</h3>
                        </div>
  
                        <div class="modal-body">
                            <p>не удаётся выполнить запрос к серверу</p>
                        </div>

                        <div class="modal-footer">
                            <button class="modal-default-button" @click="$emit('close')">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>`
  });

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cartList: [],
        isVisibleCart: false,
        sum: 0,
        showErrorModal: false
    },

    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                this.showErrorModal = true;
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

        addItemToCart(itemId) {
            this.isVisibleCart = true;
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

        deleteItemFromCart(itemId){
            this.cartList.forEach((good, index) => {
                if (good.id_product == itemId) {
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