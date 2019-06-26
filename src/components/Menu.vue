<template>
    <div>
        <aside class="mdc-drawer mdc-drawer--modal">
            <div class="mdc-drawer__header">
                <h3 class="mdc-drawer__title">Mail</h3>
                <h6 class="mdc-drawer__subtitle">email@material.io</h6>
            </div>
            <div class="mdc-drawer__content">
                <nav class="mdc-list">
                    <a class="mdc-list-item mdc-list-item--activated" href="#" aria-selected="true">
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">all_inbox</i>
                        <span class="mdc-list-item__text">Lista per sezioni</span>
                    </a>
                    <a class="mdc-list-item mdc-list-item--activated" href="#" aria-selected="true">
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">list</i>
                        <span class="mdc-list-item__text">Lista completa</span>
                    </a>
                    <a class="mdc-list-item" @click="logout">
                        <span class="mdc-list-item__text">Logout</span>
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
    .mdc-drawer {
        top: 0;
    }
</style>
