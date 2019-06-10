<template>
    <div class="grid-x grid-padding-x">
        <div class="small-12 medium-3 card-padding" v-for="game in showGames">
            <div class="card">
                <img class="card-image" v-lazy="game.image.small_url">
                <div class="card-section">
                    <div class="game-text text-left">{{ game.name }}</div>
                    <div class="text-left">Kes. {{ game.price }}</div>
                    <div class="card-buttons">
                        <button class="tiny secondary button" @click="showItemInModal(game)">Details</button>
                        <button v-if="isLoggedIn" class="tiny primary button" @click="addItemToCart(game)">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="reveal" id="viewGameModal" data-reveal>
            <h4>{{ selectedItem.name }}</h4>
            <p>{{ selectedItem.deck }}</p>
            <button class="hollow button secondary" data-close>Cancel</button>
            <button class="close-button" data-close type="button"><span>&times;</span></button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "table-component",

        data(){
            return{
                tableItems: '',
                selectedItem: '',
                itemQuantity: 0
            }
        },

        computed: {
            showGames(){
                return this.$store.state.games;
            },

            ...mapGetters([
                'isLoggedIn'
            ])
        },

        mounted(){
           this.reveal = new Foundation.Reveal($('#viewGameModal'));
        },

        methods: {
            showItemInModal(item){
                this.reveal.open();
                this.selectedItem = item;
            },
            addItemToCart(item){
                this.$message.info("Added to cart");
                this.$store.commit('ADD_TO_CART', item);
            }
        },
        destroyed(){
            this.reveal.destroy()
        }
    }
</script>
