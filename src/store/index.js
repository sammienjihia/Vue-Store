import Vue from 'vue';
import Vuex from 'vuex';
import jwt from 'jsonwebtoken';
import * as types from './mutation-types';

Vue.use(Vuex);

const state = {
    cart: [],
    isLoggedIn: !!localStorage.getItem("token"),
    users: [],
    loggedInUser: [],
    games: [
        {
            "deck": "A procedurally-generated game of world exploration, resource harvesting, and freeform construction. It supports local and online multiplayer, and is regularly updated with new content and features.",
            "id": 30475,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2127186-box_minecraft.png",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2127186-box_minecraft.png",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2127186-box_minecraft.png",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2127186-box_minecraft.png",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2127186-box_minecraft.png",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2127186-box_minecraft.png",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2127186-box_minecraft.png",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2127186-box_minecraft.png",
                "original_url": "https://www.giantbomb.com/api/image/original/2127186-box_minecraft.png",
                "image_tags": "All Images,Box Art"
            },
            "name": "Minecraft",
            "price": 1500,
            "quantity": 1
        },
        {
            "deck": "The fifth installment in Bethesda's Elder Scrolls franchise is set in the eponymous province of Skyrim, where the ancient threat of dragons, led by the sinister Alduin, is rising again to threaten all mortal races. Only the player, as the prophesied hero the Dovahkiin, can save the world from destruction.",
            "id": 33394,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/1895988-skyrim.png",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/1895988-skyrim.png",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/1895988-skyrim.png",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/1895988-skyrim.png",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/1895988-skyrim.png",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/1895988-skyrim.png",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/1895988-skyrim.png",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/1895988-skyrim.png",
                "original_url": "https://www.giantbomb.com/api/image/original/1895988-skyrim.png",
                "image_tags": "All Images,Box Art"
            },
            "name": "The Elder Scrolls V: Skyrim",
            "price": 2000,
            "quantity": 1
        },
        {
            "deck": "The sequel to Supersonic Acrobatic Rocket-Powered Battle-Cars, Rocket League is the second vehicular sports-action game developed by Psyonix.",
            "id": 34407,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2949245-box_rleague.png",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2949245-box_rleague.png",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2949245-box_rleague.png",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2949245-box_rleague.png",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2949245-box_rleague.png",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2949245-box_rleague.png",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2949245-box_rleague.png",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2949245-box_rleague.png",
                "original_url": "https://www.giantbomb.com/api/image/original/2949245-box_rleague.png",
                "image_tags": "All Images"
            },
            "name": "Rocket League",
            "price": 2500,
            "quantity": 1
        },
        {
            "deck": "The fifth numbered entry in the renowned Street Fighter series of fighting games has appeared as a PlayStation 4 and PC exclusive.",
            "id": 48320,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "original_url": "https://www.giantbomb.com/api/image/original/2707240-rsz_15774215657_dbc508b182_b.jpg",
                "image_tags": "All Images"
            },
            "name": "Street Fighter V",
            "price": 5000,
            "quantity": 1
        },
        {
            "deck": "The full-fledged follow-up to Destiny, streamlining much of the previous game's mechanics while featuring larger worlds and new abilities.",
            "id": 52647,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2929252-destiny%202%20v3.jpg",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2929252-destiny%202%20v3.jpg",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2929252-destiny%202%20v3.jpg",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2929252-destiny%202%20v3.jpg",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2929252-destiny%202%20v3.jpg",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2929252-destiny%202%20v3.jpg",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2929252-destiny%202%20v3.jpg",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2929252-destiny%202%20v3.jpg",
                "original_url": "https://www.giantbomb.com/api/image/original/2929252-destiny%202%20v3.jpg",
                "image_tags": "All Images"
            },
            "name": "Destiny 2",
            "price": 7000,
            "quantity": 1
        },
        {
            "deck": "DC Comics characters collide in a second installment of this fighting game from the makers of Mortal Kombat.",
            "id": 54144,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2949253-box_injust2.png",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2949253-box_injust2.png",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2949253-box_injust2.png",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2949253-box_injust2.png",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2949253-box_injust2.png",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2949253-box_injust2.png",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2949253-box_injust2.png",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2949253-box_injust2.png",
                "original_url": "https://www.giantbomb.com/api/image/original/2949253-box_injust2.png",
                "image_tags": "All Images"
            },
            "name": "Injustice 2",
            "price": 6000,
            "quantity": 1
        },
        {
            "deck": "Led by the modder behind the Battle Royale mods for the ArmA series, PlayerUnknown's Battlegrounds is a shooter that pits 100 trigger-happy players in a large empty location where they must scavenge for weapons and fight to the death.",
            "id": 54979,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2955325-box_pubg.png",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2955325-box_pubg.png",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2955325-box_pubg.png",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2955325-box_pubg.png",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2955325-box_pubg.png",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2955325-box_pubg.png",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2955325-box_pubg.png",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2955325-box_pubg.png",
                "original_url": "https://www.giantbomb.com/api/image/original/2955325-box_pubg.png",
                "image_tags": "All Images"
            },
            "name": "PlayerUnknown's Battlegrounds",
            "price": 2500,
            "quantity": 1
        },
        {
            "deck": "Nintendo's favorite plumber and his new hat-shaped companion travel far beyond the Mushroom Kingdom in this Switch-exclusive 3D platformer.",
            "id": 56733,
            "image": {
                "icon_url": "https://www.giantbomb.com/api/image/square_avatar/2972168-smoboxartfinal.jpg",
                "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2972168-smoboxartfinal.jpg",
                "screen_url": "https://www.giantbomb.com/api/image/screen_medium/2972168-smoboxartfinal.jpg",
                "screen_large_url": "https://www.giantbomb.com/api/image/screen_kubrick/2972168-smoboxartfinal.jpg",
                "small_url": "https://www.giantbomb.com/api/image/scale_small/2972168-smoboxartfinal.jpg",
                "super_url": "https://www.giantbomb.com/api/image/scale_large/2972168-smoboxartfinal.jpg",
                "thumb_url": "https://www.giantbomb.com/api/image/scale_avatar/2972168-smoboxartfinal.jpg",
                "tiny_url": "https://www.giantbomb.com/api/image/square_mini/2972168-smoboxartfinal.jpg",
                "original_url": "https://www.giantbomb.com/api/image/original/2972168-smoboxartfinal.jpg",
                "image_tags": "All Images,Box Art"
            },
            "name": "Super Mario Odyssey",
            "price": 4000,
            "quantity": 1
        }
    ]
};

