import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Hero } from '../components/heroes/hero';
import { HEROES } from '../mock-hero';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private heroes: Hero[] = HEROES;
  private heroesUrl = '/api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private log(message: string) {
    this.messageService.add(`Hero Service::: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  get allHeroes() {
    return this.heroes;
  }

  public getHeroes(): Observable<Hero[]> {
    // const heroes = of(this.heroes)
    // this.messageService.add('HeroService: fetched heroes')
    // return heroes;

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  public getHero(id: number): Observable<Hero | undefined> {
    // const hero = of(this.allHeroes.find((hero) => hero.id === id));
    // this.messageService.add('HeroService: fetch hero by id');
    // return hero;

    const urlHero = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(urlHero).pipe(
      tap((_) => this.log(`fetch hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http
      .put<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(
          (_) => this.log(`updated hero id=${hero.id}`),
          catchError(this.handleError<any>('updateHero'))
        )
      );
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(
          (_) => this.log(`added Hero with id=${_.id}`),
          catchError(this.handleError<Hero>('addHero'))
        )
      );
  }

  public deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/$id}`;
    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(
          (_) => this.log(`deleted hero id=${id}`),
          catchError(this.handleError<Error>('deleteHero'))
        )
      );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((_) =>
          _.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ), catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }
}
