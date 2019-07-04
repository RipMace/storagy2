<template>
    <aside>
        <Menu />
        <header class="mdc-top-app-bar mdc-top-app-bar--dense toolbar">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <a @click="goBack" v-if="goBackRoute" class="material-icons mdc-top-app-bar__navigation-icon">arrow_back</a>
                    <a @click="openSidebar" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
                    <div class="mdc-text-field mdc-text-field--no-label">
                        <input
                            type="text"
                            class="mdc-text-field__input"
                            :placeholder="'Cerca in ' + placeholder"
                            @keyup="changeTextFilter"
                            aria-label="Label"
                        >
                    </div>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <component :is="addAction" :fromLocation="{id: locationId}">
                        <a class="material-icons mdc-top-app-bar__action-item">playlist_add</a>
                    </component>
                    <div v-if="orderBy">
                        <a class="material-icons mdc-top-app-bar__action-item" @click="triggerMenu">more_vert</a>
                        <div class="mdc-menu-surface--anchor" style="top: 15px">
                            <div class="mdc-menu mdc-menu-surface">
                                <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                                    <li v-for="sort in this.sortingMenuList"
                                        class="mdc-list-item"
                                        role="menuitem"
                                        @click="changeSort(sort)"
                                    >
                                        <span class="mdc-list-item__text">{{sort.label}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </header>
    </aside>
</template>

<script>
  import { MDCTopAppBar } from '@material/top-app-bar';
  import { MDCMenu } from '@material/menu';
  import CreateItem from "../actions/CreateItem.vue";
  import CreateLocation from "../actions/CreateLocation.vue";
  import Menu from "./Menu.vue";
  import EventBus from '../../services/event-bus';

  const orderOptions = [
    {id: 'NAME', key: 'name', type: 'String', label: 'Ordina per nome'},
    {id: 'DUE', key: 'due', type: 'Date', label: 'Ordina per data scadenza'},
    {id: 'AMOUNT', key: 'amount', type: 'Number', label: 'Ordina per quantità'},
  ];

  export default {
    name: "Toolbar",
    components: {
      CreateLocation,
      CreateItem,
      Menu,
    },
    props: {
      addAction: String,
      locationId: String,
      placeholder: String,
      changeTextFilter: Function,
      changeSort: Function,
      goBackRoute: String,
      orderBy: Array,
      currentSort: Object,
    },
    mounted() {
      const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
      if (this.orderBy) {
        this.menu = new MDCMenu(document.querySelector('.mdc-menu'));
      }
    },
    methods: {
      openSidebar() {
        EventBus.$emit("openMenu");
      },
      triggerMenu() {
        this.menu.open = !this.menu.open
      },
      goBack() {
        this.$router.push({ name: this.goBackRoute });
      }
    },
    computed: {
      sortingMenuList() {
        return orderOptions.filter((s) => this.orderBy.includes(s.id) )
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "../../variables.scss";

    .toolbar {
        display: flex;
        justify-content: center;
        margin: 10px 10px 0;
        top: 0;
    }
    .mdc-top-app-bar {
        width: calc( 100% - 20px);
        border-radius: 8px;
    }
    .mdc-text-field {
        background: none !important;
        height: 34px;
        width: 100%;

        .mdc-text-field__input {
            padding: 0 15px !important;
            color: $white !important;
            border-bottom: none;

            &::placeholder {
                color: $white;
            }
        }
    }
</style>
