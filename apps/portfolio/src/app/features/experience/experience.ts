import { Component } from '@angular/core';
import { ExperienceSection } from './components/experience-section/experience-section';

@Component({
  selector: 'app-experience',
  imports: [ExperienceSection],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {}
