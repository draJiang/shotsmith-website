import type { MetadataRoute } from 'next';
import { galleryWorkflows } from '@/data/workflowGallery';
import { siteDetails } from '@/data/siteDetails';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/workflows', ...galleryWorkflows.map(({ slug }) => `/workflows/${slug}`)].map(path => ({
    url: new URL(path, siteDetails.siteUrl).toString(),
  }));
}
