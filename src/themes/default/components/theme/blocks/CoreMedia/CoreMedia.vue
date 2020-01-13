<template>
  <div class="cm-content">
    <div v-if="getPlacement('main')" :data-cm-metadata="renderPlacementMetadata('main')">
      <div v-for="(item, index) in getPlacement('main').items" :key="index" :data-cm-metadata="renderContentMetadata(item.link.id)">
        <h2>{{ item.teaserTitle }}</h2>
        <div v-html="item.teaserText" />
        <img v-if="item.picture" :src="calculateImageUri(item.picture.uriTemplate, 'landscape_ratio16x9', 1024)" :data-cm-metadata="renderContentMetadata(item.picture.link.id)">
      </div>
    </div>

    <!--<div v-for="row in content.page.grid.rows" v-if="content.page && content.page.grid">
      <div v-for="placement in row.placements" v-if="placement.name === 'main'">
        <div v-for="item in placement.items">
          <h2>{{item.teaserTitle}}</h2>
          <div v-html="item.teaserText"></div>
          <img :src="calculateImageUri(item.picture.uriTemplate, 'landscape_ratio16x9', 1024)"/>
        </div>
      </div>
    </div>-->

    <!--<ul>
      <li v-for="site in content.sites">
        <span class="site-name">{{ site.__typename }} -> {{ site.name }}</span> <span class="site-locale">({{ site.locale }})</span>
      </li>
    </ul>-->
  </div>
</template>

<script>
import config from 'config'
import {CoreMedia} from 'src/modules/coremedia/components/CoreMedia'

export default {
  name: 'CoreMedia',
  mixins: [CoreMedia],
  methods: {
    calculateImageUri: function (uriTemplate, cropName, width) {
      return config.coremedia.media.baseUrl + uriTemplate.replace('{cropName}', cropName).replace('{width}', width);
    },
    getPlacement: function (placementName) {
      let placementMatch;
      if (this.content.page && this.content.page.grid) {
        let grid = this.content.page.grid;
        grid.rows.forEach((row) => {
          if (row && row.placements) {
            row.placements.forEach((placement) => {
              if (placement.name === placementName) {
                placementMatch = placement;
              }
            })
          }
        });
      }
      return placementMatch;
    },
    renderContentMetadata: function (contentId) {
      let metadata = [];

      metadata.push({'_': {'$Ref': `content/${contentId}`}});

      return JSON.stringify(metadata);
    },
    renderPlacementMetadata: function (placementName) {
      const metadata = [
        {'_': `properties.placement-${placementName}`},
        {
          'placementRequest': [
            {'isInLayout': true, 'hasItems': true, 'placementName': placementName}
          ]
        }
      ];
      return JSON.stringify(metadata);
    }
  }

}
</script>

<style lang='scss' scoped>

  /*
  .cm-content {
    border: 2px solid #672779;
    position: relative;

    &::before {
      padding: 2px 10px;
      content: "CoreMedia";
      font-size: 10px;
      position: absolute;
      top: -15px;
      left: 0;
      background: #672779;
      color: white;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      z-index: 10;
    }
  }
  */

  .site-name {
    font-weight: bold;
  }

  .site-locale {
    font-weight: 300;
    font-style: normal;
    color: #afafaf;
  }

</style>
