const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
};

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_STUDIO_API_VERSION || new Date().toISOString().split('T')[0];

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET_PROD,
  'Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_DATASET_PROD',
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID',
);
