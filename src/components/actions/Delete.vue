<template>
    <div>
        <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
           title="Delete"
           @click.stop="open">
            delete
        </a>
        <div :id="id" role="dialog" class="mdc-dialog">
            <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                    <h2 id="my-mdc-dialog-label" class="mdc-dialog__title">Elimina</h2>
                    <section id="my-mdc-dialog-description" class="mdc-dialog__content">Sei sicuro di eliminare "{{name}}"?</section>
                    <footer class="mdc-dialog__actions">
                        <button id="discardDelete" type="button" class="mdc-button mdc-dialog__button mdc-ripple-upgraded" @click.stop="close">annulla</button>
                        <button id="confirmDelete" type="button" class="mdc-button mdc-dialog__button mdc-ripple-upgraded" @click.stop="() => { close(); onDelete() }">conferma</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import uniqid from 'uniqid';
  import { MDCDialog } from '@material/dialog';
  import { MDCRipple } from '@material/ripple';

  export default {
    name: "Delete",
    props: {
      onDelete: Function,
      name: String,
    },
    data() {
      return {
        id: uniqid(),
        dialog: MDCDialog,
      }
    },
    mounted() {
      this.dialog = new MDCDialog(document.getElementById(this.id));
      const discardDelete = new MDCRipple(document.getElementById('discardDelete'));
      const confirmDelete = new MDCRipple(document.getElementById('confirmDelete'));
    },
    methods: {
      open() {
        this.dialog.open();
      },
      close() {
        this.dialog.close();
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "../.././variables.scss";
</style>
