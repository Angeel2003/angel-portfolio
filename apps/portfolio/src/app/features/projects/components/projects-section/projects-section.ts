import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  portfolioProjects,
  projectUiLabels,
} from '../../../../core/data/projects.data';
import { LanguageService } from '../../../../core/services/language';

@Component({
  selector: 'app-projects-section',
  imports: [RouterLink],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
})
export class ProjectsSection {
  protected readonly language = inject(LanguageService);
  protected readonly projects = portfolioProjects;
  protected readonly labels = projectUiLabels;
}
