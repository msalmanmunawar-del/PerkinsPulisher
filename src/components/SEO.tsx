import { useEffect } from 'react';

interface SEOProps {
  activePage: string;
  subId?: string;
}

export default function SEO({ activePage, subId }: SEOProps) {
  useEffect(() => {
    let title = 'Perkins Publisher | Premier Hybrid Book Publishing & Ghostwriting in Għajnsielem, Malta';
    let description = 'Transform your manuscript into a global bestseller with Perkins Publisher, Europe’s premier hybrid book publishing agency in Għajnsielem, Malta. 100% royalty retention, EU/UK ISBN registration, professional ghostwriting, cover design, and distribution across 40,000+ bookstores.';
    let canonical = 'https://www.perkinspublisher.com/';

    // Dynamic metadata depending on page
    if (activePage === 'home') {
      title = 'Perkins Publisher | Premier Hybrid Book Publishing & Ghostwriting in Għajnsielem, Malta';
      description = 'Turn your professional expertise into a published authority book with Europe’s top-rated hybrid self-publishing company in Għajnsielem, Malta. 100% author rights & royalties, multi-currency EUR/GBP/USD payouts, IngramSpark & Amazon KDP Europe distribution.';
      canonical = 'https://www.perkinspublisher.com/';
    } else if (activePage.startsWith('service-')) {
      const serviceName = activePage.replace('service-', '').replace('-', ' ');
      const formattedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
      title = `Professional ${formattedName} Services in Europe & Malta | Perkins Publisher Għajnsielem`;
      description = `Develop, design, and publish your book across Europe and globally with leading ${formattedName} services based in Għajnsielem, Malta. NYT-grade editorial standards, 100% royalty retention, and EUR/GBP/USD payouts.`;
      canonical = `https://www.perkinspublisher.com/services/${activePage.replace('service-', '')}`;
    } else if (activePage.startsWith('industry-')) {
      const industryName = activePage.replace('industry-', '').replace('-', ' ');
      const formattedName = industryName.charAt(0).toUpperCase() + industryName.slice(1);
      title = `Book Publishing for European ${formattedName} | Perkins Publisher Malta & EU`;
      description = `Launch your executive authority across European markets with top-tier book publishing custom engineered for European ${formattedName}. 100% copyright ownership and global retail reach.`;
      canonical = `https://www.perkinspublisher.com/industries/${activePage.replace('industry-', '')}`;
    } else if (activePage.startsWith('location-')) {
      const locId = activePage.replace('location-', '');
      if (locId === 'uk-london') {
        title = 'Book Publishing & Ghostwriting Services London & UK | Perkins Publisher';
        description = 'Top-rated hybrid book publishing for British entrepreneurs, keynote speakers, and authors in London and across the UK. 100% royalties in GBP (£), British Library legal deposit, and Waterstones distribution.';
        canonical = 'https://www.perkinspublisher.com/locations/uk-london';
      } else if (locId === 'germany-berlin') {
        title = 'Buchveröffentlichung & Ghostwriting Deutschland & DACH | Perkins Publisher';
        description = 'Führender Hybrid-Verlag für Autoren, Geschäftsführer und Berater in Deutschland, Österreich und der Schweiz. 100% Tantiemen in EUR, VLB-Listung und Thalia Buchhandelsvertrieb.';
        canonical = 'https://www.perkinspublisher.com/locations/germany-berlin';
      } else if (locId === 'switzerland-zurich') {
        title = 'Executive Book Publishing Zurich & Geneva | Switzerland | Perkins Publisher';
        description = 'Prestige hardcover book publishing and memoirs for Swiss wealth managers, founders, and consultants in Zurich, Geneva, and Basel. 100% rights retention and international distribution.';
        canonical = 'https://www.perkinspublisher.com/locations/switzerland-zurich';
      } else if (locId === 'australia') {
        title = 'Book Publishing & Ghostwriting Services Australia | Perkins Publisher Sydney & Melbourne';
        description = 'Premier hybrid book publishing for Australian founders, consultants, and authors. 100% AUD royalties, Dymocks & Booktopia distribution, Thorpe-Bowker ISBNs, and National Library of Australia (NED) legal deposit.';
        canonical = 'https://www.perkinspublisher.com/locations/australia';
      } else if (locId === 'new-zealand') {
        title = 'Book Publishing & Ghostwriting New Zealand | Perkins Publisher Auckland & Wellington';
        description = 'Bespoke book publishing for Kiwi entrepreneurs and authors across New Zealand. Whitcoulls & Paper Plus distribution, 100% NZD royalties, and National Library of NZ legal deposit compliance.';
        canonical = 'https://www.perkinspublisher.com/locations/new-zealand';
      } else if (locId === 'ireland') {
        title = 'Book Publishing & Ghostwriting Services Ireland & Dublin | Perkins Publisher';
        description = 'Elite hybrid book publishing for Irish tech executives, academics, and novelists in Dublin, Cork, and Galway. Easons & Dubray distribution, Trinity College deposit, and 100% EUR royalties.';
        canonical = 'https://www.perkinspublisher.com/locations/ireland';
      } else {
        title = 'Perkins Publisher Headquarters | Għajnsielem, Malta & Mediterranean Hub';
        description = 'Official European headquarters of Perkins Publisher in Għajnsielem, Gozo, Malta. Hybrid book publishing, ghostwriting, and worldwide distribution under EU copyright laws.';
        canonical = 'https://www.perkinspublisher.com/locations/malta';
      }
    } else if (activePage === 'knowledge-hub' || activePage.startsWith('hub-')) {
      title = 'European Publishing Knowledge Hub | EU & UK Self-Publishing Guides & Tutorials';
      description = 'Master KDP Europe metadata, IngramSpark EU distribution, European ISBN registration, VAT compliance, and bestseller marketing with Perkins Publisher in Għajnsielem, Malta.';
      canonical = 'https://www.perkinspublisher.com/knowledge-hub';
    } else if (activePage === 'calculator') {
      title = 'European Self-Publishing Cost Calculator | Transparent Flat-Rate Pricing | Perkins Publisher';
      description = 'Calculate your book production investments instantly in EUR (€) or USD ($). Customize editing, typesetting layout, cover design, and European bestseller marketing services with zero hidden fees.';
      canonical = 'https://www.perkinspublisher.com/calculator';
    } else if (activePage === 'reviews') {
      title = 'European Author Success & Bestseller Chronicles | Perkins Publisher Malta';
      description = 'See verified case studies and success stories from prominent European entrepreneurs, CEOs, consultants, and novelists who published with Perkins Publisher in Għajnsielem, Malta.';
      canonical = 'https://www.perkinspublisher.com/reviews';
    } else if (activePage === 'seo-scorecard') {
      title = 'European Book Launch Audit & Amazon SEO Scorecard | Perkins Publisher Malta';
      description = 'Audit your book proposal, European Amazon keyword competitiveness, and global SEO indexing triggers. Claim your actionable publication roadmap for maximum visibility.';
      canonical = 'https://www.perkinspublisher.com/seo-scorecard';
    } else if (activePage === 'privacy') {
      title = 'Privacy Policy & GDPR Compliance | Perkins Publisher Għajnsielem, Malta';
      description = 'Read the Perkins Publisher Privacy Policy regarding GDPR compliance, European data protection, secure data transmission, and confidential communication standards.';
      canonical = 'https://www.perkinspublisher.com/privacy';
    } else if (activePage === 'terms') {
      title = 'Terms of Service & 100% Royalty Protection | Perkins Publisher Europe';
      description = 'Review our European publishing terms, author intellectual property rights under EU copyright laws, non-disclosure confidentiality covenants, and flat-rate service guarantees.';
      canonical = 'https://www.perkinspublisher.com/terms';
    } else if (activePage === 'search-console') {
      title = 'Search Console & Production Verification | Perkins Publisher';
      description = 'Google Search Console, sitemap inspection, and indexing diagnostic portal for Perkins Publisher.';
      canonical = 'https://www.perkinspublisher.com/search-console';
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

    // On the homepage, canonical structured data is authoritatively provided by index.html.
    // Avoid creating duplicate or competing business entities on the homepage.
    if (activePage === 'home') {
      return;
    }

    const schemas: any[] = [];

    // Page label lookup matching actual visible website hierarchy
    const pageNames: Record<string, string> = {
      'service-ghostwriting': 'Book Ghostwriting',
      'service-editing': 'Developmental Editing',
      'service-publishing': 'Hybrid Publishing',
      'service-kdp': 'Amazon KDP Publishing',
      'service-cover-design': 'Cover & Interior Design',
      'service-business': 'Business Thought Leadership',
      'service-memoirs': 'Memoirs & Family Histories',
      'service-children': 'Children’s Book Production',
      'service-audiobook': 'Audiobook Production',
      'service-marketing': 'Book Launch & PR',
      'service-pr-branding': 'Executive Personal Branding',
      'service-linkedin': 'LinkedIn Thought Leadership',
      'service-podcast-speaking': 'Podcast & Keynote Booking',
      'industry-coaches': 'Coaches & Mentors',
      'industry-consultants': 'Management Consultants',
      'industry-doctors': 'Physicians & Healthcare',
      'industry-lawyers': 'Attorneys & Legal Professionals',
      'industry-ceos': 'Founders & Tech Executives',
      'location-uk-london': 'London & United Kingdom',
      'location-germany-berlin': 'Berlin, Germany',
      'location-switzerland-zurich': 'Zurich & Geneva, Switzerland',
      'location-malta': 'Għajnsielem, Malta',
      'location-ireland': 'Dublin, Ireland',
      'location-australia': 'Sydney & Melbourne, Australia',
      'location-new-zealand': 'Auckland & Wellington, NZ',
      'knowledge-hub': 'Knowledge Hub',
      'calculator': 'Cost Calculator',
      'reviews': 'Author Reviews',
      'seo-scorecard': 'Audit Scorecard',
      'privacy': 'Privacy Policy',
      'terms': 'Terms of Service',
      'search-console': 'Search Console'
    };

    let pageLabel = pageNames[activePage];
    if (!pageLabel) {
      pageLabel = activePage.replace(/^(service|industry|location)-/, '')
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }

    // Exactly one valid BreadcrumbList representing actual visible hierarchy
    const breadcrumbList: any = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.perkinspublisher.com/'
        }
      ]
    };

    if (activePage.startsWith('service-')) {
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        'position': 2,
        'name': 'Services',
        'item': 'https://www.perkinspublisher.com/services'
      });
    } else if (activePage.startsWith('industry-')) {
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        'position': 2,
        'name': 'Industries',
        'item': 'https://www.perkinspublisher.com/industries'
      });
    } else if (activePage.startsWith('location-')) {
      breadcrumbList.itemListElement.push({
        '@type': 'ListItem',
        'position': 2,
        'name': 'Global Desks',
        'item': 'https://www.perkinspublisher.com/locations'
      });
    }
    
    breadcrumbList.itemListElement.push({
      '@type': 'ListItem',
      'position': breadcrumbList.itemListElement.length + 1,
      'name': pageLabel,
      'item': canonical
    });

    schemas.push(breadcrumbList);

    // If service page, add clean Service Schema referencing canonical Organization @id
    if (activePage.startsWith('service-')) {
      const sId = activePage.replace('service-', '');
      const serviceTitle = sId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${canonical}#service`,
        'name': `${serviceTitle} - Perkins Publisher`,
        'serviceType': 'Book Publishing Service',
        'provider': {
          '@id': 'https://perkinspublisher.com/#organization'
        },
        'description': description,
        'url': canonical
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

