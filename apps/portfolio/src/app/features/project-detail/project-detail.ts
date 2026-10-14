import { Component, DestroyRef, computed, effect, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  getProjectBySlug,
  projectUiLabels,
} from '../../core/data/projects.data';
import { LanguageService } from '../../core/services/language';
import { SeoService } from '../../core/services/seo';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly seo = inject(SeoService);
  protected readonly language = inject(LanguageService);
  protected readonly labels = projectUiLabels;
  protected readonly project = getProjectBySlug(
    this.route.snapshot.data['projectSlug'] as string,
  );
  protected readonly content = computed(() =>
    this.project ? this.project.content[this.language.language()] : undefined,
  );

  constructor() {
    effect(() => {
      const content = this.content();

      if (content && this.project) {
        this.seo.setPageMetadata({
          title: content.seoTitle,
          description: content.seoDescription,
          path: `/projects/${this.project.slug}`,
          image: this.project.coverImage?.src,
        });
      }
    });

    this.destroyRef.onDestroy(() => this.seo.clearPageMetadata());
  }
}
