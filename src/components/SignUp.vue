<template>
    <div class="login-background">
        <div class="sign-up">
            <div class="icon-wrapper">
                <span class="mdc-list-item__graphic material-icons" aria-hidden="true">fastfood</span>
            </div>
            <h3 class="title">Let's create a new account!</h3>
            <form class="full-width-form" @submit="signUp">
                <TextField v-model="email" placeholder="Email" required type="email" field-id="email"/>
                <TextField v-model="password" placeholder="Password" required type="password" field-id="password"/>
                <button type="submit" id="signUp" class="mdc-button--raised">
                    <span class="mdc-button__label">sign up</span>
                </button>
            </form>
            <p class="back-to-login">or go back to <router-link to="/login">login</router-link>.</p>
        </div>
    </div>
</template>

<script>
  import { auth, stores } from '../services/firebase';
  import { MDCRipple } from '@material/ripple';

  import TextField from "./shared/TextField.vue";

  export default {
    name: 'signUp',
    components: {
      TextField,
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    mounted() {
      const signInButton = new MDCRipple(document.querySelector('#signUp'));
    },
    methods: {
      signUp: function() {
        auth.createUserWithEmailAndPassword(this.email, this.password).then(
          (result) => {
            stores.doc(result.user.uid).set({});
            this.$router.replace('storagy/category')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped lang="scss">
    @import ".././variables.scss";

    .sign-up {
        background: $white;
        width: 250px;
        padding: 50px 20px 20px;
        position: relative;

        .icon-wrapper {
            background: $white;
            border-radius: 50%;
            height: 100px;
            width: 100px;
            position: absolute;
            top: -50px;
            left: calc(50% - 50px);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 10px $greyDarker;

            .mdc-list-item__graphic {
                margin-right: 0;
                font-size: 60px;
                width: 60px;
                height: 60px;
            }
        }

        .title {
            text-align: center;
            margin: 25px 0;
        }

        .back-to-login {
            font-size: 12px;
            text-align: center;

            a {
                color: $link-color;
            }
        }
    }
</style>
