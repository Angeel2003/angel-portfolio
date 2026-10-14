import { InjectionToken } from '@angular/core';
import type { Language } from '../i18n/translations';

export interface SiteSeoConfig {
  siteName: string;
  /** Set this to the final production origin, without a trailing slash. */
  siteUrl: string;
  defaultOgImage: string;
  content: Readonly<Record<Language, SeoContent>>;
}

interface SeoContent {
  title: string;
  description: string;
  locale: string;
}

export const siteSeoConfig: SiteSeoConfig = {
  siteName: 'Ángel Muñoz Cortés',
  // Keep empty until the final production domain is available. This prevents
  // local URLs from being emitted as canonical or Open Graph URLs.
  siteUrl: '',
  // Add the real image at apps/portfolio/public/og/portfolio-og.png.
  defaultOgImage: '/og/portfolio-og.png',
  content: {
    es: {
      title: 'Ángel Muñoz Cortés | Frontend Developer Angular',
      description:
        'Portfolio de Ángel Muñoz Cortés, Frontend Developer e Ingeniero Informático especializado en Angular, TypeScript, microfrontends y desarrollo de aplicaciones web.',
      locale: 'es_ES',
    },
    en: {
      title: 'Ángel Muñoz Cortés | Angular Frontend Developer',
      description:
        'Portfolio of Ángel Muñoz Cortés, Frontend Developer and Software Engineer specialized in Angular, TypeScript, microfrontends and modern web application development.',
      locale: 'en_US',
    },
  },
};

export const SITE_SEO_CONFIG = new InjectionToken<SiteSeoConfig>(
  'SITE_SEO_CONFIG',
  { factory: () => siteSeoConfig },
);
