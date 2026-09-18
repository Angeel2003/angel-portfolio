import { Component } from '@angular/core';
import { SkillsSection } from './components/skills-section/skills-section';

@Component({
  selector: 'app-skills',
  imports: [SkillsSection],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {}
