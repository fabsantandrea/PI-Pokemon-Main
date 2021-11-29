const {Pokemons, Types} = require('../../db.js');
const axios = require('axios')
function typeArray (array) {
    let newArray = array.map(type => type.name)
    return newArray
}

function reconTypes(array) {
    if (array.length === 1) return array[0]
    if (array.length === 2) return array[0] + ', ' + array[1]
}

const findByQuery = async (name) => {
    
    let queryPokemonDb = await Pokemons.findAll({
        where: {
            name: name.toLowerCase()
        },
        include: Types
    })
   
   
    if(queryPokemonDb.length > 0) {       
         const values = queryPokemonDb[0].types
  
        const valuesToArray = typeArray(values)
        
         return {
            name: queryPokemonDb[0].dataValues.name,
            hp: queryPokemonDb[0].dataValues.hp,
            attack: queryPokemonDb[0].dataValues.attack,
            defense: queryPokemonDb[0].dataValues.defense,
            speed: queryPokemonDb[0].dataValues.speed,
            weight: queryPokemonDb[0].dataValues.weight,
            height: queryPokemonDb[0].dataValues.height,
            id: queryPokemonDb[0].dataValues.id,
         image: queryPokemonDb[0].dataValues.image,
         type: reconTypes(valuesToArray)
         }
        } else {
            let queryPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)     
            
            const data = queryPokemon.data
            let pokemonImage = data.sprites.other['official-artwork'].front_default
            let pokemonStats = data.stats;
            let filteredTypes = queryPokemon.data.types.map(pokemon => pokemon.type.name)
            return  {
                    name: data.name,
                    image: pokemonImage,
                    hp: pokemonStats[0].base_stat,
                    attack: pokemonStats[1].base_stat,
                    defense: pokemonStats[2].base_stat,
                    speed: pokemonStats[5].base_stat,
                    height: data.height,
                    weight: data.weight,
                    id: data.id,
                    type: reconTypes(filteredTypes)
        
                }
    }
}

const getPokemons = async () => {
    const pokeUrl1 = await axios.get(`https://pokeapi.co/api/v2/pokemon`) //ESTE ES EL GET GENERAL
            const results1 =  pokeUrl1.data.results; //me traigo la primera pagina
  
            const pokeUrl2 = await axios.get(pokeUrl1.data.next);
            const results2 =  pokeUrl2.data.results; //me traigo la segunda
            
            let pokemonsPromiseApi = [...results1, ...results2]
            let pokemonsPromiseDb = await Pokemons.findAll({
                include: Types
            });
            
            let filteredDbPokemons = pokemonsPromiseDb.map(pokemon => {
                return {
                    name: pokemon.name,
                    image: pokemon.image,
                    id: pokemon.id,
                    attack: pokemon.attack,
                    speed: pokemon.speed,
                    type: reconTypes(typeArray(pokemon.types))
                }
            })
  
            let filteredPokemons = pokemonsPromiseApi.map(async (pokemon) => {
            let pokemonPromiseDetails = await axios.get(pokemon.url);
            let pokemonStats = pokemonPromiseDetails.data.stats;
            let pokemonImage = pokemonPromiseDetails.data.sprites.other['official-artwork'].front_default
            let pokemonWeight = pokemonPromiseDetails.data.weight;
            let pokemonHeight = pokemonPromiseDetails.data.height;
            let pokemonId = pokemonPromiseDetails.data.id;
            let filteredTypes = pokemonPromiseDetails.data.types.map(pokemon => pokemon.type.name) 
           
            return {
                name: pokemon.name,
                image: pokemonImage,
                attack: pokemonStats[1].base_stat,
                type: reconTypes(filteredTypes),
                speed: pokemonPromiseDetails.data.stats[5].base_stat,
                id: pokemonId
        }})
         const pokemonsApi = await Promise.all(filteredPokemons)
         const allPokemons = [...pokemonsApi, ...filteredDbPokemons]
        
        return allPokemons
         //concateno los pokemons de la db y la api
}

const findById = async(id) => {

    if (id.length < 10) {
        let pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = pokemonApi.data
        let pokemonImage = data.sprites.other['official-artwork'].front_default
        let pokemonStats = data.stats;
        let filteredTypes = data.types.map(pokemon => pokemon.type.name)
        return  {
                name: data.name,
                image: pokemonImage,
                hp: pokemonStats[0].base_stat,
                attack: pokemonStats[1].base_stat,
                defense: pokemonStats[2].base_stat,
                speed: pokemonStats[5].base_stat,
                height: data.height,
                weight: data.weight,
                id: data.id,
                type: reconTypes(filteredTypes)
    
            }
       
    }
        let pokemonDb = await Pokemons.findAll({
            where: {
                id: id
            },
            include: Types
        })
    
        const values = pokemonDb[0].dataValues
     const newTypes = typeArray(values.types)
    
            if (pokemonDb.length > 0){
               return {
                    name: values.name,
                    image: values.image,
                    hp: values.hp,
                    attack: values.attack,
                    defense: values.defense,
                    speed: values.speed,
                    weight: values.weight,
                    height: values.height,
                    id: values.id,
                    type: reconTypes(newTypes)
                }
            } 
}

const createPokemon = async(pokemon, selectTypes) => {
    console.log(pokemon, selectTypes)
    const {name, hp, attack, defense, speed, weight, height, image} = pokemon
        const {type, type2} = selectTypes
        const pokemonType = await Types.findAll({
            where: {
                name: type
            }
        })
        const pokemonType2 = await Types.findAll({
            where: {
                name: type2
            }
        })
        const newPokemon = await Pokemons.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            image: image
        })
        if (type2) {
        await newPokemon.addType(pokemonType[0].dataValues.id)
        await newPokemon.addType(pokemonType2[0].dataValues.id)
        } else {
        await newPokemon.addType(pokemonType[0].dataValues.id)   
        }
}
module.exports = {
    findByQuery,
    getPokemons,
    findById,
    createPokemon
}