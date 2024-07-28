import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'tmb-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, MatButtonModule,
    MatMenuModule,],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  currentLanguage: string;
  constructor(private translate: TranslateService) {
    this.currentLanguage = translate.currentLang?.toUpperCase();
  }

  ngOnInit(): void {


    const defaultLanguage = 'en';
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);
    this.currentLanguage = this.getLanguageWithFlag(defaultLanguage);
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguage = this.getLanguageWithFlag(language);
  }

  private getLanguageWithFlag(language: string): string {
    const flagMap: { [key: string]: string } = {
      'en': '🇬🇧',
      'it': '🇮🇹',
      'de': '🇩🇪',
    };

    return `${flagMap[language as keyof typeof flagMap]} ${language.toUpperCase()}`;
  }

}
