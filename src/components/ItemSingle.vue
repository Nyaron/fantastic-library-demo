<template>
  <div class="item-single" :class="{ 'item-oos': stock === 0 }" @dblclick="$router.push(`edit/${id}`)">
    <div>{{ type }}</div>
    <div>{{ name }}</div>
    <div>{{ stock }}</div>
    <button @click="updateStock" :disabled="stock === 0">Drink it!</button>
  </div>
</template>

<script>
export default {
  name: 'itemSingle',
  props: ['beerData'],
  data() {
    return {
      id: this.beerData.id,
      type: this.beerData.type,
      name: this.beerData.name,
      stock: this.beerData.quantity,
    }
  },
  methods: {
    updateStock: function () {
      const that = this
      let itemsList = JSON.parse(localStorage.getItem('itemlist'))
      itemsList = itemsList.map(item => {
        if (item.id === that.id && that.stock > 0) {
          that.stock = that.stock - 1
          item.quantity = item.quantity - 1;
        }
        return item
      })
      localStorage.setItem('itemlist', JSON.stringify(itemsList))
    },
  }
}
</script>