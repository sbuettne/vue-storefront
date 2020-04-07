export const CoreMedia = {
  name: 'CoreMedia',
  computed: {
    debug (): string {
      return 'Store=' + this.$store;
    },
    allSites () {
      return this.$store.getters['coremedia/sites']
    },
    banner () {
      return this.$store.dispatch('coremedia/get');
    },
    content () {
      return this.$store.getters['coremedia/data']
    }
  },
  beforeMount () {
    console.log('CoreMedia#beforeMount');
    let cmSite = this.$route.query.cm_site;
    this.$store.dispatch('coremedia/get', {siteId: cmSite})
  }
};
