import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/api.service';

@Component({
  selector: 'app-poke-detail',
  standalone: false,
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})


export class PokeDetailComponent implements OnInit {
  pokemonDetail: any;
  types: string[] = [];
  abilities: string[] = [];
  stats: { name: string; base_stat: number }[] = [];
  species: string = '';
  habitat: string = '';
  color: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.pokemonService.getPokemonDetails(name).subscribe(data => {
          this.pokemonDetail = data;
          this.types = data.types.map((type: any) => type.type.name);
          this.abilities = data.abilities.map((ability: any) => ability.ability.name);
          this.stats = data.stats.map((stat: any) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }));
          // Obtener detalles adicionales
          this.species = data.species?.name || 'Unknown'; // Modifica según la API
          this.habitat = data.habitat?.name || 'Unknown'; // Modifica según la API
          this.color = data.color?.name || 'Unknown'; // Modifica según la API
        });
      }
    });
  }
}