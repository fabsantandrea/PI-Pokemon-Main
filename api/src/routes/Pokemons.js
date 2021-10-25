const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemons, Types} = require('../db');
const axios = require('axios');
const router = Router();
const express = require('express');
router.use(express.json());
let pokemonId = 1500;

function reconTypes(array) {
    if (array.length === 1) return array[0]
    if (array.length === 2) return array[0] + ', ' + array[1]
}
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => {
    const {name} = req.query
    if (name) {
        let queryPokemonDb = Pokemons.findAll({
            where: {
                name: name
            }
        })
        .then(response => {
            if(response.length !== 0) {
             return res.send({
                name: response[0].dataValues.name,
                hp: response[0].dataValues.hp,
                attack: response[0].dataValues.attack,
                defense: response[0].dataValues.defense,
                speed: response[0].dataValues.speed,
                weight: response[0].dataValues.weight,
                height: response[0].dataValues.height,
                id: response[0].dataValues.id,
                type: response[0].dataValues.type
             })
            }

        })
        .catch(error => {
            next(error)
        })
        let queryPokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(matchedPokemon => {
        const data = matchedPokemon.data
        let pokemonImage = data.sprites.other['official-artwork'].front_default
        let pokemonStats = data.stats;
        let filteredTypes = matchedPokemon.data.types.map(pokemon => pokemon.type.name)
        return res.send(
            {
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
    
            })
        })
        .catch(error => {
            next(error)
        })

    } // ACA TERMINA EL IF(DATA)
    const pokeUrl1 = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
    const results1 = pokeUrl1.data.results;
  
    const pokeUrl2 = await axios.get(pokeUrl1.data.next);
    const results2 = pokeUrl2.data.results;
    let pokemonsPromiseApi = [...results1, ...results2]
    let pokemonsPromiseDb = Pokemons.findAll();
    Promise.all([
        pokemonsPromiseApi, pokemonsPromiseDb
    ])
    .then((response) => {
        const [pokemonsApi, pokemonsDb] = response
        let filteredPokemons = pokemonsApi.map(async (pokemon) => {
            let pokemonPromiseDetails = await axios.get(pokemon.url);
            let pokemonStats = pokemonPromiseDetails.data.stats;
            let pokemonImage = pokemonPromiseDetails.data.sprites.other['official-artwork'].front_default
            let pokemonWeight = pokemonPromiseDetails.data.weight;
            let pokemonHeight = pokemonPromiseDetails.data.height;
            let pokemonId = pokemonPromiseDetails.data.id;
            let filteredTypes = pokemonPromiseDetails.data.types.map(pokemon => pokemon.type.name)
            return {
                id: pokemonId,
                name: pokemon.name,
                image: pokemonImage,
                hp: pokemonStats[0].base_stat,
                attack: pokemonStats[1].base_stat,
                defense: pokemonStats[2].base_stat,
                speed: pokemonStats[5].base_stat,
                weight: pokemonWeight,
                height: pokemonHeight,
                type: reconTypes(filteredTypes)
            };
        });
        Promise.all(filteredPokemons)
        .then(pokemonsapi => res.send([...pokemonsapi, ...pokemonsDb]));
    })
    .catch(error => {
        next(error)
    });
})

router.get('/:id',  (req, res, next) => {
    const {id} = req.params
    if (typeof parseInt(id) === 'number') {
        let pokemonDb = Pokemons.findByPk(id)
        .then(response => {
            if (response){
               return res.send({
                    name: response.dataValues.name,
                    hp: response.dataValues.hp,
                    attack: response.dataValues.attack,
                    defense: response.dataValues.defense,
                    speed: response.dataValues.speed,
                    weight: response.dataValues.weight,
                    height: response.dataValues.height,
                    id: response.dataValues.id,
                    type: response.dataValues.type
                })
            }
                         }
        )
        let pokemonApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            const data = response.data
            let pokemonImage = data.sprites.other['official-artwork'].front_default
            let pokemonStats = data.stats;
            let filteredTypes = response.data.types.map(pokemon => pokemon.type.name)
            return res.send(
                {
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
           ) 
        })
    
        .catch(error => {
            next(error)
        })        
    } else {
        return res.status(400).send('id must be a number')
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {name, hp, attack, defense, speed, weight, height, type} = req.body
        const pokemonType = await Types.findAll({
            where: {
                name: type
            }
        })
        console.log(pokemonType)
        const newPokemon = await Pokemons.create({
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            id: pokemonId++,
            type: type
        })
        await newPokemon.addType(pokemonType[0].dataValues.id)
        return res.send(newPokemon)       
    } catch (error) {
        next(error)
    }
});

module.exports = router;