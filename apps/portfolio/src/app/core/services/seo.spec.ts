import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { afterEach, describe, expect, it } from 'vitest';
import { siteSeoConfig, SITE_SEO_CONFIG } from '../config/seo.config';
import { LanguageService } from './language';
import { SeoService } from './seo';

describe('SeoService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    document.title = '';
    document.head
      .querySelectorAll('meta[name], meta[property], link[rel="canonical"]')
      .forEach((element) => element.remove());
    localStorage.clear();
  });

  it('sets Spanish title, description and Open Graph locale', () => {
    const seo = createService();

    seo.updateMetadata('es');

    expect(document.title).toBe(siteSeoConfig.content.es.title);
    expect(getMeta('name', 'description')).toBe(siteSeoConfig.content.es.description);
    expect(getMeta('property', 'og:title')).toBe(siteSeoConfig.content.es.title);
    expect(getMeta('property', 'og:description')).toBe(siteSeoConfig.content.es.description);
    expect(getMeta('property', 'og:locale')).toBe('es_ES');
    expect(getMeta('name', 'twitter:title')).toBe(siteSeoConfig.content.es.title);
  });

  it('sets English title and description', () => {
    const seo = createService();

    seo.updateMetadata('en');

    expect(document.title).toBe(siteSeoConfig.content.en.title);
    expect(getMeta('name', 'description')).toBe(siteSeoConfig.content.en.description);
    expect(getMeta('property', 'og:locale')).toBe('en_US');
  });

  it('keeps exactly one canonical link when metadata changes', () => {
    const seo = createService('https://portfolio.example');

    seo.updateMetadata('es');
    seo.updateMetadata('en');

    const canonicalLinks = document.head.querySelectorAll('link[rel="canonical"]');
    expect(canonicalLinks).toHaveLength(1);
    expect(canonicalLinks[0]?.getAttribute('href')).toBe('https://portfolio.example/');
  });

  it('sets project metadata and a project-specific canonical URL', () => {
    const seo = createService('https://portfolio.example');

    seo.setPageMetadata({
      title: 'Project: Production Management System | Ángel Muñoz Cortés',
      description: 'A full-stack application for an industrial plant.',
      path: '/projects/production-management',
    });
    TestBed.tick();

    expect(document.title).toBe('Project: Production Management System | Ángel Muñoz Cortés');
    expect(getMeta('property', 'og:title')).toBe(document.title);
    expect(getMeta('property', 'og:description')).toBe(
      'A full-stack application for an industrial plant.',
    );
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://portfolio.example/projects/production-management',
    );
  });

  it('updates metadata when the application language changes', () => {
    const { language, seo } = createServices();

    language.setLanguage('es');
    TestBed.tick();

    expect(seo).toBeTruthy();
    expect(document.title).toBe(siteSeoConfig.content.es.title);
    expect(getMeta('name', 'twitter:title')).toBe(siteSeoConfig.content.es.title);
  });

  function createService(siteUrl = ''): SeoService {
    return createServices(siteUrl).seo;
  }

  function createServices(siteUrl = ''): { language: LanguageService; seo: SeoService } {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        SeoService,
        Title,
        Meta,
        { provide: DOCUMENT, useValue: document },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: SITE_SEO_CONFIG, useValue: { ...siteSeoConfig, siteUrl } },
      ],
    });

    return {
      language: TestBed.inject(LanguageService),
      seo: TestBed.inject(SeoService),
    };
  }

  function getMeta(attribute: 'name' | 'property', value: string): string | null {
    return document.head
      .querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`)
      ?.getAttribute('content') ?? null;
  }
});
