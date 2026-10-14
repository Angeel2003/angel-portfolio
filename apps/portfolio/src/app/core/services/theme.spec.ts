import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeService } from './theme';

describe('ThemeService', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.unstubAllGlobals();
    window.matchMedia = originalMatchMedia;
  });

  it('uses a safe light value during SSR', () => {
    const service = createService('server');

    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('uses the stored browser preference during initialization', () => {
    localStorage.setItem('portfolio-theme', 'dark');
    const service = createService('browser');

    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('falls back to prefers-color-scheme without a stored preference', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    const service = createService('browser');

    TestBed.tick();

    expect(service.theme()).toBe('dark');
  });

  it('updates the signal, document and storage when setting a theme', () => {
    const service = createService('browser');

    service.setTheme('dark');

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  it('toggles between light and dark', () => {
    const service = createService('browser');

    service.toggleTheme();
    expect(service.theme()).toBe('dark');

    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  function createService(platformId: 'browser' | 'server'): ThemeService {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: document },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return TestBed.inject(ThemeService);
  }
});
