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
                    <a v-for="item in menuList" :class="['mdc-list-item', { 'mdc-list-item--activated' : $route.fullPath.includes(item.name.toLowerCase()) }]" @click="changeRoute(item.name)">
                        <i class="material-icons mdc-list-item__graphic">{{item.icon}}</i>
                        <span class="mdc-list-item__text">{{item.label}}</span>
                    </a>
                </nav>
            </div>
        </aside>
        <div class="mdc-drawer-scrim"></div>
    </div>
</template>

<script>
  import { MDCDrawer } from "@material/drawer";
  import { auth } from '../../services/firebase';
  import EventBus from '../../services/event-bus';

  export default {
    name: "Menu",
    data() {
      return {
        user: auth.currentUser,
        menuList: [
          {
            name: 'Category',
            icon: 'all_inbox',
            label: 'Lista per Sezione',
          },
          {
            name: 'Items',
            icon: 'list',
            label: 'Lista completa',
          },
          {
            name: 'Expired',
            icon: 'list_alt',
            label: 'Lista in Scadenza',
          },
          {
            name: 'Calendar',
            icon: 'today',
            label: 'Calendario',
          }
        ],
      }
    },
    mounted() {
      this.drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
      this.listEl = document.querySelector('.mdc-drawer .mdc-list');
      EventBus.$on('openMenu', this.triggerMenu);
      this.listEl.addEventListener('click', this.triggerMenu);
    },
    beforeDestroy() {
      this.listEl.removeEventListener('click', this.triggerMenu);
    },
    methods: {
      triggerMenu() {
        this.drawer.open = !this.drawer.open;
      },
      changeRoute(name) {
        this.$router.push({ name });
      },
      logout () {
        auth.signOut().then(() => this.$router.push({name: 'Login'}))
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "../../variables";
    @import "~@material/drawer/mdc-drawer";

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
