import { TSectionNav } from './types/app.type';
import { MessagesComponent } from './components/messages/messages.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import {HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeroesComponent,
    MessagesComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'demo-app';
  public local = '123456';
  public routes: TSectionNav[] = [
    { name: 'Heroes', link: ['/heroes'] },
    { name: 'Dashboard', link: ['/dashboard'] },
  ];

}
