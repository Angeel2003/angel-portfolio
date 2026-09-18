import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-skills-section',
  imports: [],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSection { protected readonly language = inject(LanguageService); }
