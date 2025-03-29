import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  schema?: Record<string, any>;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/og-image.png', // Default OG image
  keywords = [],
  schema,
}: SEOProps) => {
  // Base URL - replace with actual domain in production
  const baseUrl = 'https://pipewarden.io';
  const url = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  
  // Default keywords relevant to CI/CD security
  const defaultKeywords = [
    'ci/cd security',
    'pipeline security',
    'secure devsecops',
    'secure ci/cd pipeline',
    'devsecops automation',
    'ci/cd vulnerability scanning',
    'pipeline security tool',
    'secure software delivery',
    'supply chain security',
    'automated security scanning',
    'continuous security',
    'security as code',
  ];

  // Combine default keywords with any page-specific keywords
  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Structured Data for Google */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
