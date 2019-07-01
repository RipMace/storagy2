<template>
    <ul class="mdc-image-list my-image-list my-masonry-image-list">
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
                                {{item.due}}{{showCategory ? ` - ${item.location}` : ''}}
                            </h3>
                        </div>
                        <div class="item-card__secondary mdc-typography mdc-typography--body2">
                            {{item.description}}
                        </div>
                    </div>
                </div>
                <div class="mdc-card__actions">
                    <div class="mdc-card__action-buttons">
                        <CreateItem>
                            <button class="mdc-button mdc-card__action mdc-card__action--button">
                                <span class="mdc-button__label">Modifica</span>
                            </button>
                        </CreateItem>
                    </div>
                    <div class="mdc-card__action-icons">
                        <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon add" title="Add">add</a>
                        <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon remove" title="Remove">remove</a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  import { MDCRipple } from '@material/ripple';
  import CreateItem from '../actions/CreateItem.vue';

  export default {
    name: "ItemsList",
    props: {
      items: Array,
      showCategory: Boolean,
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
    },
    computed: {
      evaluatedItems () {
        return this.items.map((item) => ({ id: item.id, ...item.data() }));
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "~@material/image-list/mdc-image-list";
    @import "~@material/icon-button/mdc-icon-button";
    @import "../../variables.scss";

    .my-masonry-image-list {
        @include mdc-image-list-masonry-columns(5);
    }

    .item-card {
        margin: 15px;
        width: 350px;

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
        }
    }
</style>
