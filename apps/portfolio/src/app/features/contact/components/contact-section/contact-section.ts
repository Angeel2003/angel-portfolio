import { Component, inject } from '@angular/core';
import { contactLinks } from '../../../../core/data/contact-links.data';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-contact-section',
  imports: [],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  protected readonly contactLinks = contactLinks;
  protected readonly language = inject(LanguageService);
}
