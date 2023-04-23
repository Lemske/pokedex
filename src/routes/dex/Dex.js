import './Dex.css';
import React, {useEffect, useState} from 'react';
import PokeCard from './PokeCard';

const fetchLimit = 30;
const pageLimit = 42;

const buttonTypes = {
  NEXT: "next",
  PREV: "prev"
}

const Dex = () => {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  
  useEffect(() => {
    getEm(page, setPokemons);
  }, [page]);

   return (
     <div className="App">
        <PageSelector set={setPage}/>
        <PokemonOverview pokemons={pokemons}/>
     </div>
   )
}

const PageSelector = ({set}) => {
  return (
    <>
      <div className='page-selector'>
        <PageButton set={set} type={buttonTypes.PREV}/>
        <PageButton set={set} type={buttonTypes.NEXT}/>
      </div>
    </>
  )
}

const PageButton = ({set, type}) => {
  return (
    <>
      <div onClick={()=> {
        type === buttonTypes.PREV ? set((old) => old === 0 ? 0 : old-1) : set((old) => old === pageLimit ? pageLimit : old+1);
        }}>  
      {type}</div>
    </>
  ) 
}

const PokemonOverview = ({pokemons}) => { 
  return (
    <>
      <div className="container">
        {pokemons.map(pokemon => <PokeCard pokemon={pokemon}  key={pokemon.name}/>)}
      </div>
    </>
  )
}


const pokemonUrl = (offset) => {
  return  `https://pokeapi.co/api/v2/pokemon/?limit=${fetchLimit}&offset=${offset*fetchLimit}`;
}

const getEm = (page, set) => {
  fetch(pokemonUrl(page))
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Network Response was not dandy")
      })
      .then(res => {
        set(res.results);
      })
      .catch(error => console.log(error));
}


export default Dex;
