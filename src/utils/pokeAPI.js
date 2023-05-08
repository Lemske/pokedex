import { useEffect, useState } from 'react';

const pokeapi = "https://pokeapi.co/api/v2/pokemon/";

export class Pokemon {
    constructor(props) {
        this.name = props.name;
        this.id = props.id;
        this.types = props.types.length < 2 ? [props.types[0].type.name] : [props.types[0].type.name, props.types[1].type.name];
        this.icon = props.sprites.versions["generation-v"]["black-white"].animated.front_default === null ?  props.sprites.front_default :  props.sprites.versions["generation-v"]["black-white"].animated.front_default;
        this.officialArt = props.sprites.other["official-artwork"].front_default;
        this.officialArtShiny = props.sprites.other["official-artwork"].front_shiny;
        this.stats = props.stats;
        this.moves = props.moves;
        this.weight = props.weight / 10;
        this.height = props.height / 10;
    }
}

export const useFetchPokemonId = (id) => {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      fetch(pokeapi + id)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Network response was not dandy');
        })
        .then((res) => {      
          setPokemon(new Pokemon(res));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, [id]);

    return [pokemon, isLoading];
}
