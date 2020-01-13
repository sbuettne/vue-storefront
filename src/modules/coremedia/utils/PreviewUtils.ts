// tslint:disable:no-console

const CAP_ID_PREFIX = 'coremedia:///cap/content/';
const ARTICLES_ID_PREFIX = 'coremedia:///article/';
const PAGES_ID_PREFIX = 'coremedia:///page/';
const MEDIA_ENDPOINT_PATTERN = new RegExp('^/caas/v[0-9]/media/');

/**
 * Generates the CoreMedia metadata JSON for Studio integration.
 *
 * @param contentId content id / string containing the id
 * @param propertyNames list of property names
 */
export const cmMetaData = (contentId: string, ...propertyNames) => {
  const metadata = [];

  if (contentId) {
    if (contentId.startsWith(CAP_ID_PREFIX) ||
      contentId.startsWith(ARTICLES_ID_PREFIX) ||
      contentId.startsWith(PAGES_ID_PREFIX)) {
      /*
      Examples:
        coremedia:///cap/content/1234
        coremedia:///article/~106636
        coremedia:///page/~106602
     */
      contentId = contentId.split('/')[contentId.startsWith(CAP_ID_PREFIX) ? 5 : 4];
      contentId = contentId.replace('~', '');
    }

    if (MEDIA_ENDPOINT_PATTERN.test(contentId)) {
      // Example "/caas/v1/media/106626/data/{cropName}/{width}"
      contentId = contentId.split('/')[4];
    }

    // Prepend 'content/' if missing
    if (!contentId.startsWith('content/')) {
      contentId = `content/${contentId}`;
    }

    metadata.push({'_': {'$Ref': contentId}});
  }

  if (propertyNames) {
    propertyNames.forEach((propertyName: string) => {
      metadata.push({ '_': `properties.${propertyName}` });
    });
  }

  return {'data-cm-metadata': JSON.stringify(metadata)};
};

export const cmPlacementMetaData = (placementName: string) => {
  const metadata = [
    {'_': `properties.placement-${placementName}`},
    {
      'placementRequest': [
        {'isInLayout': true, 'hasItems': true, 'placementName': placementName}
      ]
    }
  ];

  return {'className': 'clearfix', 'data-cm-metadata': JSON.stringify(metadata)};
};
