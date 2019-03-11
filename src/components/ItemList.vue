<template>
  <div class="item-list">
    <search-form @input="filterItems"></search-form>
    <button @click="$router.push('edit')">Add a beer</button>
    <div class="item-list-wrapper" v-if="isLoaded">
      <item-single
        v-for="beer in filteredList"
        :key="beer.id"
        :beer-data="beer"
      >
      </item-single>
    </div>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm'
import ItemSingle from '@/components/ItemSingle'

export default {
  name: 'itemList',
  components: {
    SearchForm,
    ItemSingle,
  },
  data() {
    return {
      isLoaded: false,
      filteredList: [],
    }
  },
  mounted() {
    const currentList = localStorage.getItem('itemlist')
    if (currentList !== null) {
      this.isLoaded = true
      this.filteredList = JSON.parse(currentList)
    } else {
      fetch('dummy.json')
        .then(response => response.json())
        .then(data => {
          this.isLoaded = true
          this.filteredList = data
          localStorage.setItem('itemlist', JSON.stringify(data))
        })
    }
  },
  methods: {
    filterItems: function (searchTerm) {
      let list = JSON.parse(localStorage.getItem('itemlist'))
      if (searchTerm.length > 2) {
        list = list.filter(item => {
          return item.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1
        })
      }
      this.filteredList = list
    }
  },
}
</script>