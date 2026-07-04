import { useEffect } from 'react';

interface SEOProps {
  activePage: string;
  subId?: string;
}

export default function SEO({ activePage, subId }: SEOProps) {
  useEffect(() => {
    let title = 'Perkins Publishers | Elite Ghostwriting & Bestseller Book Publishing';
    let description = 'Transform your manuscript into a global bestseller with Perkins Publishers. Elite book formatting, award-winning cover design, NYT-grade ghostwriting, global distribution, and strategic marketing where authors retain 100% rights and royalties.';
    let canonical = 'https://perkinspublisher.com/';

    // Dynamic metadata depending on page
    if (activePage === 'home') {
      title = 'Perkins Publishers | Elite Ghostwriting & Bestseller Book Publishing';
      description = 'Turn your professional expertise into a published authority book. Premium self-publishing, NYT ghostwriting, and global distribution with 100% royalties kept by authors.';
      canonical = 'https://perkinspublisher.com/';
    } else if (activePage.startsWith('service-')) {
      const serviceName = activePage.replace('service-', '').replace('-', ' ');
      const formattedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      title = `Elite ${formattedName} Services | Perkins Publishers Bestseller Programs`;
      description = `Develop, design, and publish your book with our professional ${formattedName} services. Work with top-rated industry authorities, maintain 100% royalties, and secure global retail distribution.`;
      canonical = `https://perkinspublisher.com/services/${activePage.replace('service-', '')}`;
    } else if (activePage.startsWith('industry-')) {
      const industryName = activePage.replace('industry-', '').replace('-', ' ');
      const formattedName = industryName.charAt(0).toUpperCase() + industryName.slice(1);
      title = `Book Publishing Solutions for ${formattedName} | Perkins Publishers Authority Lab`;
      description = `Launch your business authority, secure premium speaking engagements, and sign high-value clients. High-end, tailored publishing programs for elite ${formattedName}.`;
      canonical = `https://perkinspublisher.com/industries/${activePage.replace('industry-', '')}`;
    } else if (activePage === 'knowledge-hub' || activePage.startsWith('hub-')) {
      title = 'The Publishing Knowledge Hub | Perkins Publishers Ultimate Self-Publishing Guides';
      description = 'Access masterclasses on Amazon KDP, professional editing standards, ghostwriting agreements, self-publishing costs, and expert book marketing frameworks.';
      canonical = 'https://perkinspublisher.com/knowledge-hub';
    } else if (activePage === 'calculator') {
      title = 'Book Self-Publishing Cost Calculator | Perkins Publishers Transparent Pricing';
      description = 'Calculate your book production investments instantly. Customize editing, formatting, cover design, and marketing packages. No hidden royalties, transparent flat fees.';
      canonical = 'https://perkinspublisher.com/calculator';
    } else if (activePage === 'reviews') {
      title = 'Client Success Stories & Verified Bestseller Reviews | Perkins Publishers';
      description = 'Read verified reviews, video testimonials, and success chronicles from entrepreneurs, CEOs, and authors who secured bestseller rankings with Perkins Publishers.';
      canonical = 'https://perkinspublisher.com/reviews';
    } else if (activePage === 'seo-scorecard') {
      title = 'Instant Author Authority & Bestseller Scorecard | Perkins Publishers';
      description = 'Grade your book concept, genre competitiveness, and Amazon SEO metadata instantly. Receive an action roadmap to optimize your upcoming launch for maximum indexability.';
      canonical = 'https://perkinspublisher.com/scorecard';
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
        'url': 'https://perkinspublisher.com/',
        'logo': 'https://perkinspublisher.com/logo.png',
        'image': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        'description': 'Perkins Publishers matches elite business owners, entrepreneurs, and professional authors with veteran editors and bestseller book marketing campaigns.',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '170 Myrtle Ave',
          'addressLocality': 'Brooklyn',
          'addressRegion': 'NY',
          'postalCode': '11201',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '40.6932',
          'longitude': '-73.9781'
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
