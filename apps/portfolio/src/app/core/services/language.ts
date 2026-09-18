import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Language, translations } from '../i18n/translations';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-language';

  readonly language = signal<Language>('en');
  readonly translations = computed(() => translations[this.language()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => this.initializeLanguage());
    }
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    this.applyLanguage(language);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.storageKey, language);
      } catch {
        // localStorage may be unavailable or blocked.
      }
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.language() === 'es' ? 'en' : 'es');
  }

  private initializeLanguage(): void {
    const language =
      this.getStoredLanguage() ?? this.getBrowserLanguage();

    this.language.set(language);
    this.applyLanguage(language);
  }

  private getStoredLanguage(): Language | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const language = localStorage.getItem(this.storageKey);

      return language === 'es' || language === 'en'
        ? language
        : null;
    } catch {
      return null;
    }
  }

  private getBrowserLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'en';
    }

    return navigator.language.toLowerCase().startsWith('es')
      ? 'es'
      : 'en';
  }

  private applyLanguage(language: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = language;
    }
  }
}