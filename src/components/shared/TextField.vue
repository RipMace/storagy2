<template>
    <div :id="fieldId + 'Field'" class="mdc-text-field mdc-text-field--outlined">
        <input
            :type="type"
            :required="required"
            :value="value"
            :id="fieldId"
            class="mdc-text-field__input"
            @change="$emit('input', $event.target.value)"
        >
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
      type: {
        type: String,
        default: 'text'
      },
      required: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      const field = new MDCTextField(document.querySelector('#' + this.fieldId + 'Field'));
    }
  }
</script>
