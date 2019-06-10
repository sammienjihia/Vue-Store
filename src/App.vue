<template>
  <div id="app">
      <navbar></navbar>
      <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar";
import Icon from "vue-awesome/components/Icon";
import 'vue-awesome/icons/spinner';
import './scss/global.scss'

export default {
    name: 'app',
    data(){
        return {

        }
    },
    mounted(){

    },
    created(){

    },
    components: {
        Icon,
        Navbar
    },
}
</script>

