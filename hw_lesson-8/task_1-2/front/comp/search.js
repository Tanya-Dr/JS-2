export default Vue.component('search', {
    props: ['value'],
    template: `
        <div class="search">
            <input type = "text" class = "goods-search" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-on:keyup.enter = "$emit('showresult')">  
            <button class = "search-button btn" type = "button" @click = "$emit('showresult')">Search</button>
        </div>  
    `,
});
