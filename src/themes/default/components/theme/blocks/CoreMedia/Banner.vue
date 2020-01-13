<template>
  <div class="cm-banner">
    <h1>Banner here</h1>
    {{ banner }}
  </div>
</template>

<script>
import {CoreMedia} from 'src/modules/coremedia/components/CoreMedia'
export default {
  name: 'CoreMedia',
  mixins: [CoreMedia]
}
</script>

<style>
  .cm-banner {
    margin: 20px;
  }
</style>
