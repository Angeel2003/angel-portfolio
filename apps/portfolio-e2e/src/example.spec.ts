import { expect, test } from '@playwright/test';

test('shows portfolio hero', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Frontend Developer specialized in Angular',
    }),
  ).toBeVisible();
});

test('navigates to experience and adapts its layout to the viewport', async ({
  page,
}) => {
  const viewports = [
    { width: 375, height: 812, stacked: true },
    { width: 768, height: 1024, stacked: true },
    { width: 1440, height: 900, stacked: false },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('link', { name: 'Experience', exact: true }).click();

    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator('#experience')).toBeInViewport();

    const layout = await page.locator('.experience__entry').first().evaluate(
      (entry) => {
        const meta = entry.querySelector('.experience__meta');
        const content = entry.querySelector('.experience__content');

        if (!meta || !content) {
          throw new Error('Experience entry is missing its layout regions.');
        }

        const metaRect = meta.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        return {
          contentLeft: contentRect.left,
          contentTop: contentRect.top,
          metaBottom: metaRect.bottom,
          metaLeft: metaRect.left,
          pageHasHorizontalOverflow:
            document.documentElement.scrollWidth > window.innerWidth,
        };
      },
    );

    expect(layout.pageHasHorizontalOverflow).toBe(false);

    if (viewport.stacked) {
      expect(layout.contentLeft).toBe(layout.metaLeft);
      expect(layout.contentTop).toBeGreaterThan(layout.metaBottom);
    } else {
      expect(layout.contentLeft).toBeGreaterThan(layout.metaLeft);
    }
  }
});

test('navigates to projects', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects', exact: true }).click();

  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole('heading', { level: 2, name: 'Selected work' }),
  ).toBeInViewport();
});

test('navigates to stack and adapts its groups to the viewport', async ({ page }) => {
  const viewports = [
    { width: 375, height: 812, columns: 1 },
    { width: 768, height: 1024, columns: 2 },
    { width: 1440, height: 900, columns: 3 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('link', { name: 'Stack', exact: true }).click();

    await expect(page).toHaveURL(/#stack$/);
    await expect(page.locator('#stack')).toBeInViewport();

    const layout = await page.locator('.skills__groups').evaluate((groups) => {
      const items = [...groups.querySelectorAll('.skills__group')];
      const first = items[0]?.getBoundingClientRect();
      const second = items[1]?.getBoundingClientRect();
      const third = items[2]?.getBoundingClientRect();

      if (!first || !second || !third) {
        throw new Error('Stack groups are missing.');
      }

      return {
        firstLeft: first.left,
        firstBottom: first.bottom,
        secondLeft: second.left,
        secondTop: second.top,
        thirdLeft: third.left,
        pageHasHorizontalOverflow:
          document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    expect(layout.pageHasHorizontalOverflow).toBe(false);

    if (viewport.columns === 1) {
      expect(layout.secondLeft).toBe(layout.firstLeft);
      expect(layout.secondTop).toBeGreaterThan(layout.firstBottom);
    } else {
      expect(layout.secondLeft).toBeGreaterThan(layout.firstLeft);
    }

    if (viewport.columns === 3) {
      expect(layout.thirdLeft).toBeGreaterThan(layout.secondLeft);
    }
  }
});

test('navigates to contact and shows the footer', async ({ page }) => {
  const viewports = [
    { width: 375, height: 812, stacked: true },
    { width: 768, height: 1024, stacked: false },
    { width: 1440, height: 900, stacked: false },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact', exact: true }).click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole('heading', { level: 2, name: "Let's talk" })).toBeInViewport();
    await expect(page.getByRole('contentinfo')).toContainText(String(new Date().getFullYear()));

    const layout = await page.locator('.contact__container').evaluate((container) => {
      const content = container.querySelector('.contact__content');
      const actions = container.querySelector('.contact__actions');

      if (!content || !actions) {
        throw new Error('Contact section is missing its content or actions region.');
      }

      const contentRect = content.getBoundingClientRect();
      const actionsRect = actions.getBoundingClientRect();

      return {
        actionsLeft: actionsRect.left,
        actionsTop: actionsRect.top,
        contentBottom: contentRect.bottom,
        contentLeft: contentRect.left,
        pageHasHorizontalOverflow:
          document.documentElement.scrollWidth > window.innerWidth,
      };
    });

    expect(layout.pageHasHorizontalOverflow).toBe(false);

    if (viewport.stacked) {
      expect(layout.actionsLeft).toBe(layout.contentLeft);
      expect(layout.actionsTop).toBeGreaterThan(layout.contentBottom);
    } else {
      expect(layout.actionsLeft).toBeGreaterThan(layout.contentLeft);
    }
  }
});

test('uses the system theme and preserves a manual preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  const toggle = page.getByRole('switch', { name: 'Dark theme' });
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await toggle.click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('detects, changes and persists the portfolio language', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'language', { configurable: true, value: 'es-ES' });
  });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('link', { name: 'Sobre mí', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Cambiar idioma a inglés' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('link', { name: 'About', exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('translates portfolio sections, actions and accessible labels', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-language', 'es');
  });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Frontend Developer especializado en Angular' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Sobre mí' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Experiencia' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Trabajo destacado' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Tecnologías con las que trabajo' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Hablemos' })).toBeVisible();
  await expect(page.locator('.projects__preview--placeholder').first()).toContainText('Captura pendiente');
  await expect(page.getByRole('navigation', { name: 'Canales de contacto' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Enviar email' })).toHaveAttribute(
    'href',
    'mailto:angelmunozcortes2003@gmail.com',
  );

  await page.getByRole('button', { name: 'Cambiar idioma a inglés' }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: 'Frontend Developer specialized in Angular' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'About me' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Experience' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Selected work' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Technologies I work with' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: "Let's talk" })).toBeVisible();
  await expect(page.locator('.projects__preview--placeholder').first()).toContainText('Screenshot coming soon');
  await expect(page.getByRole('navigation', { name: 'Contact channels' })).toBeVisible();
  await expect(page.getByRole('switch', { name: 'Dark theme' })).toBeVisible();
});

test('keeps navbar controls within the mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const layout = await page.locator('.navbar__container').evaluate((container) => {
    const utilities = container.querySelector('.navbar__utilities');

    if (!utilities) {
      throw new Error('Navbar controls are missing.');
    }

    const utilitiesRect = utilities.getBoundingClientRect();

    return {
      pageHasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      utilitiesRight: utilitiesRect.right,
      viewportWidth: window.innerWidth,
    };
  });

  expect(layout.pageHasHorizontalOverflow).toBe(false);
  expect(layout.utilitiesRight).toBeLessThanOrEqual(layout.viewportWidth);
});
