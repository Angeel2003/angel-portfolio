import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero { protected readonly language = inject(LanguageService); }
