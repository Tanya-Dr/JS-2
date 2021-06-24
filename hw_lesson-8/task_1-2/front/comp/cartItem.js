import apiUrl from "./apiUrl";
const API_URL = apiUrl.API_URL();

export default Vue.component('cart-item', {
    props: ['goodProp'],
    methods: {
        async deleteFromCart() {
            const response = await fetch(`${API_URL}/deleteFromCart`, {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp) 
            });
            this.$emit('showcart');
        },
    },
    template: `
      <div class="cart-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>price: {{goodProp.price}}</p>
        <p>quantity: {{goodProp.quantity}}</p>
        <button type="button" @click=deleteFromCart>Delete</button>
      </div>
    `,
});