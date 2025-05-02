import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {

  }

  switchLanguage(language: string): void {
    this.currentLanguage = language;
    this.translate.use(language).subscribe({
      next: () => console.log('Idioma cambiado:', language),
      error: (err) => console.error('Error cambiando idioma:', err)
    });
  }
}
