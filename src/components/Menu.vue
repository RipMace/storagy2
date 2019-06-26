<template>
    <div>
        <aside class="mdc-drawer mdc-drawer--modal">
            <img v-if="user.photoURL" class="header-image" :src="user.photoURL">
            <div class="header-image header-image__avatar material-icons" v-else>account_circle</div>
            <a @click="logout" class="logout material-icons mdc-top-app-bar__action-item">exit_to_app</a>
            <div class="mdc-drawer__header">
                <h3 class="mdc-drawer__title">{{user.displayName}}</h3>
                <h6 class="mdc-drawer__subtitle">{{user.email}}</h6>
            </div>
            <div class="mdc-drawer__content">
                <nav class="mdc-list">
                    <a class="mdc-list-item mdc-list-item--activated" @click="changeViewType('location')">
                        <i class="material-icons mdc-list-item__graphic">all_inbox</i>
                        <span class="mdc-list-item__text">Lista per Sezione</span>
                    </a>
                    <a class="mdc-list-item" @click="changeViewType('complete')">
                        <i class="material-icons mdc-list-item__graphic">list</i>
                        <span class="mdc-list-item__text">Lista completa</span>
                    </a>
                </nav>
            </div>
        </aside>
        <div class="mdc-drawer-scrim"></div>
    </div>
</template>

<script>
  import { MDCDrawer } from "@material/drawer";
  import { auth } from '../services/firebase';
  import EventBus from '../services/event-bus';

  export default {
    name: "Menu",
    props: {
      changeViewType: Function,
    },
    data() {
      return {
        user: auth.currentUser,
      }
    },
    mounted() {
      this.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
      this.listEl = document.querySelector('.mdc-drawer .mdc-list');
      EventBus.$on('openMenu', this.openMenu);
      this.listEl.addEventListener('click', () => this.drawer.open = false);
    },
    beforeDestroy() {
      this.listEl.removeEventListener('click');
    },
    methods: {
      openMenu() {
        this.drawer.open = true;
      },
      logout () {
        auth.signOut().then(() => this.$router.push({name: 'Login'}))
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "../variables";

    .mdc-drawer {
        top: 0;

        .logout {
            position: absolute;
            right: 0;
            top: 0;
            color: $mdc-theme-primary;
        }

        .header-image {
            margin: 16px 0 -5px 16px;
            width: 60px;
            border-radius: 50%;
        }

        .header-image__avatar {
            color: $greyDarker;
            font-size: 60px;
        }
    }
</style>
