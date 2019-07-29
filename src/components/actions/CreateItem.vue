<template>
    <div>
        <div @click.stop="open">
            <slot></slot>
        </div>
        <div class="mdc-dialog mdc-dialog-full"
             :id="id"
             role="dialog"
             aria-modal="true"
             aria-labelledby="create item"
             aria-describedby="create item">
            <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                    <header class=" mdc-top-app-bar mdc-top-app-bar--short">
                        <div class="mdc-top-app-bar__row">
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                                <button type="button" @click="close" class="material-icons mdc-top-app-bar__navigation-icon--unbounded">arrow_back</button>
                                <span class="mdc-top-app-bar__title">{{ editMode ? 'Modifica' : 'Aggiungi'}}</span>
                            </section>
                            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                                <button type="button" @click="save" class="mdc-top-app-bar__action-item--unbounded" aria-label="save">salva</button>
                            </section>
                        </div>
                    </header>
                    <div class="mdc-dialog__content" id="create-storage-content">
                        <form class="full-width-form" @submit="createItem" v-if="dialog.isOpen">
                            <TextField v-model="name" placeholder="Nome" required type="text" field-id="name"/>
                            <TextAreaField v-model="description" placeholder="Descrizione" field-id="description" rows="3" />
                            <TextField v-model="amount" min="0" placeholder="Quantità" required type="number" field-id="amount"/>
                            <TextField v-model="due" placeholder="Scadenza" type="date" field-id="due"/>
                            <SelectField v-model="location" :options="locationOptions" placeholder="Sezione" required :disabled="disableLocation" field-id="location"/>
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
  import { addItemAction, editItemAction, moveItemAction } from '../../services/firebase';
  import EventBus from '../../services/event-bus';
  import { getAllLocationsAction } from '../../services/firebase';
  import { cleanObj } from '../utils/cleanObj';

  import TextField from "../shared/TextField.vue";
  import SelectField from "../shared/SelectField.vue";
  import TextAreaField from "../shared/TextAreaField.vue";

  export default {
    name: "CreateItem",
    components: {
      TextField,
      TextAreaField,
      SelectField,
    },
    props: {
      fromLocation: {
        type: Object,
        default: () => ({})
      },
      onClose: Function,
      editMode: Boolean,
      disableLocation: Boolean,
      editData: Object,
    },
    data() {
      let form = {
        name: undefined,
        description: undefined,
        amount: undefined,
        due:  undefined,
        location: this.fromLocation.id,
      };

      if (this.editMode) {
        form = { ...form, ...this.editData }
      }

      return {
        dialog: MDCDialog,
        id: uniqid(),
        locationOptions: [{}],
        ...form,
      }
    },
    mounted() {
      this.dialog = new MDCDialog(document.getElementById(this.id));
      getAllLocationsAction().then((locations) => {
        locations.docs.forEach((location) => {
          const loc = location.data();
          this.locationOptions.push({ id: location.id, name: loc.name })
        })
      });
    },
    methods: {
      open() {
        this.dialog.open();
      },
      close() {
        this.name = undefined;
        this.description = undefined;
        this.amount = undefined;
        this.due =  undefined;
        this.location = undefined;
        this.dialog.close();
      },
      closeAndReload() {
        EventBus.$emit('reloadItems', this.fromLocation.id);
        this.close();
      },
      save() {
        document.querySelector('#save-button').click();
      },
      createItem() {
        const item = cleanObj({
          name: this.name,
          description: this.description,
          amount: parseInt(this.amount),
          due: this.due,
          location: this.location,
        });
        if (this.editMode) {
          editItemAction(this.fromLocation.id, this.editData.itemId, item).then(() => {
            if (this.location !== this.fromLocation.id) {
              moveItemAction(this.fromLocation.id, this.location, this.editData.itemId, item).then(() => this.closeAndReload() )
            } else {
              this.closeAndReload()
            }
          });
        } else {
          addItemAction(this.location || this.fromLocation.id, item).then(() => this.closeAndReload());
        }
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
        text-align: left;
    }
</style>
