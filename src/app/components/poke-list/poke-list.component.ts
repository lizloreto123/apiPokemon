import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-poke-list',
  standalone: false,
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})


export class PokeListComponent implements OnInit {
  allPokemonList: any[] = [];  // Lista completa de Pokémon
  filteredPokemonList: any[] = [];  // Lista filtrada para mostrar
  totalPokemon = 0;
  pageSize = 100;
  pageIndex = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadAllPokemon();
  }

  loadAllPokemon(): void {
    const pageSize = 100; // Tamaño de página para la carga inicial
    let offset = 0;
    let total = 0;

    const loadPage = (offset: number) => {
      this.pokemonService.getPokemonList(offset, pageSize).subscribe(data => {
        this.allPokemonList = [...this.allPokemonList, ...data.results];
        total = data.count;
        if (this.allPokemonList.length < total) {
          loadPage(this.allPokemonList.length); // Carga la siguiente página
        } else {
          this.filteredPokemonList = this.allPokemonList;
          this.totalPokemon = total;
        }
      });
    };

    loadPage(offset);
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filteredPokemonList = this.allPokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filterValue)
    );
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // Solo ajustar la vista paginada, no recargar los datos
  }

  getIdFromUrl(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }
}