import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_SEO_CONFIG } from '../config/seo.config';
import { Language } from '../i18n/translations';
import { LanguageService } from './language';

export interface PageSeoMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly config = inject(SITE_SEO_CONFIG);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly pageMetadata = signal<PageSeoMetadata | null>(null);

  constructor() {
    effect(() => {
      const language = this.language.language();
      const page = this.pageMetadata();

      this.updateMetadata(language, page);
    });
  }

  setPageMetadata(metadata: PageSeoMetadata): void {
    this.pageMetadata.set(metadata);
  }

  clearPageMetadata(): void {
    this.pageMetadata.set(null);
  }

  updateMetadata(language: Language, page?: PageSeoMetadata | null): void {
    const content = this.config.content[language];
    const title = page?.title ?? content.title;
    const description = page?.description ?? content.description;
    const canonicalUrl = this.toAbsoluteUrl(page?.path ?? '/');
    const imagePath = page?.image ?? this.config.defaultOgImage;
    const imageUrl = this.toAbsoluteUrl(imagePath) ?? imagePath;

    this.title.setTitle(title);
    this.updateName('description', description);

    this.updateProperty('og:title', title);
    this.updateProperty('og:description', description);
    this.updateProperty('og:type', 'website');
    this.updateProperty('og:site_name', this.config.siteName);
    this.updateProperty('og:locale', content.locale);
    this.updateProperty('og:image', imageUrl);
    this.updateOptionalProperty('og:url', canonicalUrl);

    this.updateName('twitter:card', 'summary_large_image');
    this.updateName('twitter:title', title);
    this.updateName('twitter:description', description);
    this.updateName('twitter:image', imageUrl);

    this.updateCanonical(canonicalUrl);
  }

  private updateCanonical(url: string | null): void {
    const canonicalLinks = Array.from(
      this.document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'),
    );

    if (!url) {
      canonicalLinks.forEach((link) => link.remove());
      return;
    }

    const [canonical, ...duplicates] = canonicalLinks;
    duplicates.forEach((link) => link.remove());

    const link = canonical ?? this.document.createElement('link');
    link.rel = 'canonical';
    link.href = url;

    if (!canonical) {
      this.document.head.appendChild(link);
    }
  }

  private toAbsoluteUrl(path: string): string | null {
    const siteUrl = this.config.siteUrl.trim().replace(/\/$/, '');

    return siteUrl ? `${siteUrl}${path}` : null;
  }

  private updateName(name: string, content: string): void {
    this.updateMeta('name', name, content);
  }

  private updateProperty(property: string, content: string): void {
    this.updateMeta('property', property, content);
  }

  private updateOptionalProperty(property: string, content: string | null): void {
    if (content) {
      this.updateProperty(property, content);
      return;
    }

    this.document.head.querySelector(`meta[property="${property}"]`)?.remove();
  }

  private updateMeta(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `meta[${attribute}="${key}"]`;
    const existingTag = this.document.head.querySelector<HTMLMetaElement>(selector);

    if (existingTag) {
      existingTag.content = content;
      return;
    }

    this.meta.addTag(
      attribute === 'name'
        ? { name: key, content }
        : { property: key, content },
    );
  }
}
