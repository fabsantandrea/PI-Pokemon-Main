const { Router, query } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemons, Types} = require('../db');
const axios = require('axios');
const router = Router();
const express = require('express');
const { findByQuery, getPokemons, findById, createPokemon } = require('./Controllers/Controllers');
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => { //ESTO ES PARA EL QUERY
   const name = req.query.name
   if (name) {
        try {
           const result = await findByQuery(name)
           res.send(result)
        } catch (error) {
            res.status(404).send('Pokemon not found')
        }
   } else { 
       try {
            const allPokemons = await getPokemons() 
            res.send(allPokemons)
        }  catch {
            res.send('There was a problem, try again later')
        }  
       
   }
})

router.get('/:id',  async (req, res, next) => {
    const {id} = req.params
    try {
       const foundPokemon = await findById(id)
        res.send(foundPokemon)
    } catch (error) {
        res.status(404).send('Pokemon not found.')
    }
});
router.put('/', async (req, res, next) => {
    const type = req.query.type 
    const filterSpeed = req.query.filterBySpeed

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
       if (filterSpeed === 'desc') {
            let pokemons = req.body
            let filteredPokemons = pokemons.filter(pokemon => pokemon.speed > 50)
        
            return res.send(filteredPokemons)
       }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    console.log(req.body)
    try {
     createPokemon(req.body.pokemon, req.body.selectTypes)
     res.send('Se creó el Pokemon')      
    } catch (error) {
        next(error)
    }
});

module.exports = router;