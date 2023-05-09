import './Dex.css';
import React, { useState} from 'react';
import PokeCard from './PokeCard';

const pokemonIdLimit = 649;
const fetchLimit = 30;
const pageLimit = parseInt(pokemonIdLimit / fetchLimit);

const buttonTypes = {
  NEXT: "next",
  PREV: "prev"
}

const Dex = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="dex-container">
      <PageSelector set={setPage} page={page}/>
      <PokemonOverview page={page}/>
    </div>
  )
}

const PageSelector = ({ set, page }) => {
  return (
    <div className='page-selector'>
      <PageButton set={set} type={buttonTypes.PREV} disabled={page === 0} />
      <PageButton set={set} type={buttonTypes.NEXT} disabled={page === pageLimit} />
    </div>
  );
};

const PageButton = React.memo(({ set, type, disabled }) => {
  const handleClick = React.useCallback(() => {
    set((old) =>
      type === buttonTypes.PREV ? Math.max(old - 1, 0) : Math.min(old + 1, pageLimit)
    );
  }, [set, type, pageLimit]);

  return (
    <div onClick={handleClick} style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>  
      {type}
    </div>
  );
});

const PokemonOverview = ({page}) => {
  const firstId = 1 + (fetchLimit * page);
  const temp = firstId + fetchLimit - 1;
  const limit = temp < pokemonIdLimit ? temp : pokemonIdLimit;
  const pokemons = React.useMemo(() => {
    const p = [];
    for (let index = firstId; index <= limit; index++) {
      p.push(<PokeCard pokeId={index} key={"PokeId: " + index}/>);
    }
    return p;
  }, [page]);
  
  return (
    <div className="overview-container">
      {pokemons}
    </div>
  )
}

export default Dex;
