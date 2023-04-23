import { useEffect, useState } from 'react';
import './PokeCard.css';
import pokeball from '../../assets/PokeBall.png'
import PopUp from '../../utils/PopUp';

let key = 0;

const PokeCard = ({pokemon}) => {
    const [pokeInfo, setPokeInfo] = useState(null);
    const [cought, setCaught] = useState();
    const [popUp, setPopUp] = useState(false);
    
    useEffect(() => {
        setCaught(false);
        fetch(pokemon.url)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Network Response was not dandy")
            })
            .then(res => {
                setPokeInfo(res);
                setCaught(true);
            })
            .catch(error => console.log(error));
        }, [])

    if (!cought)
        return (<>
            <div className="PokeCard-Border">
                <div className='pokeball_container'>
                    <img className="pokeball" src={pokeball} alt='Loading'/>
                </div>
            </div>
        </>)
    return (<>
        <div className="PokeCard-Border" style={gradient(pokeInfo)} onClick={() => setPopUp(true)}>
            <div className="PokeCard-Name">{pokeInfo?.name.charAt(0).toUpperCase() + pokeInfo?.name.slice(1)}</div>
            <div className='img-center'><img src={pokemonImg(pokeInfo)} alt={pokeInfo?.name}/></div>
            <div className='pokemon-id'>#{pokeInfo?.id}</div>
            <div className='pokemon-types'>{types(pokeInfo)}</div>
        </div>
        <PopUp trigger={popUp} setTrigger={setPopUp}><PokemonDiscription pokemon={pokeInfo}/></PopUp>
    </>)
}


const gradient = (pokeInfo, deg = 90, intersection = 50) => {
    if (pokeInfo == null) return;
    let types = pokeInfo.types;
    let primary = colours[types[0].type.name];
    let secondary = types.length < 2 ? primary : colours[types[1].type.name];
    return {
        background: `linear-gradient(${deg}deg, ${primary} 0%, ${primary} ${intersection}%, ${secondary} ${intersection}%, ${secondary} 100%)`
    }
}

const pokemonImg = (pokemon) => {
    return pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default === null ?  pokemon.sprites.front_default :  pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
}

const pokemonOfficialArt = (pokemon, shiny) => {
    if(!shiny)
        return pokemon.sprites.other["official-artwork"].front_default
    else
        return pokemon.sprites.other["official-artwork"].front_shiny
}

const types = (pokeInfo) => {
    if (pokeInfo == null) return;
    let types = pokeInfo.types;
    let htmlTypes = types.length < 2 ? type(types[0].type.name) : [type(types[0].type.name), type(types[1].type.name)];  
    return (<>{htmlTypes}</>)
}

const PokemonDiscription = ({pokemon}) => {
    const [isShiny, setIsShiny] = useState(false);
    return (
        <>
            <div className='poke-description' style={gradient(pokemon, 300, 58)}>
                <div className='item item-1'>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </div>
                <div className='item item-2'>
                    <img src={pokemonOfficialArt(pokemon, isShiny)}/>
                </div>
                <div className='item item-3'>
                    <div className='pokemon-types'>
                        {types(pokemon)}
                    </div>
                </div>
                <div className='item item-4'>
                    <PokemonFormButton set={setIsShiny} form={isShiny ? "normal" : "shiny"}/>
                </div>
                <div className='item item-5'>
                    <Stats stats={pokemon.stats}/>
                </div>
                <div className='item item-6'>
                    <div>Weight: {pokemon.weight / 10} kg.</div>
                    <div>Height: {pokemon.height / 10} m.</div>
                </div>
                <div className='item item-7'>
                    <Moves moves={pokemon.moves}/>
                </div>
            </div>
        </>
    )
}

const PokemonFormButton = ({set, form}) => {
    return (
        <>
        <div className={`${form} form-btn`} onClick={()=> {
            set((old) => old === true ? false : true)
        }}>  
        {form}</div>
        </>
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

const barGradient = (intersection) => {
    return  {
        background: `linear-gradient(90deg, #3B77BC 0%, #3B77BC ${intersection}%, #FFFFFF ${intersection}%, #FFFFFF 100%)`
    }
}

const type = (type) =>  <div className='type' key={key++} style={{background: `${colours[type]}`}}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>;

const colours = {
	normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
};

export default PokeCard