import { Component, inject } from '@angular/core';
import { socialLinks } from '../../../core/data/contact-links.data';
import { ThemeService } from '../../../core/services/theme';
import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected readonly socialLinks = socialLinks;
  protected readonly theme = inject(ThemeService);
  protected readonly language = inject(LanguageService);
}
