import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Shawahiq Real Estate';
const DEFAULT_DESCRIPTION =
  "Explore off-plan and ready properties across Dubai's most sought-after communities, with full transparency on pricing, plans, and progress.";
const SITE_URL = 'https://shawahiqrealestate.ae'; // update once you have your real deployed domain
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`; // add a real 1200x630 image to frontend/public later

/**
 * Shared SEO component — drop this at the top of any page.
 *
 * <Seo title="Projects" description="Browse all our current developments." />
 * <Seo title={project.name} description={project.description} image={project.images?.[0]} />
 */
const Seo = ({ title, description, image, url, noindex = false }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Dubai Real Estate`;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaImage = image || DEFAULT_IMAGE;
  const metaUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <link rel="canonical" href={metaUrl} />
    </Helmet>
  );
};

export default Seo;