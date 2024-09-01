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
  evolutionImage: string | null = null;
  hasEvolution: boolean = false;

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

          if (data.species?.url) {
            this.pokemonService.getSpecies(data.species.url).subscribe((speciesData: any) => {
              if (speciesData.evolution_chain?.url) {
                this.pokemonService.getEvolutionChain(speciesData.evolution_chain.url).subscribe((evolutionData: any) => {
                  this.extractEvolutionImage(evolutionData, name);
                });
              }
            });
          }
        });
      }
    });
  }

  extractEvolutionImage(evolutionData: any, currentPokemonName: string): void {
    let currentEvolution = evolutionData.chain;

    while (currentEvolution && currentEvolution.species.name !== currentPokemonName) {
      currentEvolution = currentEvolution.evolves_to[0];
    }

    if (currentEvolution && currentEvolution.evolves_to.length > 0) {
      const nextEvolution = currentEvolution.evolves_to[0].species.name;
      this.pokemonService.getPokemonDetails(nextEvolution).subscribe(nextEvolutionData => {
        this.evolutionImage = nextEvolutionData.sprites?.front_default || null;
        this.hasEvolution = true;
      });
    } else {
      this.evolutionImage = null;
      this.hasEvolution = false;
    }
  }
}