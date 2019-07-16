<template>
    <div id="swipeWrapper" class="swipe-wrapper">
        <ul class="mdc-image-list-grid">
            <li class="mdc-image-list__item" tabindex="0" v-for="item in evaluatedItems">
                <div class="mdc-card item-card">
                    <div :class="['mdc-card__primary-action', 'mdc-ripple-upgraded', { 'on-due-date': item.due && checkDueDate(item.due) }]">
                        <div class="item-card__primary">
                            <h2 class="item-card__title mdc-typography mdc-typography--headline6">
                                {{item.name}}
                                <span class="amount">
                                {{item.amount}}
                            </span>
                            </h2>
                            <h3 class="item-card__subtitle mdc-typography mdc-typography--subtitle2">
                                {{item.due ? `Scadenza: ${moment(item.due).format('DD/MM/YYYY')}` : ''}}
                                <br>
                                {{showCategory ? `Sezione: ${item.locationName}` : ''}}
                            </h3>
                        </div>
                        <div class="item-card__secondary mdc-typography mdc-typography--body2">
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
                            <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                               title="Delete"
                               @click="deleteItem(item)">
                                delete
                            </a>
                        </div>
                        <div class="mdc-card__action-icons">
                            <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon add"
                               title="Add"
                               @click="incrementItem(item)">
                                add
                            </a>
                            <a :class="['material-icons mdc-icon-button mdc-card__action mdc-card__action--icon remove', { 'remove-disabled' : item.amount === 0 }]"
                               title="Remove"
                               @click="decrementItem(item)">
                                remove
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  import { MDCRipple } from '@material/ripple';
  import Hammer from 'hammerjs';
  import moment from 'moment';
  import CreateItem from '../actions/CreateItem.vue';
  import EventBus from '../../services/event-bus';
  import { editItemAction, deleteItemAction } from '../../services/firebase';
  import { checkDueDate } from '../utils/checkDue';
  import { stringSort, dateSort, numberSort } from '../utils/sorter';

  export default {
    name: "ItemsList",
    props: {
      items: Array,
      showCategory: Boolean,
      location: Object,
      textFilter: String,
      sort: Object,
    },
    components: {
      CreateItem
    },
    mounted() {
      const ripples = [].map.call(document.querySelectorAll('.mdc-button'), function(el) {
        return new MDCRipple(el);
      });
      const iconButtonRipple = [].map.call(document.querySelectorAll('.mdc-icon-button'), function(el) {
        const iconButtonRipple = new MDCRipple(el);
        iconButtonRipple.unbounded = true;
        return iconButtonRipple
      });
      const swipeWrapper = document.getElementById('swipeWrapper');
      const hammertime = Hammer(swipeWrapper).on('swipe', () => this.$router.push({ name: 'Category' }));
      hammertime.get('swipe').set({ direction: Hammer.DIRECTION_RIGHT });
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
      }
    },
    computed: {
      evaluatedItems() {
       const sorting = { ...this.sort };
        const items = this.items
          .filter((item) => item.name.includes(this.textFilter));
        if (Object.keys(sorting).length) {
          if (sorting.type === 'String') {
            return stringSort(items, sorting.key)
          }
          if (sorting.type === 'Date') {
            return dateSort(items, sorting.key);
          }
          if (sorting.type === 'Number') {
            return numberSort(items, sorting.key);
          }
        }
        return items
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "~@material/image-list/mdc-image-list";
    @import "~@material/icon-button/mdc-icon-button";
    @import "../../variables.scss";

    .swipe-wrapper {
        height: 95vh;
        width: 100%;
    }

    .mdc-image-list-grid {
        padding: 60px 10px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
        grid-gap: 16px;
    }

    .on-due-date {
        background: $mdc-theme-background;
    }

    .item-card {
        .mdc-card__primary-action {
            min-height: 115px;

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
