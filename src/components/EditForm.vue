<template>
  <div class="edit-form">
    <button @click="saveChanges">Save changes</button>
    <button @click="$router.push('/')">Cancel</button>
    <edit-fields
      v-for="(fields, index) in fieldsCollection"
      :key="index"
      :data="fields.data"
      :ref="fields.ref"
      @change="handleChange(fields.ref, $event)"
    >
    </edit-fields>
    <button @click="addFields">Add one more</button>
  </div>
</template>

<script>
import EditFields from '@/components/EditFields'

export default {
  name: 'editForm',
  components: {
    EditFields,
  },
  data() {
    return {
      fieldsCollection: [],
    }
  },
  mounted() {
    let editData = {}

    if (this.$route.params.id) {
      const currentList = JSON.parse(localStorage.getItem('itemlist'))
      editData = currentList.find(elem => elem.id === this.$route.params.id)
    }

    this.fieldsCollection.push({
      ref: 'fieldsRef0',
      data: editData,
    })
  },
  methods: {
    addFields: function() {
      this.fieldsCollection.push({
        ref: `fieldsRef${this.fieldsCollection.length}`,
        data: {}
      })
    },
    handleChange: function (ref, data) {
      const target = this.fieldsCollection.findIndex(elem => elem.ref === ref)
      this.fieldsCollection[target].data = data
    },
    saveChanges: function() {
      // Mock MongoDB's _id, source: https://stackoverflow.com/a/46609126
      const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
      rnd(Date.now()/1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random()*16))
      let itemsList = JSON.parse(localStorage.getItem('itemlist'))

      this.fieldsCollection.forEach(fields => {
        const current = fields.data

        if (typeof current.id === 'undefined') {
          itemsList.push({
            id: ObjectId(),
            type: current.type,
            name: current.name,
            quantity: parseInt(current.stock, 10),
          })
        } else {
          itemsList = itemsList.map(item => {
            if (item.id === current.id) {
              item.type = current.type
              item.name = current.name
              item.quantity = parseInt(current.stock, 10)
            }
            return item
          })
        }
      })
      localStorage.setItem('itemlist', JSON.stringify(itemsList))
      this.$router.push('/')
    },
  },
}
</script>