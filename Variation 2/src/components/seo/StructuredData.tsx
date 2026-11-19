import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getActiveCatalogue } from '../../data/catalogue';
import { siteConfig } from '../../config/siteConfig';
import type { CanonicalProgramme } from '../../types/catalogue';

interface StructuredDataProps {
  programme?: CanonicalProgramme;
  pageTitle?: string;
  pageDescription?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  programme,
  pageTitle,
  pageDescription,
}) => {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitle
      ? `${pageTitle} | ${siteConfig.brandDisplay} Sri Lanka`
      : `${siteConfig.brandDisplay} Sri Lanka | Foundation, Diploma & Degree Programmes`;

    if (pageDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription, location.pathname]);

  const canonicalUrl = `${siteConfig.websiteUrl}${
    location.pathname === '/' ? '' : location.pathname
  }`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteConfig.websiteUrl}/#institution`,
    name: siteConfig.brandDisplay,
    alternateName: siteConfig.legalName,
    url: siteConfig.websiteUrl,
    logo: `${siteConfig.websiteUrl}/assets/biet-logo.png`,
    description:
      'Higher education provider offering foundation, diploma and degree-pathway programmes in business management, computing, engineering, English and psychology in Sri Lanka.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.campuses[0].address,
      addressCountry: 'LK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'admissions',
      telephone: siteConfig.telephone,
      email: siteConfig.email,
      areaServed: 'LK',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteConfig.brandDisplay,
        item: `${siteConfig.websiteUrl}/`,
      },
      ...(location.pathname !== '/'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: pageTitle || location.pathname.replace('/', ''),
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  const courseSchema =
    programme && programme.availability !== 'archived-unavailable'
      ? {
          '@context': 'https://schema.org',
          '@type': 'EducationalOccupationalProgram',
          '@id': `${siteConfig.websiteUrl}/programmes/${programme.slug}#programme`,
          name: programme.title,
          description: programme.shortDescription,
          provider: {
            '@type': 'EducationalOrganization',
            name: siteConfig.brandDisplay,
            sameAs: siteConfig.websiteUrl,
          },
          ...(programme.duration ? { timeToComplete: programme.duration } : {}),
          ...(programme.deliveryModes.length > 0
            ? { educationalProgramMode: programme.deliveryModes.join(', ') }
            : {}),
        }
      : null;

  const catalogueSchema =
    location.pathname === '/programmes'
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${siteConfig.brandDisplay} Programme Directory`,
          itemListElement: getActiveCatalogue().map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${siteConfig.websiteUrl}/programmes/${p.slug}`,
            name: p.title,
          })),
        }
      : null;

  const schemas = [
    organizationSchema,
    breadcrumbSchema,
    ...(courseSchema ? [courseSchema] : []),
    ...(catalogueSchema ? [catalogueSchema] : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
};
