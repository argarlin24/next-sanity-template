import { createClient } from 'next-sanity';

const fetchRedirects = async () => {
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET_PROD,
      useCdn: true,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_VERSION,
    });

    const query = '*[_type == "redirect"]';
    const documents = await client.fetch(query);

    return documents;
  } catch (error) {
    throw new Error('Error fetching redirects:', error);
  }
};

export default fetchRedirects;
