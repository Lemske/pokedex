import { useState } from 'react';
import './PokeCard.css';
import pokeball from '../../assets/PokeBall.png'
import PopUp from '../../utils/PopUp';
import { useFetchPokemonId } from '../../utils/pokeAPI';
import { typeGradient, barGradient, colours, backgroundColor } from '../../utils/pokeColours';

let key = 0;

const PokeCard = ({pokeId}) => {
    const [pokemon, isLoading] = useFetchPokemonId(pokeId);
    const [popUp, setPopUp] = useState(false);
    
    if (isLoading)
        return (
            <div className="PokeCard-Border shake">
                <div className='pokeball_container'>
                    <img className="pokeball" src={pokeball} alt='Loading'/>
                </div>
            </div>
        );
    return (<>
        <div className="PokeCard-Border pop"  onClick={() => setPopUp(true)}>
            <div className='rotation-bg'>
                {background(pokemon.types)}
            </div>
            <div className="PokeCard-Name get-in">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
            <div className='img-center get-in'><img src={pokemon.icon} alt={pokemon.name}/></div>
            <div className='pokemon-id get-in'>#{pokemon.id}</div>
            <div className='pokemon-types get-in'>{types(pokemon.types)}</div>
        </div>
        <PopUp trigger={popUp} setTrigger={setPopUp}><PokemonDiscription pokemon={pokemon}/></PopUp>
    </>)
}

const background = (types) => {
    let primary = types[0];
    let secondary = types.length < 2 ? primary : types[1];
    return (<>
        <div className="left move" style={backgroundColor(primary)}></div>
        <div className="right move" style={backgroundColor(secondary)}></div>
    </>)
}

const types = (types) => {
    if (types == null) return;
    let htmlTypes = types.length < 2 ? type(types[0]) : [type(types[0]), type(types[1])];  
    return (<>{htmlTypes}</>)
}

const PokemonDiscription = ({pokemon}) => {
    const [isShiny, setIsShiny] = useState(false);
    return (
        <div className='poke-description' style={typeGradient(pokemon.types, 300, 58)}>
            <div className='item item-1'>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
            <div className='item item-2'>
                <img src={isShiny ? pokemon.officialArtShiny : pokemon.officialArt}/>
            </div>
            <div className='item item-3'>
                <div className='pokemon-types'>
                    {types(pokemon.types)}
                </div>
            </div>
            <div className='item item-4'>
                <PokemonFormButton set={setIsShiny} form={isShiny ? "normal" : "shiny"}/>
            </div>
            <div className='item item-5'>
                <Stats stats={pokemon.stats}/>
            </div>
            <div className='item item-6'>
                <div>Weight: {pokemon.weight} kg.</div>
                <div>Height: {pokemon.height} m.</div>
            </div>
            <div className='item item-7'>
                <Moves moves={pokemon.moves}/>
            </div>
        </div>
    )
}

const PokemonFormButton = ({set, form}) => {
    return (
        <div className={`${form} form-btn`} onClick={()=> {
            set((old) => old === true ? false : true)
        }}>  
        {form}</div>
    ) 
}

const Stats = ({stats}) => {
    const maxStat = 255;
    const statBars = [];
    stats.forEach(stat => {
        let intersection = parseInt((stat.base_stat / maxStat)*100);
        statBars.push(
            <div key={stat.stat.name}>
                <div className='stat-value'>{stat.stat.name.replace("-"," ")} : {stat.base_stat}</div>
                <div className='bar' style={barGradient(intersection)}></div>
            </div>
        );
    });
    return (
        <div className='stats'>
            {statBars}
        </div>
    )
}

const Moves = ({moves}) => {
    const moveSet = [];
    moves.forEach(move => {
        moveSet.push(
            <div key={move.move.name}>{move.move.name.replace("-", " ")}</div>
        );
    });
    return (
        <div className='moves'>
            {moveSet}
        </div>
    )
}

const type = (type) => <div className='type' key={key++} style={{background: `${colours[type]}`}}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>;

export default PokeCard