import apiUrl from "./apiUrl";
const API_URL = apiUrl.API_URL();

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
            try {
                const responce = await fetch(`${API_URL}/catalogData`);
                if (responce.ok) {
                    const catalogItems = await responce.json();
                    this.goods = catalogItems;
                    this.filteredGoods = catalogItems;
                } else {
                    this.showErrorModal = true;
                }  
            } catch {
                this.showErrorModal = true;
            }      
        },

        async getCart() {
            const responce = await fetch(`${API_URL}/cartData`);
            if (responce.ok) {
                const cartItems = await responce.json();
                this.cartList = cartItems;
            } 
            this.sumOfGoods();            
        },

        filterGoods(){
            const regExp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
        },

        showCart(){
            this.getCart();
            this.isVisibleCart = true;
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
        await this.getCart();
    }
});


export default {
    app: app
};