const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemons, Types} = require('../db');
const axios = require('axios');
const router = Router();
const express = require('express');
router.use(express.json());

function typesToString (type, type2) {
    if (type && type2){
        return type + ', ' + type2
    } else {
        return type
    }
}
function reconTypes(array) {
    if (array.length === 1) return array[0]
    if (array.length === 2) return array[0] + ', ' + array[1]
}
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res, next) => { //ESTO ES PARA EL QUERY
   const {name} = req.query
   if (name) {
        try {
            let queryPokemonDb = Pokemons.findAll({
                where: {
                    name: name.toLowerCase()
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
                } else {
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
                }
    
            })
            .catch(error => {
                next(error)
            })
//-------------------------TERMINA EL QUERY DE DB-----------------------------
  // TERMINA EL QUERY GENERAL
        } catch (error) {
            next(error)
        }
   } else { // EMPIEZA EL GET GENERAL
       try {
           const pokeUrl1 = await axios.get(`https://pokeapi.co/api/v2/pokemon`) //ESTE ES EL GET GENERAL
    const results1 = pokeUrl1.data.results; //me traigo la primera pagina
  
    const pokeUrl2 = await axios.get(pokeUrl1.data.next);
    const results2 = pokeUrl2.data.results; //me traigo la segunda
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
        .then(pokemonsapi => res.send([...pokemonsapi, ...pokemonsDb])); //concateno los pokemons de la db y la api
    })
       } catch (error) {
           next(error)
       }
   }
})

router.get('/:id',  (req, res, next) => {
    const {id} = req.params
    
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
});
router.put('/', (req, res, next) => {
    const type = req.query.type
    console.log(req.query)
    
    try {
        if (req.query.filter && req.query.sort) {
            if (req.query.filter === 'attack') {
                let pokemons = req.body
                pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                      return 1;
                    }
                    if (a.attack < b.attack) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });
                  if (req.query.sort === 'desc') {
                      
                      return res.send(pokemons.reverse())
                  }
                  return res.send(pokemons)
            }
            if (req.query.filter === 'name') {
                let pokemons = req.body
                let sorted = pokemons.sort(function (a, b) {
                    if (a.name < b.name) {
                        return req.query.sort === 'asc' ? -1 : 1 
                     }
                     if (a.name > b.name) {
                        return req.query.sort === 'desc' ? -1: 1
                             }
                              
                     return 0;
                 });
                  return res.send(sorted)
            }
        
        }
        if (type) {
            let pokemons = req.body
            let typePokemon = pokemons.filter(pokemon => pokemon.type.includes(type))
            if (typePokemon.length >= 1) res.send(typePokemon)
            else res.status(404).send(' no se encontro ese pokemon')
        }
        // if (sort)
    
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, hp, attack, defense, speed, weight, height, image} = req.body.pokemon
        const {type, type2} = req.body.selectTypes
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
            type: typesToString(type, type2),
            image: image
        })
        if (type2) {
        await newPokemon.addType(pokemonType[0].dataValues.id)
        await newPokemon.addType(pokemonType2[0].dataValues.id)
        } else {
        await newPokemon.addType(pokemonType[0].dataValues.id)   
        }      
        return res.send(newPokemon)       
    } catch (error) {
        next(error)
    }
});

module.exports = router;