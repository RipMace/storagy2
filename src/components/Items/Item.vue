<template>
    <div :id="id" class="mdc-card item-card" @click="triggerCollapse">
        <div :class="['mdc-card__primary-action', 'mdc-ripple-upgraded', { 'on-due-date': item.due && checkDueDate(item.due), 'no-amount': item.amount === 0 }]">
            <div class="item-card__primary">
                <h2 class="item-card__title mdc-typography mdc-typography--headline6">
                    {{item.name}}
                    <span class="amount">
                        {{item.amount}}
                    </span>
                </h2>
                <h3 v-if="collapse" class="item-card__subtitle mdc-typography mdc-typography--subtitle2">
                    {{item.due ? `Scadenza: ${moment(item.due).format('DD/MM/YYYY')}` : ''}}
                    <br>
                    {{showCategory ? `Sezione: ${item.locationName}` : ''}}
                </h3>
            </div>
            <div v-if="collapse" class="item-card__secondary mdc-typography mdc-typography--body2">
                {{item.description}}
            </div>
        </div>
        <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
                <CreateItem :fromLocation="location" edit-mode :edit-data="item">
                    <button class="mdc-button mdc-card__action mdc-card__action--button">
                        <span class="mdc-button__label">Modifica</span>
                    </button>
                </CreateItem>
                <Delete :name="item.name" :onDelete="() => deleteItem(item)" />
            </div>
            <div class="mdc-card__action-icons">
                <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon add"
                   title="Add"
                   @click.stop="incrementItem(item)">
                    add
                </a>
                <a :class="['material-icons mdc-icon-button mdc-card__action mdc-card__action--icon remove', { 'remove-disabled' : item.amount === 0 }]"
                   title="Remove"
                   @click.stop="decrementItem(item)">
                    remove
                </a>
            </div>
        </div>
    </div>
</template>

<script>
  import { MDCRipple } from '@material/ripple';
  import moment from 'moment';
  import uniqid from 'uniqid';
  import CreateItem from '../actions/CreateItem.vue';
  import Delete from '../actions/Delete.vue';
  import EventBus from '../../services/event-bus';
  import { editItemAction, deleteItemAction } from '../../services/firebase';
  import { checkDueDate } from '../utils/checkDue';

  export default {
    name: "Item",
    props: {
      item: Object,
      showCategory: Boolean,
      location: Object,
    },
    components: {
      Delete,
      CreateItem
    },
    data() {
      return {
        id: uniqid(),
        collapse: false,
      }
    },
    mounted() {
      const ripples = [].map.call(document.querySelectorAll(`#${this.id}.mdc-button`), function(el) {
        return new MDCRipple(el);
      });
      const iconButtonRipple = [].map.call(document.querySelectorAll(`#${this.id}.mdc-icon-button`), function(el) {
        const iconButtonRipple = new MDCRipple(el);
        iconButtonRipple.unbounded = true;
        return iconButtonRipple
      });
    },
    methods: {
      moment(date) {
        return moment(date);
      },
      incrementItem(item) {
        this.editItem({ ...item, amount: Number(item.amount) + 1 })
      },
      decrementItem(item) {
        this.editItem({ ...item, amount: Number(item.amount) - 1 })
      },
      deleteItem(item) {
        const itemId = item.itemId;
        const locationId = item.location || this.location.id;
        deleteItemAction(locationId, itemId).then(() => EventBus.$emit('reloadItems', locationId));
      },
      editItem(item) {
        const itemId = item.itemId;
        const locationId = item.location || this.location.id;
        delete item.itemId;
        delete item.locationName;
        editItemAction(locationId, itemId, item).then(() => EventBus.$emit('reloadItems', locationId));
      },
      checkDueDate(date) {
        return checkDueDate(date)
      },
      triggerCollapse() {
        this.collapse = !this.collapse;
      }
    },
  }
</script>

<style scoped lang="scss">
    @import "~@material/image-list/mdc-image-list";
    @import "~@material/icon-button/mdc-icon-button";
    @import "../../variables.scss";

    .on-due-date {
        background: $mdc-theme-background;
    }

    .no-amount {
        background: $dangerColor;
        color: $white;

        .item-card__subtitle {
            color: $white !important;
        }

        .item-card__secondary {
            color: $white !important;
        }
    }

    .item-card {
        .mdc-card__primary-action {
            .item-card__primary {
                padding: 1rem;

                .item-card__title {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .amount {
                        margin-left: 10px;
                    }
                }
                .item-card__subtitle {
                    margin: 0;
                    color: $blackLighter;
                }

            }

            .item-card__secondary {
                padding: 0 1rem 8px;
                color: $greyDarker;
            }
        }

        .mdc-card__action-icons {
            .add {
                @include mdc-icon-button-ink-color($successColor)
            }
            .remove {
                @include mdc-icon-button-ink-color($dangerColor)
            }
            .remove-disabled {
                @include mdc-icon-button-ink-color($greyDarker);
                cursor: not-allowed;
                pointer-events: none;
            }
        }
    }
</style>