const getters = {
    numberOfCartItems: state => {
        return state.cart.length;
    },

    calculateCartTotal: state => {
        return state.cart.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0)
    },

    isLoggedIn: state => {
        return state.isLoggedIn;
    },

    loggedInUser: state => {
        return state.loggedInUser[0];
    }
};

const mutations = {
    [types.LOGIN] (state, credentials){
        state.pending = true;
        let token  = jwt.sign(credentials, 'secret');
        let registeredUser = state.users.find( user => user.email === credentials.email);

        if (registeredUser) {
            localStorage.setItem('token', token);
            state.loggedInUser.push(credentials.email);
            state.isLoggedIn = true;
        } else {
            state.isLoggedIn = false;
        }

    },

    [types.LOGIN_SUCCESS] (state){
        state.isLoggedIn = true;
        state.pending = false;
    },

    [types.LOGOUT] (state) {
        state.loggedInUser.pop();
        state.isLoggedIn = false;
    },

    [types.REGISTER] (state, credentials) {
        state.pending = true;
        let token = jwt.sign(credentials, 'secret');
        localStorage.setItem('token', token);
        state.loggedInUser.push(credentials.email);
        state.users.push({ email: credentials.email, token: token, roleId: '2'});
        state.isLoggedIn = true;
    },

    [types.REGISTER_SUCCESS] (state) {
        state.isLoggedIn = true;
        state.pending = false;
    },

    [types.ADD_TO_CATALOG] (state, catalogItem) {
        catalogItem.quantity = 1;
        state.games.push(catalogItem);
    },

    [types.ADD_TO_CART] (state, cartItem){
        if (state.cart.includes(cartItem)){
            let existingItem = state.cart.find(item => item.id === cartItem.id);
            existingItem.quantity++;
        } else {
            if(cartItem.quantity === 0){
                cartItem.quantity = 1;
            }
            state.cart.push(cartItem);
        }
    },

    [types.REMOVE_FROM_CART] (state, cartItem){
        if(state.cart.includes(cartItem)){
            let existingItem = state.cart.find(item => item.id === cartItem.id);
            let existingItemIndex = state.cart.findIndex(item => item.id === cartItem.id);
            existingItem.quantity--;

            if(existingItem.quantity === 0){
                this.state.cart.splice(existingItemIndex, 1);
            }
        }
    }

};

const actions = {
    logout({ commit }){
        localStorage.removeItem('token');
        commit(types.LOGOUT);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});