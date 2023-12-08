import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { Hero } from './../heroes/hero';
import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroSearchComponent } from '../heroes/hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  public getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(0, 5)));
  }

  ngOnInit() {
    this.getHeroes();
  }
}
