import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ slug: string }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?.slug) {
      return new Response('Missing slug', { status: 400 });
    }

    revalidatePath(body?.slug);

    return new Response('Revalidated successfully', { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response('Failed to revalidate', { status: 500 });
  }
}
