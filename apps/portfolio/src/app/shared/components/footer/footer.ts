import { Component, inject } from '@angular/core';
import { footerLinks } from '../../../core/data/contact-links.data';
import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly footerLinks = footerLinks;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly language = inject(LanguageService);
}
