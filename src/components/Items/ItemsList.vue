<template>
    <div id="swipeWrapper" class="swipe-wrapper">
        <ul class="mdc-image-list-grid">
            <li class="mdc-image-list__item" tabindex="0" v-for="item in evaluatedItems">
                <div class="mdc-card item-card">
                    <div class="mdc-card__primary-action">
                        <div class="mdc-card__primary-action item-card__primary-action mdc-ripple-upgraded">
                            <div class="item-card__primary">
                                <h2 class="item-card__title mdc-typography mdc-typography--headline6">
                                    {{item.name}}
                                    <span class="amount">
                                    {{item.amount}}
                                </span>
                                </h2>
                                <h3 class="item-card__subtitle mdc-typography mdc-typography--subtitle2">
                                    Scadenza: {{moment(item.due).format('DD/MM/YYYY')}}{{showCategory ? ` - ${item.location}` : ''}}
                                </h3>
                            </div>
                            <div class="item-card__secondary mdc-typography mdc-typography--body2">
                                {{item.description}}
                            </div>
                        </div>
                    </div>
                    <div class="mdc-card__actions">
                        <div class="mdc-card__action-buttons">
                            <CreateItem :fromLocation="location" edit-mode :edit-data="item">
                                <button class="mdc-button mdc-card__action mdc-card__action--button">
                                    <span class="mdc-button__label">Modifica</span>
                                </button>
                            </CreateItem>
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
  import { editItemAction } from '../../services/firebase.js';

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
        this.editItem({ ...item, amount: item.amount + 1 })
      },
      decrementItem(item) {
        this.editItem({ ...item, amount: item.amount - 1 })
      },
      editItem(item) {
        const itemId = item.itemId;
        delete item.itemId;
        editItemAction(this.location.id, itemId, item).then(() => EventBus.$emit('reloadItems', this.location.id));
      }
    },
    computed: {
      evaluatedItems() {
       const sorting = { ...this.sort };
        const items = this.items
          .map((item) => ({ itemId: item.id, ...item.data() }))
          .filter((item) => item.name.includes(this.textFilter));
        if (Object.keys(sorting).length) {
          if (sorting.type === 'ASC') {
            return items.sort((a, b) => a[sorting.key] - b[sorting.key])
          }
          return items.sort((a, b) => a[sorting.key] - b[sorting.key]).reverse()
        }
        return items
      }
      // evaluatedItems() {
      //   const a = this.items.map((item) => ({ itemId: item.id, ...item.data() }));
      //   for(var i = 0; i< 100;++i){
      //     a.push(a[0]);
      //   }
      //   return a
      // }
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

    .item-card {
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
