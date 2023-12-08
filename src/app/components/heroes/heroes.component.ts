import { RouterLink } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HEROES } from '../../mock-hero';
import { Hero } from './hero';
import { HeroService } from '../../services/hero.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    NgFor,
    NgIf,
    HeroeDetailComponent,
    RouterLink,
    HeroSearchComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  public heroes!: Hero[];
  public messages!: string[];
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  public selectedHero?: Hero;

  public getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  public add(name: string): void {
    name = name.trim();
    this.heroService
      .addHero({ name } as Hero)
      .subscribe((name) => this.heroes.push(name));
  }

  public delete(hero: Hero): void {
    this.heroes = this.heroes.filter((item) => item !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  ngOnInit() {
    this.getHeroes();
  }
}
