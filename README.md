# Portfolio de Ángel Muñoz Cortés

Portfolio personal construido con Angular, TypeScript y Nx. Presenta el perfil y los proyectos mediante una aplicación responsive, accesible y bilingüe.

## Stack

- Angular
- TypeScript
- Nx
- SCSS
- Playwright
- Vitest

## Características

- SSR y SSG
- Tema claro y oscuro
- Español e inglés
- Diseño responsive
- Accesibilidad
- Pruebas E2E
- Integración continua

## Proyectos

- `portfolio`: aplicación Angular principal.
- `portfolio-e2e`: pruebas end-to-end con Playwright.

## Instalación

```bash
npm install
```

## Ejecución

```bash
npx nx serve portfolio
```

La aplicación queda disponible en `http://localhost:4200`.

## Calidad y pruebas

```bash
# Lint
npx nx lint portfolio

# Pruebas unitarias
npx nx test portfolio

# Build
npx nx build portfolio

# Pruebas E2E
npx nx e2e portfolio-e2e
```

## Arquitectura

El código de la aplicación está en `apps/portfolio/src/app`:

- `core`: servicios de idioma y tema, datos de contacto y traducciones.
- `features`: secciones del portfolio y sus rutas.
- `shared`: componentes reutilizables, actualmente navegación y pie de página.

La ruta inicial reúne Hero, Sobre mí, Experiencia, Proyectos, Stack y Contacto. Las secciones de experiencia, proyectos, stack y contacto también tienen rutas propias.

