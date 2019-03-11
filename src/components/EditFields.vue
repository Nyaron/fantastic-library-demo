<template>
  <div class="edit-fields">
    <input type="hidden" v-model="id">
    <div class="form-group">
      <input type="radio" v-model="type" value="Bottle"> Bottle
      <input type="radio" v-model="type" value="Can"> Can
      <input type="radio" v-model="type" value="Other"> Other
    </div>
    <div class="form-group">
      <input type="text" v-model="name">
    </div>
    <div class="form-group">
      <input type="number" min="0" v-model="stock">
    </div>
  </div>
</template>

<script>
export default {
  name: 'editFields',
  props: ['data'],
  data() {
    if (this.data) {
      return {
        id: this.data.id,
        type: this.data.type,
        name: this.data.name,
        stock: this.data.quantity,
      }
    }

    return {
      id: null,
      type: null,
      name: '',
      stock: 1,
    }
  },
  watch: {
    type: function () {
      this.$emit('change', this.$data)
    },
    name: function () {
      this.$emit('change', this.$data)
    },
    stock: function () {
      this.$emit('change', this.$data)
    },
  },
}
</script>