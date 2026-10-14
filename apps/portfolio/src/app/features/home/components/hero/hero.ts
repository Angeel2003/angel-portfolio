import { Component, inject } from '@angular/core';
import { curriculumVitaePaths } from '../../../../core/data/cv-paths.data';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly curriculumVitaePaths = curriculumVitaePaths;
  protected readonly language = inject(LanguageService);
}
