const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
};

export const PROJECT_ID = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
);

export const DATASET_PROD = assertValue(
  process.env.SANITY_STUDIO_DATASET_PROD,
  'Missing environment variable: SANITY_STUDIO_DATASET_PROD',
);

export const STUDIO_API_VERSION = process.env.SANITY_STUDIO_API_VERSION || new Date().toISOString().split('T')[0];

/**
 * Defines the presentation paths for different document types.
 */
export const PRESENTATION_PATHS = {
  page: '',
  blog: '/blog',
} as const;

export const PAGE_TYPES = ['page', 'blog'] as const;

export const REFERENCEABLE_DOCUMENT_TYPES = [...PAGE_TYPES];
