interface PageMeta {
  title: string;
  description: string;
  path?: string;
}

const SITE_URL = 'https://example.com';
const SITE_NAME = 'Portfolio';

export function setPageMeta({ title, description, path = '' }: PageMeta) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  document.title = fullTitle;

  setMetaTag('description', description);
  setMetaTag('og:title', fullTitle, 'property');
  setMetaTag('og:description', description, 'property');
  setMetaTag('og:url', url, 'property');

  setLinkTag('canonical', url);
}

function setMetaTag(
  name: string,
  content: string,
  attr: 'name' | 'property' = 'name',
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attr}="${name}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
