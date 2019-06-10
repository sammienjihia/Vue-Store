<template>
    <div>
        <div class="reveal" id="addGameModal">
            <h4>Add New Game</h4>
            <div class="grid-x">
                <div class="small-12 cell">
                    <div class="input-group">
                        <input class="input-group-field" type="text" v-model="searchGame" placeholder="Search Game...">
                        <div class="input-group-button">
                            <button class="small button" @click="searchGameFromApi"><icon name="search"></icon></button>
                        </div>
                    </div>
                </div>
                <div class="small-12 cell">
                    <template v-if="searchResults.length >= 1">
                        <p>Search Results:</p>
                        <table class="unstriped">
                            <tbody>
                            <tr v-for="game in searchResults">
                                <td><img class="search-result-icon" :src="game.image.icon_url" alt=""></td>
                                <td>{{ game.name }}</td>
                                <td><button class="cell-center tiny hollow button" data-open="addPriceModal" @click="selectedSearchItem(game)">Add To Catalog</button></td>
                            </tr>
                            </tbody>
                        </table>

                    </template>
                </div>
                <div class="small-12-cell">
                    <button class="alert small button" data-close @click="clearSearch">Cancel</button>
                </div>
            </div>
            <button class="close-button" data-close @click="clearSearch" aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="reveal" id="addPriceModal" data-reveal>
            <h4>Set Price:</h4>
            <div class="grid-x">
                <div class="small-12 cell">
                    <div class="input-group">
                        <span class="input-group-label">Kes</span>
                        <input class="input-group-field" v-model.number="price" type="number" placeholder="Price">
                    </div>
                </div>
                <div class="small-12 cell">
                    <button class="alert small button" data-close @click="clearSearch">Cancel</button>
                    <button class="small button" data-close @click="addGameToCatalog(selectedGame)">Add Game</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {baseUrl} from "../../api";
    import {API_KEY} from "../../../config";
    console.log(baseUrl);
    console.log(API_KEY);
    import Icon from "vue-awesome/components/Icon";
    import 'vue-awesome/icons/plus-circle'
    import 'vue-awesome/icons/search';
    let m = require('mithril');

    export default {
        name: "add-game-modal",

        data(){
            return{
                searchGame: '',
                price: '',
                selectedGame: '',
                searchResults: []
            }
        },

        methods:{
            searchGameFromApi(){
                m.jsonp({
                    url: `${ baseUrl }/search/`,
                    data: {
                        api_key: API_KEY,
                        format: 'jsonp',
                        limit: 5,
                        field_list: 'name,deck,image,guid',
                        resources:'game',
                        query: this.searchGame
                    },
                    callbackKey: 'json_callback'
                }).then(game => {
                    this.searchResults = game.results;
                });
            },

            clearSearch(){
                this.searchResults = [];
                this.searchGame = '';
            },

            selectedSearchItem(item){
                this.selectedGame = item;
            },

            addGameToCatalog(item){
                if(this.$store.state.games.includes(item)){
                    this.$message.info("The game already exists in the catalog.");
                    this.clearSearch();
                }else{
                    item.price = this.price;
                    this.$store.commit('ADD_TO_CATALOG', item);
                    this.clearSearch();
                    this.$message.success("Game added");
                }
            }

        },

        mounted(){
            this.reveal = new Foundation.Reveal($('#addGameModal'));
        },

        destroyed(){
            this.reveal.destroy();
        },

        components: {
            Icon
        },
    }
</script>

<style scoped>

</style>
