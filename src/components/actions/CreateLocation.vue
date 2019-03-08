<template>
    <div>
        <button class="mdc-button--raised" @click="open">
            Create location
        </button>
        <div class="mdc-dialog mdc-dialog-full"
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
                                <span class="mdc-top-app-bar__title">Create Location</span>
                            </section>
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                                <button type="button" @click="save" class="mdc-top-app-bar__action-item--unbounded" aria-label="save">save</button>
                            </section>
                        </div>
                    </header>
                    <div class="mdc-dialog__content" id="create-storage-content">
                        <form class="full-width-form" @submit="createLocation" v-if="dialog.isOpen">
                            <TextField v-model="name" placeholder="Name" required type="text" field-id="name"/>
                            <ToggleField v-model="notification" placeholder="Enable notification" field-id="notification"/>
                            <button type="submit" id="save-button" style="visibility: hidden">save</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mdc-dialog__scrim"></div>
        </div>
    </div>
</template>

<script>
  import { MDCDialog } from '@material/dialog';
  import { addLocations } from '../../services/firebase';

  import TextField from "../shared/TextField.vue";
  import ToggleField from "../shared/ToggleField.vue";

  export default {
    name: "CreateLocation",
    components: {
      TextField,
      ToggleField
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      onClose: Function,
    },
    data() {
      return {
        dialog: MDCDialog,
        name: undefined,
        notification: true,
      }
    },
    mounted() {
      this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    },
    methods: {
      open() {
        this.dialog.open();
      },
      close() {
        this.name = undefined;
        this.notification = true;
        this.dialog.close();
      },
      save() {
        document.querySelector('#save-button').click()
      },
      createLocation() {
        addLocations({ name: this.name, notification: this.notification });
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
