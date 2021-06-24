export default Vue.component('goods-list',{
    props: ['goods'],
    template: `
        <div>
            <div class="goods-list" v-if = "goods.length !== 0">
                <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :key="goodEntity.id" @showcart="$emit('getcart')"></goods-item>
            </div>
            <div class="goods-list" v-else>
                <h3 class="list__heading">Нет данных</h3>
            </div>
        </div>      
    `,
});