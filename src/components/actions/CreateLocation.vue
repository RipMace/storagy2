<template>
    <div>
        <div @click="open">
            <slot></slot>
        </div>
        <div class="mdc-dialog mdc-dialog-full"
             :id="id"
             role="dialog"
             aria-modal="true"
             aria-labelledby="create storage"
             aria-describedby="create storage">
            <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                    <header class=" mdc-top-app-bar mdc-top-app-bar--short">
                        <div class="mdc-top-app-bar__row">
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                                <button type="button" @click="close" class="material-icons mdc-top-app-bar__navigation-icon--unbounded">arrow_back</button>
                                <span class="mdc-top-app-bar__title">Crea Sezione</span>
                            </section>
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                                <button type="button" @click="save" class="mdc-top-app-bar__action-item--unbounded" aria-label="save">salva</button>
                            </section>
                        </div>
                    </header>
                    <div class="mdc-dialog__content" id="create-storage-content">
                        <form class="full-width-form" @submit="createLocation">
                            <TextField v-model="name" placeholder="Nome" required type="text" field-id="name"/>
                            <TextField v-model="desc" placeholder="Descrizione" type="text" field-id="desc"/>
                            <ToggleField v-model="notification" placeholder="Abilita Notifiche" field-id="notification"/>
                            <button type="submit" id="save-button" style="visibility: hidden">salva</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
    </div>
</template>

<script>
  import uniqid from 'uniqid';
  import { MDCDialog } from '@material/dialog';
  import { addLocationsAction } from '../../services/firebase';
  import EventBus from '../../services/event-bus';

  import TextField from "../shared/TextField.vue";
  import ToggleField from "../shared/ToggleField.vue";

  export default {
    name: "CreateLocation",
    components: {
      TextField,
      ToggleField
    },
    props: {
      onClose: Function,
    },
    data() {
      return {
        dialog: MDCDialog,
        name: undefined,
        desc: undefined,
        notification: true,
        id: uniqid(),
      }
    },
    mounted() {
      this.dialog = new MDCDialog(document.getElementById(id));
    },
    methods: {
      open() {
        this.dialog.open();
      },
      close() {
        this.name = undefined;
        this.desc = undefined;
        this.notification = true;
        EventBus.$emit('reloadCategories');
        this.dialog.close();
      },
      save() {
        document.querySelector('#save-button').click();
      },
      createLocation() {
        addLocationsAction({ name: this.name, description: this.desc, notification: this.notification }).then(() => this.close());
      }
    },
  }
</script>

<style scoped lang="scss">
    @import "../.././variables.scss";

    .mdc-top-app-bar__navigation-icon--unbounded,
    .mdc-top-app-bar__action-item--unbounded {
        color: $white;
    }

    .mdc-dialog__content {
        margin-top: 60px;
    }
</style>
