import { useEffect } from 'react';

interface SEOProps {
  activePage: string;
  subId?: string;
}

export default function SEO({ activePage, subId }: SEOProps) {
  useEffect(() => {
    let title = 'Perkins Publishers Columbia | #1 Ghostwriting & Bestseller Book Publishing';
    let description = 'Transform your manuscript into a global bestseller with Perkins Publishers, South Carolina\'s premier publishing agency. Elite professional book formatting, cover design, NYT-grade ghostwriting, global distribution, and strategic local marketing.';
    let canonical = 'https://perkinspublisher.com/';

    // Dynamic metadata depending on page
    if (activePage === 'home') {
      title = 'Perkins Publishers Columbia | #1 Ghostwriting & Bestseller Book Publishing';
      description = 'Turn your professional expertise into a published authority book with South Carolina\'s top-rated self-publishing company. Premium professional book design, NYT ghostwriting, and global retail distribution.';
      canonical = 'https://perkinspublisher.com/';
    } else if (activePage.startsWith('service-')) {
      const serviceName = activePage.replace('service-', '').replace('-', ' ');
      const formattedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      title = `Professional ${formattedName} Services in South Carolina | Perkins Publishers`;
      description = `Develop, design, and publish your book with South Carolina's leading professional ${formattedName} services based out of Columbia, SC. Elite literary standards with 100% author rights.`;
      canonical = `https://perkinspublisher.com/services/${activePage.replace('service-', '')}`;
    } else if (activePage.startsWith('industry-')) {
      const industryName = activePage.replace('industry-', '').replace('-', ' ');
      const formattedName = industryName.charAt(0).toUpperCase() + industryName.slice(1);
      title = `Book Publishing in South Carolina for ${formattedName} | Perkins Publishers SC`;
      description = `Launch your professional authority and sign high-ticket clients with South Carolina's top-tier book publishing solutions custom engineered for elite ${formattedName}.`;
      canonical = `https://perkinspublisher.com/industries/${activePage.replace('industry-', '')}`;
    } else if (activePage === 'knowledge-hub' || activePage.startsWith('hub-')) {
      title = 'South Carolina Publishing Knowledge Hub | Self-Publishing Guides & Tutorials';
      description = 'Master KDP metadata, professional editing frameworks, ghostwriting contracts, and expert book marketing strategies with South Carolina\'s elite publisher guides.';
      canonical = 'https://perkinspublisher.com/knowledge-hub';
    } else if (activePage === 'calculator') {
      title = 'South Carolina Self-Publishing Cost Calculator | Transparent Flat-Rate Pricing';
      description = 'Calculate your book production investments instantly. Customize editing, formatting, cover design, and bestseller marketing services. Honest, flat-rate pricing.';
      canonical = 'https://perkinspublisher.com/calculator';
    } else if (activePage === 'reviews') {
      title = 'Verified SC Author Success Reviews & Bestseller Chronicles | Perkins';
      description = 'See verified case studies, reviews, and video success stories from prominent South Carolina entrepreneurs, CEOs, and novelists who published with Perkins Publishers.';
      canonical = 'https://perkinspublisher.com/reviews';
    } else if (activePage === 'seo-scorecard') {
      title = 'Book Launch Audit & Amazon SEO Scorecard South Carolina | Perkins Publishers';
      description = 'Audit your book proposal, Amazon keyword competitiveness, and local/national SEO indexing triggers. Claim your actionable publication roadmap for maximum visibility.';
      canonical = 'https://perkinspublisher.com/scorecard';
    } else if (activePage === 'privacy') {
      title = 'Privacy Policy | Perkins Publishers South Carolina';
      description = 'Read the Perkins Publishers Privacy Policy regarding secure data transmission, secure lead forms, and compliant communication standards.';
      canonical = 'https://perkinspublisher.com/#/privacy';
    } else if (activePage === 'terms') {
      title = 'Terms of Service & 100% Royalty Protection | Perkins Publishers';
      description = 'Review our publishing terms, author intellectual rights protection, non-disclosure confidentiality covenants, and flat-rate services rules.';
      canonical = 'https://perkinspublisher.com/#/terms';
    }

    // Update document head
    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonical);
      document.head.appendChild(canonicalLink);
    }

    // Dynamic JSON-LD Schema generation based on active page
    const existingScript = document.getElementById('dynamic-seo-schema');
    if (existingScript) existingScript.remove();

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://perkinspublisher.com/#organization',
        'name': 'Perkins Publishers',
        'alternateName': 'Perkins Book Publishing Services South Carolina',
        'url': 'https://perkinspublisher.com/',
        'logo': 'https://perkinspublisher.com/logo.png',
        'image': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        'description': 'Perkins Publishers matches elite business owners, entrepreneurs, and professional authors with veteran editors and bestseller book marketing campaigns based out of Columbia, South Carolina.',
        'hasMap': 'https://maps.google.com/?q=1201+Main+St+Columbia+SC+29201',
        'areaServed': [
          'Columbia',
          'Charleston',
          'Greenville',
          'Spartanburg',
          'Myrtle Beach',
          'Rock Hill',
          'South Carolina',
          'North Carolina',
          'Georgia',
          'United States'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1-803-346-3495',
          'contactType': 'customer service',
          'areaServed': 'US',
          'availableLanguage': ['English', 'Spanish']
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1201 Main St',
          'addressLocality': 'Columbia',
          'addressRegion': 'SC',
          'postalCode': '29201',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '34.0007',
          'longitude': '-81.0348'
        },
        'telephone': '+1-803-346-3495',
        'priceRange': '$$$',
        'openingHours': 'Mo-Fr 09:00-18:00'
      }
    ];

    // Add Breadcrumb List Schema
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://perkinspublisher.com/'
        }
      ]
    };

    if (activePage !== 'home') {
      let pageLabel = activePage.toUpperCase();
      if (activePage.startsWith('service-')) {
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          'position': 2,
          'name': 'Services',
          'item': 'https://perkinspublisher.com/#services'
        });
        pageLabel = activePage.replace('service-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      } else if (activePage.startsWith('industry-')) {
        breadcrumbList.itemListElement.push({
          '@type': 'ListItem',
          'position': 2,
          'name': 'Industries',
          'item': 'https://perkinspublisher.com/'
        });
        pageLabel = activePage.replace('industry-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        'position': breadcrumbList.itemListElement.length + 1,
        'name': pageLabel,
        'item': canonical
      });
    }
    schemas.push(breadcrumbList);

    // If service page, add Service and Offer Schema
    if (activePage.startsWith('service-')) {
      const sId = activePage.replace('service-', '');
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `${sId.toUpperCase()} - Perkins Bestseller Publishing Program`,
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Perkins Publishers'
        },
        'description': description,
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'USD',
          'price': sId === 'ghostwriting' ? '4999' : sId === 'editing' ? '899' : '1499',
          'url': canonical
        }
      });
    }

    // FAQ schema if available
    if (activePage === 'home' || activePage === 'reviews') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How do royalties and book rights work with Perkins Publishers?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Unlike traditional publishing houses or high-fee vanity agencies, we believe authors should own their work. You retain 100% of your publishing rights, 100% of copyrights, and you keep 100% of all generated royalties from book sales. We never take a percentage from your retailer payouts.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the average timeline to get my book published?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For raw manuscripts that need final proofreading, typesetting layout, and cover graphic wrapping, the turnaround is generally 6 to 10 weeks. If you work with our veteran Ghostwriting department to develop the manuscript from scratch, it takes 12 to 16 weeks to ensure premium literary standards.'
            }
          }
        ]
      });
    }

    // Inject Script Tag
    const script = document.createElement('script');
    script.id = 'dynamic-seo-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [activePage, subId]);

  return null; // pure headless side-effect manager
}
