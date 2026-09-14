import type {MetadataRoute} from 'next';
import {places} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pages = ['', '/cities/seoul', '/start', '/essentials', '/sources'];
  return [
    ...pages.map((path) => ({url: `${base}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.8})),
    ...places.map((place) => ({url: `${base}/places/${place.id}`, changeFrequency: 'monthly' as const, priority: 0.7})),
  ];
}
