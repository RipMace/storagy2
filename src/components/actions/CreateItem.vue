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
                            <TextAreaField v-model="desc" placeholder="Descrizione" field-id="desc" rows="3" />
                            <TextField v-model="amount" placeholder="Quantità" required type="number" field-id="amount"/>
                            <TextField v-model="due" placeholder="Scadenza" required type="date" field-id="due"/>
                            <SelectField v-model="location" :options="locationOptions" placeholder="Sezione" required field-id="location" v-if="editMode"/>
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
  import { addItemAction } from '../../services/firebase';
  import EventBus from '../../services/event-bus';
  import { getAllLocationsAction } from '../../services/firebase';

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
      locationId: {
        type: String,
      },
      onClose: Function,
      editMode: Boolean,
      editData: Object,
    },
    data() {
      let form = {
        name: undefined,
        desc: undefined,
        amount: undefined,
        due:  undefined,
      };

      if (this.editMode) {
        form = { ...form, ...this.editData }
      }

      return {
        dialog: MDCDialog,
        id: uniqid(),
        locationOptions: [],
        ...form,
      }
    },
    mounted() {
      this.dialog = new MDCDialog(document.getElementById(this.id));
      if (this.editMode) {
        getAllLocationsAction().then((locations) => {
          locations.forEach((location) => {
            const loc = location.data();
            this.locationOptions.push({ id: loc.id, name: loc.name })
          })
        });
      }
    },
    methods: {
      open() {
        this.dialog.open();
      },
      close() {
        EventBus.$emit('reloadItems', this.locationId);
        this.dialog.close();
      },
      save() {
        document.querySelector('#save-button').click();
      },
      createItem() {
        const item = {
          name: this.name,
          description: this.desc,
          amount: this.amount,
          due: this.due,
        };
        addItemAction(this.locationId, item).then(() => this.close());
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
