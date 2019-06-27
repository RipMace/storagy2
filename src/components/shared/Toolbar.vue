<template>
    <aside>
        <Menu />
        <div class="toolbar">
            <header class="mdc-top-app-bar mdc-top-app-bar--dense">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button @click="openMenu" class="material-icons mdc-top-app-bar__navigation-icon">menu</button>
                        <div class="mdc-text-field mdc-text-field--no-label">
                            <input type="text" class="mdc-text-field__input" placeholder="Cerca in Storagy" aria-label="Label">
                        </div>
                    </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                        <CreateLocation>
                            <a class="material-icons mdc-top-app-bar__action-item" aria-label="Add Item" alt="Add Item">playlist_add</a>
                        </CreateLocation>
                    </section>
                </div>
            </header>

        </div>
    </aside>
</template>

<script>
  import { MDCTopAppBar } from '@material/top-app-bar';
  import CreateLocation from "../actions/CreateLocation.vue";
  import Menu from "./Menu.vue";
  import EventBus from '../../services/event-bus';

  export default {
    name: "Toolbar",
    components: {
      CreateLocation,
      Menu,
    },
    mounted() {
      const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    },
    methods: {
      openMenu() {
        EventBus.$emit("openMenu");
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "../../variables.scss";

    .toolbar {
        display: flex;
        justify-content: center;
        padding: 10px 10px 0;
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
