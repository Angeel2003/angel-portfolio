import { Component } from '@angular/core';
import { ProjectsSection } from './components/projects-section/projects-section';

@Component({
  selector: 'app-projects',
  imports: [ProjectsSection],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {}
