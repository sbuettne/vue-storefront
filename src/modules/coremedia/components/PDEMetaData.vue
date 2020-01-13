<template>
  <!-- COREMEDIA PDE meta data -->
  <div :data-cm-metadata="renderMetaData" />
</template>

<script>
import config from 'config'

export default {
  name: 'PDEMetaData',
  computed: {
    renderMetaData: function () {
      return JSON.stringify(config.coremedia.pde.metadata);
    }
  }
}
</script>
