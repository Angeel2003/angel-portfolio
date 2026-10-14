export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
  emphasis?: 'primary' | 'secondary';
}

export const contactEmail = 'angelmunozcortes2003@gmail.com';

export const emailLink: ContactLink = {
  label: 'Email',
  href: `mailto:${contactEmail}`,
};

export const socialLinks: readonly ContactLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Angeel2003',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/angel-munoz-cortes',
    external: true,
  },
];

export const contactLinks: readonly ContactLink[] = [
  {
    ...emailLink,
    emphasis: 'primary',
  },
  ...socialLinks.map((link) => ({ ...link, emphasis: 'secondary' as const })),
];

export const footerLinks: readonly ContactLink[] = [emailLink, ...socialLinks];
