<template>
    <div :id="fieldId + 'Field'" class="mdc-select mdc-select--outlined">
        <i class="mdc-select__dropdown-icon"></i>
        <select
            :required="required"
            :id="fieldId"
            class="mdc-select__native-control"
            @change="$emit('input', $event.target.value)">
            <option v-for="opt in options" :value="opt.id" :label="opt.name" :selected="value === opt.id">
               {{opt.id}}
            </option>
        </select>
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
  import { MDCSelect } from '@material/select';
  export default {
    name: "SelectField",
    props: {
      options: Array,
      value: String,
      fieldId: String,
      placeholder: String,
      required: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      const field = new MDCSelect(document.querySelector('#' + this.fieldId + 'Field'));
    }
  }
</script>
