<template>
    <div :id="fieldId + 'Field'" class="mdc-text-field mdc-text-field--textarea">
        <textarea
            id="textarea"
            :required="required"
            :value="value"
            :id="fieldId"
            :rows="rows"
            :cols="cols"
            @change="$emit('input', $event.target.value)"
            class="mdc-text-field__input">
        </textarea>
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
    name: "TextAreaField",
    props: {
      value: String,
      fieldId: String,
      placeholder: String,
      rows: String,
      cols: String,
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
