import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About { protected readonly language = inject(LanguageService); }
