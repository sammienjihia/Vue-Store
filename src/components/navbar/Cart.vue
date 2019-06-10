<template>
    <div class="reveal" id="cartModal">
        <h4>Cart</h4>
        <template v-if="numberOfCartItems >= 1">
            <div class="grid-x">
                <div class="cell">
                    <table class="unstriped">
                        <thead>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                        </thead>
                        <tbody>
                        <tr v-for="item in cart">
                            <td>{{ item.name }}</td>
                            <td>x {{ item.quantity }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.quantity * item.price }}</td>
                            <td>
                                <button class="tiny clear alert button no-margin-bottom" @click="removeItemFromCart(item)">
                                    <icon name="minus-circle"></icon>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="4">Total:</td>
                            <td>{{ calculateCartTotal }}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="grid-x">
                <div class="cell text-right">
                    <button class="small button">Checkout</button>
                </div>
            </div>
        </template>
        <p class="grey-text" v-else><em>No Items in the cart</em></p>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Icon from "vue-awesome/components/Icon";
    import 'vue-awesome/icons/minus-circle';

    export default {
        components: {Icon},
        name: "cart",

        data(){
            return{
                total: 0
            }
        },

        computed:{
            cart(){
                return this.$store.state.cart;
            },

            ...mapGetters([
                'numberOfCartItems',
                'calculateCartTotal'
            ])
        },

        methods:{
            removeItemFromCart(item){
                this.$store.commit('REMOVE_FROM_CART', item);
                this.$message.success("Item Removed");
            }
        },

        mounted(){
            this.reveal = new Foundation.Reveal($('#cartModal'));
        },

        destroyed(){
            this.reveal.destroy();
        }
    }
</script>

<style lang="scss" scoped>
    .grey-text{
        color: $dark-gray;
        font-size: 0.8rem;
    }
</style>