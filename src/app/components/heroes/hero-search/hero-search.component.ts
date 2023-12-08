import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../../../services/hero.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent {
  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService){}

  public search(term: string):void {
    this.searchTerms.next(term)
  }

  ngOnInit():void{
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }
}
