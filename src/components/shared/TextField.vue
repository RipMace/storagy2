<template>
    <div :id="fieldId + 'Field'" class="mdc-text-field mdc-text-field--outlined">
        <input :type="type" :required="required" v-model="inputVal" :id="fieldId" class="mdc-text-field__input">
        <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch">
                <label :for="fieldId" class="mdc-floating-label">{{placeholder}}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
        </div>
    </div>
</template>

<script>
  import { MDCTextField } from '@material/textfield';
  export default {
    name: "TextField",
    props: {
      value: String,
      fieldId: String,
      placeholder: String,
      type: String,
      required: Boolean,
    },
    data() {
      return { inputVal: this.value }
    },
    watch: {
      inputVal(val) {
        this.$emit('input', val);
      }
    },
    mounted() {
      const field = new MDCTextField(document.querySelector('#' + this.fieldId + 'Field'));
    }
  }
</script>

<style scoped>

</style>
