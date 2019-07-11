<template>
    <div class="login-background">
        <div class="login">
            <div class="icon-wrapper">
                <span class="mdc-list-item__graphic" aria-hidden="true">
                    <img class="header-image" width="80px" height="80px" src="images/logo_trasp.png">
                </span>
            </div>
            <h6 class="title">Sign In to your account</h6>
            <form class="full-width-form" @submit="login">
                <TextField v-model="email" placeholder="Email" required type="email" field-id="email"/>
                <TextField v-model="password" placeholder="Password" required type="password" field-id="password"/>
                <button type="submit" id="signIn" class="mdc-button--raised">
                    <span class="mdc-button__label">sign in</span>
                </button>
            </form>
            <div class="separator">
                or
            </div>
            <button type="submit" id="googleSignIn" @click="socialLogin" class="mdc-button--raised">
                <span class="mdc-button__label">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><g><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"></path><path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" ></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" ></path></g></svg>
                    Sign in with Google
                </span>
            </button>
            <p class="create-account">Don't have an account? <router-link to="/sign-up">Create an account</router-link></p>
        </div>
    </div>
</template>

<script>
  import { auth, provider, stores } from '../services/firebase';
  import { MDCRipple } from '@material/ripple';

  import TextField from "./shared/TextField.vue";

  export default {
    name: 'login',
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
      const signInButton = new MDCRipple(document.querySelector('#signIn'));
    },
    methods: {
      login() {
        auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
          console.log('signInWithEmailAndPassword', user);
          this.$router.replace('storagy/category');
        }).catch((err) => {
          // TODO alert utente non registrato da migliorare
          alert('Oops. ' + err.message)
        });
      },
      socialLogin() {
        auth.signInWithPopup(provider).then((result) => {
          if (result.additionalUserInfo.isNewUser) {
            stores.doc(result.user.uid).set({})
          }
          this.$router.replace('storagy/category');
        }).catch((err) => {
          // TODO alert utente non registrato da migliorare
          alert('Oops. ' + err.message)
        });
      }
    }
  }
</script>

<style scoped lang="scss">
    @import ".././variables.scss";
    .login {
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
                width: 80px;
                height: 80px;
            }
        }

        .title {
            text-align: center;
            margin: 25px 0;
        }

        .separator {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            margin: 10px 0 25px;

            &::after,
            &::before {
                content: "";
                height: 1px;
                width: 40%;
                background: $grey;
            }
        }

        #googleSignIn {
            background: #dd4b39;
            width: 100%;
            .mdc-button__label {
                display: flex;
            }
            svg {
                fill: $white !important;
                margin-right: 10px;
            }
        }

        .create-account {
            margin-top: 25px;
            font-size: 12px;
            text-align: center;

            a {
                color: $link-color;
            }
        }
    }
</style>
