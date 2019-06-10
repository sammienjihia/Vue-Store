<template>
    <div class="reveal" id="signUpModal" data-reveal>
        <h4>Sign Up</h4>
        <form>
            <div class="grid-x">
                <div class="cell">
                    <label>
                        Email
                        <input type="email" v-model="email">
                    </label>
                </div>
                <div class="cell">
                    <label>
                        Password
                        <input type="password" v-model="password">
                    </label>
                </div>
            </div>
        </form>
        <div class="grid-x">            &emsp;
            <button class="button" type="button" data-close @click="register()">Submit</button>
        </div>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "sign-up-modal",

        data(){
            return {
                email: '',
                password: ''
            }
        },

        methods: {
            register(){
                this.$store.commit('REGISTER', {
                    email: this.email,
                    password: this.password
                });

                this.email = '';
                this.password = '';

                this.$router.push('/');
                this.$message.success('Logged In');
            }
        },

        mounted(){
            this.reveal = new Foundation.Reveal($('#signUpModal'))
        },

        destroyed(){
            this.reveal.destroy()
        }
    }
</script>

<style scoped>

</style>