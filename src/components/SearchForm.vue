<template>
  <div class="search-form">
    <input type="text" placeholder="Search" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'searchForm',
}
</script>
