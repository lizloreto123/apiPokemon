import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(identifier: string): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/${identifier}`);
  }
}
