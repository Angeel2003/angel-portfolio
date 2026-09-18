import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-projects-section',
  imports: [],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
})
export class ProjectsSection { protected readonly language = inject(LanguageService); }
