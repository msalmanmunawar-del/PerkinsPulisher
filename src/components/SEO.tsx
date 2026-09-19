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
      const sId = activePage.replace('service-', '');
      canonical = `https://www.perkinspublisher.com/services/${sId}`;
      
      if (sId === 'ghostwriting') {
        title = 'Professional Book Ghostwriting Services | Perkins Publisher';
        description = 'Collaborate with veteran ghostwriters to transform your knowledge or story into a commercially competitive book. 100% copyrights and royalties retained under strict blind NDA.';
      } else if (sId === 'editing') {
        title = 'Elite Developmental Editing & Proofreading Services | Perkins Publisher';
        description = 'Comprehensive multi-pass manuscript editing adhering to Chicago Manual of Style (CMOS 17th Edition). Developmental critique, stylistic line editing, and precision proofreading.';
      } else if (sId === 'cover-design' || sId === 'book-design') {
        title = 'Custom Book Cover Design & Interior Typesetting | Perkins Publisher';
        description = 'Award-winning cover design and interior typography for hardcovers, paperbacks, and eBooks. Mathematically calibrated spine caliper and CMYK print-wrap engineering.';
        canonical = 'https://www.perkinspublisher.com/services/cover-design';
      } else if (sId === 'publishing') {
        title = 'Turnkey Hybrid Book Publishing & Global Distribution | Perkins Publisher';
        description = 'Publish your book worldwide across 40,000+ bookstores and libraries. Keep 100% of your royalties and rights with official ISBN registration and print-on-demand setup.';
      } else if (sId === 'distribution' || sId === 'book-distribution') {
        title = 'Global Book Distribution Services & Bookstore Placement | Perkins Publisher';
        description = 'Worldwide wholesale and digital distribution to Waterstones, Barnes & Noble, Dymocks, and 40,000+ libraries via Ingram Content Group, Baker & Taylor, and Nielsen feeds.';
        canonical = 'https://www.perkinspublisher.com/services/distribution';
      } else if (sId === 'audiobook') {
        title = 'Audiobook Production & Voice Casting (Audible / ACX) | Perkins Publisher';
        description = 'Professional voice casting, studio recording, and audio mastering meeting Audible, Apple Books, and ACX specifications. Retain 100% of your audiobook rights and royalties.';
      } else if (sId === 'marketing') {
        title = 'Strategic Book Marketing & Bestseller Launch Campaigns | Perkins Publisher';
        description = 'Drive discoverability and reader acquisition through targeted Amazon PPC ads, category metadata optimization, press kit distribution, and digital promotional campaigns.';
      } else if (sId === 'kdp') {
        title = 'Amazon KDP Self-Publishing Setup & Distribution | Perkins Publisher';
        description = 'End-to-end Kindle Direct Publishing setup: trim size calculations, gutter margin formatting, 7-keyword search optimization, and print-on-demand activation.';
      } else if (sId === 'business') {
        title = 'Business Book Publishing for Executives & Thought Leaders | Perkins Publisher';
        description = 'Establish definitive corporate authority and command high-ticket client retainers with a custom-bound business book. White-glove ghostwriting and launch strategy.';
      } else if (sId === 'memoirs') {
        title = 'Memoir & Biography Ghostwriting and Publishing | Perkins Publisher';
        description = 'Preserve your family legacy or personal life journey in an enduring, foil-stamped hardcover. Empathetic interview-driven ghostwriting and archival legal deposit.';
      } else if (sId === 'children') {
        title = 'Children’s Book Publishing & Custom Illustration | Perkins Publisher';
        description = 'Bring your children’s story to life with custom character drafts, vibrant full-bleed color illustrations, rhythmic editorial pacing, and print-on-demand production.';
      } else if (sId === 'pr-branding') {
        title = 'Author Personal Branding & Executive PR Services | Perkins Publisher';
        description = 'Craft an authoritative author platform, media one-sheet, digital press room, and cross-channel visibility ecosystem to maximize your book launch impact.';
      } else if (sId === 'linkedin') {
        title = 'LinkedIn Thought Leadership & Author Content Strategy | Perkins Publisher';
        description = 'Convert your manuscript into high-engagement LinkedIn posts, executive newsletters, and inbound consulting inquiries with structured B2B content repurposing.';
      } else if (sId === 'podcast-speaking') {
        title = 'Author Podcast Tour Booking & Speaking Engagement Agency | Perkins Publisher';
        description = 'Get booked as a featured guest on top-rated business, culture, and industry podcasts, securing keynote speaking opportunities and expanding your reader base.';
      } else {
        const formattedName = sId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `${formattedName} Services | Perkins Publisher`;
        description = `Professional ${formattedName.toLowerCase()} solutions by Perkins Publisher in Għajnsielem, Malta. 100% author rights and royalty retention with global distribution reach.`;
      }
    } else if (activePage.startsWith('industry-')) {
      const indId = activePage.replace('industry-', '');
      canonical = `https://www.perkinspublisher.com/industries/${indId}`;

      if (indId === 'coaches') {
        title = 'Book Publishing Solutions for Elite Coaches & Mentors | Perkins Publisher';
        description = 'Turn your signature coaching methodology into a high-ticket client magnet. Leverage a published book to pre-qualify prospective clients and eliminate sales friction.';
      } else if (indId === 'consultants') {
        title = 'Executive Publishing Programs for Management Consultants | Perkins Publisher';
        description = 'Command five-figure corporate retainers and bypass corporate gatekeepers by mailing custom-bound hardcover books directly to enterprise decision-makers.';
      } else if (indId === 'doctors') {
        title = 'Medical & Healthcare Thought Leadership Book Publishing | Perkins Publisher';
        description = 'Publish authoritative, patient-friendly medical literature and health memoirs. Rigorous editorial accuracy, clinical citation review, and global distribution.';
      } else if (indId === 'lawyers') {
        title = 'Book Publishing for Attorneys & Legal Professionals | Perkins Publisher';
        description = 'Cement practice-area supremacy and attract high-value corporate clients with an authoritative legal handbook or industry analysis published under your sole name.';
      } else if (indId === 'ceos') {
        title = 'Book Publishing for Tech Founders & Enterprise CEOs | Perkins Publisher';
        description = 'Document your company’s founding philosophy, market disruption thesis, and leadership insights in a world-class book with white-glove ghostwriting.';
      } else {
        const formattedName = indId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        title = `Book Publishing for ${formattedName} | Perkins Publisher`;
        description = `Tailored book publishing and ghostwriting for ${formattedName.toLowerCase()}. 100% author rights and royalty retention with worldwide reach.`;
      }
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
    }

    // Handle internal/utility pages that should not be indexed or crawled
    const isInternalAuditPage = activePage === 'citations' || activePage === 'indexing-status' || activePage.startsWith('internal-');

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      if (isInternalAuditPage) {
        metaRobots.setAttribute('content', 'noindex, nofollow, noarchive');
      } else {
        metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      }
    }

    // Update document head
    document.title = isInternalAuditPage ? `Internal Tool | Perkins Publisher` : title;
    
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
      'service-distribution': 'Book Distribution',
      'service-book-distribution': 'Book Distribution',
      'service-kdp': 'Amazon KDP Publishing',
      'service-cover-design': 'Cover & Interior Design',
      'service-book-design': 'Cover & Interior Design',
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
      'terms': 'Terms of Service'
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

