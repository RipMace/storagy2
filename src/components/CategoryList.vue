<template>
    <div class="categoryList">
        <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list">
            <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__graphic material-icons" aria-hidden="true">folder</span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">First-line text</span>
              <span class="mdc-list-item__secondary-text">Second-line text</span>
            </span>
            </li>
        </ul>
    </div>
</template>

<script>
  import { MDCList } from '@material/list';
  import { MDCRipple } from '@material/ripple';
  export default {
    name: "CategoryList",
    mounted() {
      const list = new MDCList(document.querySelector('.mdc-list'));
      const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    }
  }
</script>

<style scoped>
    .categoryList {
        margin-top: 35px;
        padding: 10px;
    }
    .mdc-list-item {
        border-radius: 8px;
    }
    .mdc-list--avatar-list .mdc-list-item__graphic {
        background-color: rgba(0,0,0,.3);
        color: #fff;
    }
</style>
