import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { ProjectDetail } from './project-detail';

describe('ProjectDetail', () => {
  it('renders the requested project detail', async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { projectSlug: 'production-management' } } },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectDetail);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Production Management System',
    );
    expect(fixture.nativeElement.querySelectorAll('h1')).toHaveLength(1);
  });
});
