import { describe, expect, it } from 'vitest';
import { getProjectBySlug, portfolioProjects } from './projects.data';

describe('portfolioProjects', () => {
  it('returns each configured project for its valid slug', () => {
    expect(getProjectBySlug('production-management')).toBe(portfolioProjects[0]);
    expect(getProjectBySlug('aps-pail')).toBe(portfolioProjects[1]);
  });

  it('returns undefined for an invalid slug', () => {
    expect(getProjectBySlug('unknown-project')).toBeUndefined();
  });
});
