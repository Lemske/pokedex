
export const colours = {
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

export const typeGradient = (types, deg = 90, intersection = 50) => {
    let primary = colours[types[0]];
    let secondary = types.length < 2 ? primary : colours[types[1]];
    return {
        background: `linear-gradient(${deg}deg, ${primary} 0%, ${primary} ${intersection}%, ${secondary} ${intersection}%, ${secondary} 100%)`
    }
}

export const backgroundColor =  (type) => {
	return {
		backgroundColor: `${colours[type]}`
	}
}

export const barGradient = (intersection) => {
    return  {
        background: `linear-gradient(90deg, #3B77BC 0%, #3B77BC ${intersection}%, #FFFFFF ${intersection}%, #FFFFFF 100%)`
    }
}