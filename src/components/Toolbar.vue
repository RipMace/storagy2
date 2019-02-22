<template>
    <div class="toolbar">
        <header class="mdc-top-app-bar mdc-top-app-bar--dense">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
                    <div class="mdc-text-field mdc-text-field--no-label">
                        <input type="text" class="mdc-text-field__input" placeholder="Cerca in Storagy" aria-label="Label">
                    </div>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <a href="#" class="material-icons mdc-top-app-bar__action-item" aria-label="Add Item" alt="Add Item">playlist_add</a>
                </section>
            </div>
        </header>
    </div>
</template>

<script>
  import { MDCTopAppBar } from '@material/top-app-bar';
  export default {
    name: "Toolbar",
    mounted() {
      const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    },
  }
</script>

<style scoped lang="scss">
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

        &:hover::before {
            opacity: 0;
        }

        .mdc-text-field__input {
            border-bottom: none;
            color: white !important;

            &::placeholder {
                color: white;
            }
        }
    }
</style>
