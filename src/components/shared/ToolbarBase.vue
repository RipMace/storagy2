<template>
    <aside>
        <Menu />
        <header class="mdc-top-app-bar mdc-top-app-bar--dense toolbar">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <a @click="openSidebar" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
                    <div class="mdc-top-app-bar__title">
                        {{title}}
                    </div>
                </section>
            </div>
        </header>
    </aside>
</template>

<script>
  import { MDCTopAppBar } from '@material/top-app-bar';
  import EventBus from '../../services/event-bus';
  import Menu from "./Menu.vue";

  export default {
    name: "Toolbar",
    components: {
      Menu,
    },
    props: {
      title: String,
    },
    mounted() {
      const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    },
    methods: {
      openSidebar() {
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
        margin: 10px 10px 0;
        top: 0;
    }
    .mdc-top-app-bar {
        width: calc( 100% - 20px);
        border-radius: 8px;
    }
</style>
