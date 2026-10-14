import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { LanguageService } from './language';

describe('LanguageService', () => {
  const originalLanguage = Object.getOwnPropertyDescriptor(navigator, 'language');

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
    document.documentElement.removeAttribute('lang');

    if (originalLanguage) {
      Object.defineProperty(navigator, 'language', originalLanguage);
    } else {
      delete (navigator as { language?: string }).language;
    }
  });

  it('uses a safe English value during SSR', () => {
    const service = createService('server');

    expect(service.language()).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBeNull();
  });

  it('uses the stored browser preference during initialization', () => {
    localStorage.setItem('portfolio-language', 'es');
    const service = createService('browser');

    TestBed.tick();

    expect(service.language()).toBe('es');
    expect(document.documentElement.getAttribute('lang')).toBe('es');
  });

  it('detects Spanish from the browser language', () => {
    setNavigatorLanguage('es-ES');
    const service = createService('browser');

    TestBed.tick();

    expect(service.language()).toBe('es');
  });

  it('uses English for a non-Spanish browser language', () => {
    setNavigatorLanguage('fr-FR');
    const service = createService('browser');

    TestBed.tick();

    expect(service.language()).toBe('en');
  });

  it('updates the signal, document and storage when setting a language', () => {
    const service = createService('browser');

    service.setLanguage('es');

    expect(service.language()).toBe('es');
    expect(document.documentElement.getAttribute('lang')).toBe('es');
    expect(localStorage.getItem('portfolio-language')).toBe('es');
  });

  it('toggles between English and Spanish', () => {
    const service = createService('browser');

    service.toggleLanguage();
    expect(service.language()).toBe('es');

    service.toggleLanguage();
    expect(service.language()).toBe('en');
  });

  function createService(platformId: 'browser' | 'server'): LanguageService {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: DOCUMENT, useValue: document },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(LanguageService);
  }

  function setNavigatorLanguage(language: string): void {
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: language,
    });
  }
});
