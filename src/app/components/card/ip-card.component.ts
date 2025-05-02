import { Component, Input } from '@angular/core';
import { IpLocation } from '../../models/ipLocation.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ip-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './ip-card.component.html',
  styleUrls: ['./ip-card.component.css']
})
export class IpCardComponent {
  @Input() ipLocation: IpLocation | null = null;

  get googleMapsUrl(): string {
    if (!this.ipLocation) return '';
    return `https://maps.google.com/?q=${this.ipLocation.latitude},${this.ipLocation.longitude}`;
  }
}
