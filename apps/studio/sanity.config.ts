import { assist } from '@sanity/assist';
import { embeddingsIndexDashboard } from '@sanity/embeddings-index-ui';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { defineDocuments, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { media, mediaAssetSource } from 'sanity-plugin-media';
import { ptString } from 'sanity-plugin-pt-string';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { singletonTools } from 'sanity-plugin-singleton-tools';

import schemas from '@/schemas';

import { DATASET_PROD, PROJECT_ID, STUDIO_API_VERSION } from '@/lib/constants';
import { locationResolver } from '@/lib/locationResolver';
import { resolveDocForRoute } from '@/lib/resolveRouteForDoc';
import structure from '@/lib/structure';

import type { SanityFormConfig } from 'sanity';

import '@/styles/studioStyles.css';

const plugins = [
  structureTool({
    structure,
  }),
  presentationTool({
    previewUrl: {
      origin: process.env.NODE_ENV === 'production' ? 'https://example.com' : 'http://localhost:3000',
      previewMode: {
        enable: '/api/draft',
        disable: '/api/disable-draft',
      },
    },
    resolve: {
      mainDocuments: defineDocuments([
        {
          route: '/(.*)',
          resolve: resolveDocForRoute,
        },
      ]),
      locations: locationResolver,
    },
  }),
  media(),
  visionTool({ defaultApiVersion: STUDIO_API_VERSION }),
  assist(),
  simplerColorInput(),
  iconPicker(),
  embeddingsIndexDashboard(),
  ptString(),
  singletonTools(),
  table(),
];

const schema = { types: schemas };

const form: SanityFormConfig = {
  file: {
    assetSources: previousAssetSources => previousAssetSources.filter(assetSource => assetSource !== mediaAssetSource),
  },
  image: {
    assetSources: [mediaAssetSource],
  },
};

const commonConfig = {
  projectId: PROJECT_ID,
  plugins,
  schema,
  form,
};

const prodConfig = defineConfig({
  title: 'Production',
  name: 'production',
  dataset: DATASET_PROD,
  basePath: '/production',
  ...commonConfig,
});

const configs = [prodConfig];

export default configs;
