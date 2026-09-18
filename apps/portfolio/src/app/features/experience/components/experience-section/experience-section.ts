import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-experience-section',
  imports: [],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.scss',
})
export class ExperienceSection { protected readonly language = inject(LanguageService); }
