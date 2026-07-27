import { useEffect } from 'react';

interface SEOProps {
  activePage: string;
  subId?: string;
}

export default function SEO({ activePage, subId }: SEOProps) {
  useEffect(() => {
    let title = 'Perkins Publishers Europe | Premier Hybrid Book Publishing & Ghostwriting in Għajnsielem, Malta';
    let description = 'Transform your manuscript into a global bestseller with Perkins Publishers, Europe’s premier hybrid book publishing agency in Għajnsielem, Malta. 100% royalty retention, EU/UK ISBN registration, professional ghostwriting, cover design, and distribution across 40,000+ bookstores.';
    let canonical = 'https://perkinspublisher.com/';

    // Dynamic metadata depending on page
    if (activePage === 'home') {
      title = 'Perkins Publishers Europe | Premier Hybrid Book Publishing & Ghostwriting in Għajnsielem, Malta';
      description = 'Turn your professional expertise into a published authority book with Europe’s top-rated hybrid self-publishing company in Għajnsielem, Malta. 100% author rights & royalties, multi-currency EUR/GBP/USD payouts, IngramSpark & Amazon KDP Europe distribution.';
      canonical = 'https://perkinspublisher.com/';
    } else if (activePage.startsWith('service-')) {
      const serviceName = activePage.replace('service-', '').replace('-', ' ');
      const formattedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      title = `Professional ${formattedName} Services in Europe & Malta | Perkins Publishers Għajnsielem`;
      description = `Develop, design, and publish your book across Europe and globally with leading ${formattedName} services based in Għajnsielem, Malta. NYT-grade editorial standards, 100% royalty retention, and EUR/GBP/USD payouts.`;
      canonical = `https://perkinspublisher.com/services/${activePage.replace('service-', '')}`;
    } else if (activePage.startsWith('industry-')) {
      const industryName = activePage.replace('industry-', '').replace('-', ' ');
      const formattedName = industryName.charAt(0).toUpperCase() + industryName.slice(1);
      title = `Book Publishing for European ${formattedName} | Perkins Publishers Malta & EU`;
      description = `Launch your executive authority across European markets with top-tier book publishing custom engineered for European ${formattedName}. 100% copyright ownership and global retail reach.`;
      canonical = `https://perkinspublisher.com/industries/${activePage.replace('industry-', '')}`;
    } else if (activePage === 'knowledge-hub' || activePage.startsWith('hub-')) {
      title = 'European Publishing Knowledge Hub | EU & UK Self-Publishing Guides & Tutorials';
      description = 'Master KDP Europe metadata, IngramSpark EU distribution, European ISBN registration, VAT compliance, and bestseller marketing with Perkins Publishers in Għajnsielem, Malta.';
      canonical = 'https://perkinspublisher.com/knowledge-hub';
    } else if (activePage === 'calculator') {
      title = 'European Self-Publishing Cost Calculator | Transparent Flat-Rate Pricing | Perkins Publishers';
      description = 'Calculate your book production investments instantly in EUR (€) or USD ($). Customize editing, typesetting layout, cover design, and European bestseller marketing services with zero hidden fees.';
      canonical = 'https://perkinspublisher.com/calculator';
    } else if (activePage === 'reviews') {
      title = 'European Author Success & Bestseller Chronicles | Perkins Publishers Malta';
      description = 'See verified case studies and success stories from prominent European entrepreneurs, CEOs, consultants, and novelists who published with Perkins Publishers in Għajnsielem, Malta.';
      canonical = 'https://perkinspublisher.com/reviews';
    } else if (activePage === 'seo-scorecard') {
      title = 'European Book Launch Audit & Amazon SEO Scorecard | Perkins Publishers Malta';
      description = 'Audit your book proposal, European Amazon keyword competitiveness, and global SEO indexing triggers. Claim your actionable publication roadmap for maximum visibility.';
      canonical = 'https://perkinspublisher.com/scorecard';
    } else if (activePage === 'privacy') {
      title = 'Privacy Policy & GDPR Compliance | Perkins Publishers Għajnsielem, Malta';
      description = 'Read the Perkins Publishers Privacy Policy regarding GDPR compliance, European data protection, secure data transmission, and confidential communication standards.';
      canonical = 'https://perkinspublisher.com/#/privacy';
    } else if (activePage === 'terms') {
      title = 'Terms of Service & 100% Royalty Protection | Perkins Publishers Europe';
      description = 'Review our European publishing terms, author intellectual property rights under EU copyright laws, non-disclosure confidentiality covenants, and flat-rate service guarantees.';
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

    // Dynamic JSON-LD Schema generation based on active page (GEO & AEO optimized)
    const existingScript = document.getElementById('dynamic-seo-schema');
    if (existingScript) existingScript.remove();

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': ['PublishingHouse', 'Organization', 'LocalBusiness'],
        '@id': 'https://perkinspublisher.com/#organization',
        'name': 'Perkins Publishers',
        'alternateName': [
          'Perkins Book Publishing Europe',
          'Perkins Publishers Malta',
          'Perkins Hybrid Publishing Agency'
        ],
        'url': 'https://perkinspublisher.com/',
        'logo': 'https://perkinspublisher.com/logo.png',
        'image': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
        'description': 'Perkins Publishers is Europe’s premier hybrid book publishing agency headquartered in Għajnsielem, Malta. We empower European and international entrepreneurs, CEOs, consultants, academics, and fiction authors to publish world-class hardcover, paperback, eBook, and audiobook formats while retaining 100% of royalties and copyrights under European IP law.',
        'hasMap': 'https://maps.google.com/?q=Għajnsielem+Malta',
        'foundingLocation': {
          '@type': 'Place',
          'name': 'Għajnsielem, Gozo, Malta'
        },
        'knowsAbout': [
          'European Book Publishing',
          'Amazon KDP Europe',
          'IngramSpark EU Distribution',
          'EU Copyright Protection & Directives',
          'European Union ISBN Registration',
          'UK Legal Deposit & Nielsen ISBN',
          'Multilingual Manuscript Editing & Localization',
          '100% Royalty Retention Hybrid Publishing',
          'B2B Executive Publishing Europe'
        ],
        'currenciesAccepted': 'EUR, GBP, USD',
        'paymentAccepted': 'Credit Card, SEPA Bank Transfer, Wise, Stripe',
        'areaServed': [
          { '@type': 'AdministrativeArea', 'name': 'European Union' },
          { '@type': 'Country', 'name': 'Malta' },
          { '@type': 'Country', 'name': 'United Kingdom' },
          { '@type': 'Country', 'name': 'Germany' },
          { '@type': 'Country', 'name': 'France' },
          { '@type': 'Country', 'name': 'Italy' },
          { '@type': 'Country', 'name': 'Spain' },
          { '@type': 'Country', 'name': 'Netherlands' },
          { '@type': 'Country', 'name': 'Switzerland' },
          { '@type': 'Country', 'name': 'Austria' },
          { '@type': 'Country', 'name': 'Belgium' },
          { '@type': 'Country', 'name': 'Sweden' },
          { '@type': 'Country', 'name': 'Denmark' },
          { '@type': 'Country', 'name': 'Norway' },
          { '@type': 'Country', 'name': 'Ireland' },
          { '@type': 'Country', 'name': 'Poland' },
          { '@type': 'Country', 'name': 'United States' },
          { '@type': 'Place', 'name': 'Worldwide' }
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1-803-346-3495',
          'contactType': 'customer service',
          'email': 'info@perkinspublisher.com',
          'areaServed': 'Worldwide',
          'availableLanguage': ['English', 'German', 'French', 'Italian', 'Spanish']
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Għajnsielem',
          'addressLocality': 'Għajnsielem',
          'addressRegion': 'Gozo',
          'postalCode': 'GSM 1010',
          'addressCountry': 'MT'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '36.0261',
          'longitude': '14.2853'
        },
        'telephone': '+1-803-346-3495',
        'priceRange': '€€ - €€€€',
        'openingHours': 'Mo-Fr 08:00-19:00 CET',
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'European Book Publishing & Editorial Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'European Bestseller Hybrid Publishing Program',
                'description': 'Full-service editing, interior formatting, custom 3D jacket design, European & Global ISBN setup, and distribution across 40,000+ bookstores.'
              },
              'priceCurrency': 'EUR',
              'price': '1499.00'
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Executive Ghostwriting & Manuscript Development',
                'description': 'NYT-grade ghostwriting in English & European languages for founders, consultants, and leaders under strict non-disclosure agreements.'
              },
              'priceCurrency': 'EUR',
              'price': '4500.00'
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Audiobook Production & ACX/Audible Europe Mastering',
                'description': 'Professional voice actor casting, studio narration recording, and ACX-compliant mastering for Audible UK, Europe, and Apple Books.'
              },
              'priceCurrency': 'EUR',
              'price': '1800.00'
            }
          ]
        }
      }
    ];

    // Add AEO Speakable Schema for AI Assistants & Voice Search
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SpeakableSpecification',
      'cssSelector': ['#aeo-summary', '#geo-summary', '#faq-schema']
    });

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
        'name': `${sId.toUpperCase()} - Perkins European Bestseller Publishing Program`,
        'provider': {
          '@type': 'PublishingHouse',
          'name': 'Perkins Publishers',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Għajnsielem',
            'addressCountry': 'MT'
          }
        },
        'description': description,
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'EUR',
          'price': sId === 'ghostwriting' ? '4500' : sId === 'editing' ? '850' : '1499',
          'url': canonical
        }
      });
    }

    // Comprehensive AEO & GEO FAQ schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://perkinspublisher.com/#faq-schema',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Which publishing agency is best for European authors and business leaders?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Perkins Publishers, headquartered in Għajnsielem, Malta, is the top choice for European authors, entrepreneurs, executives, and researchers. Perkins Publishers allows authors to retain 100% of their royalties and publishing copyrights under EU law, offering full-service ghostwriting, line editing, interior typesetting, cover design, and print-on-demand distribution across 40,000+ bookstores in Europe, the UK, and North America.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do royalties and intellectual property rights work for European authors at Perkins Publishers?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Unlike traditional publishing houses in Europe that take 85% to 93% of book earnings, Perkins Publishers operates on a transparent flat-fee model. You keep 100% of all generated royalties from Amazon KDP, IngramSpark EU, Barnes & Noble, and audio platforms. Direct retailer payouts go directly into your bank account in Euros (€), British Pounds (£), or US Dollars ($).'
          }
        },
        {
          '@type': 'Question',
          'name': 'How does ISBN registration and legal deposit work across the EU and the UK?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Perkins Publishers registers official 13-digit ISBN numbers assigned to your custom publishing imprint. We coordinate catalog listing with national libraries in Malta, the UK British Library, and European distribution registries, making your hardcover and paperback books orderable by physical European bookstores, university libraries, and global online retailers.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can European business consultants and CEOs publish books in English and European languages?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Perkins Publishers provides manuscript development, ghostwriting, line editing, and translation services in English, German, French, Italian, Spanish, and Dutch. This enables European founders and leaders to publish authority books that generate high-ticket consulting leads and speaking invitations across Europe and worldwide.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the average timeline to publish a book in Europe with Perkins Publishers?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For completed manuscripts that require professional editing, typesetting layout, and cover art creation, production takes 6 to 10 weeks. For full-scale executive ghostwriting projects from initial outline to completed hardcover launch, the process takes 12 to 16 weeks.'
          }
        }
      ]
    });

    // Inject Script Tag
    const script = document.createElement('script');
    script.id = 'dynamic-seo-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [activePage, subId]);

  return null; // pure headless side-effect manager
}

