import type { Language } from '../i18n/translations';

/**
 * Copy the real PDF files to `apps/portfolio/public/cv/` using these exact
 * names. Angular copies that directory to `/cv/` in the built application.
 */
export const curriculumVitaePaths: Readonly<Record<Language, string>> = {
  es: '/cv/angel-munoz-cortes-es.pdf',
  en: '/cv/angel-munoz-cortes-en.pdf',
};
