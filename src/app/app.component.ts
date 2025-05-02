import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IpstackService } from './services/ipstack.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ipAddress = '134.201.250.155';
  ipLocations: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private ipstackService: IpstackService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.configureTranslations();
    this.testTranslations();
  }

  private configureTranslations(): void {
    // 1. Configura los idiomas disponibles
    this.translate.addLangs(['en', 'es']);

    // 2. Establece un idioma por defecto
    this.translate.setDefaultLang('en');

    // 3. Intenta usar el idioma del navegador o fallback a 'en'
    const browserLang = this.translate.getBrowserLang();
    const useLang = browserLang?.match(/en|es/) ? browserLang : 'en';

    // 4. Carga las traducciones
    this.translate.use(useLang).subscribe({
      next: () => console.log(`Idioma establecido: ${useLang}`),
      error: (err) => {
        console.error('Error al cargar idioma:', err);
        this.translate.use('en');
      }
    });
  }

  private testTranslations(): void {
    // Verifica que las traducciones básicas estén cargadas
    const testKeys = ['APP_TITLE', 'COPYRIGHT', 'DEVELOPED_BY'];
    testKeys.forEach(key => {
      this.translate.get(key).subscribe({
        next: (res) => console.log(`TRADUCCIÓN [${key}]:`, res),
        error: (err) => console.error(`ERROR TRADUCCIÓN [${key}]:`, err)
      });
    });
  }

  getIpLocation(): void {
    if (!this.ipAddress) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.ipstackService.getIpLocation(this.ipAddress).subscribe({
      next: (data) => {
        if (data.error) {
          this.errorMessage = this.translate.instant('API_ERROR', { error: data.error.info });
        } else {
          this.ipLocations.unshift(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = this.translate.instant('CONNECTION_ERROR');
        this.isLoading = false;
      }
    });
  }
}
