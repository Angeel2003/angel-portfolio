import { describe, expect, it } from 'vitest';
import { appRoutes } from './app.routes';
import { ProjectDetail } from './features/project-detail/project-detail';

describe('project detail routes', () => {
  it('loads the production management detail route', async () => {
    const route = appRoutes.find(
      (candidate) => candidate.path === 'projects/production-management',
    );

    expect(route?.data?.['projectSlug']).toBe('production-management');
    await expect(route?.loadComponent?.()).resolves.toBe(ProjectDetail);
  });

  it('loads the APS-PAIL detail route', async () => {
    const route = appRoutes.find((candidate) => candidate.path === 'projects/aps-pail');

    expect(route?.data?.['projectSlug']).toBe('aps-pail');
    await expect(route?.loadComponent?.()).resolves.toBe(ProjectDetail);
  });
});
