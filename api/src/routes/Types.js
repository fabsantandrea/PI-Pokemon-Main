const { Router, response } = require('express')
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express')
const {Types} = require('../db')
const router = Router();
router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let typeId = 1

router.get('/', async (req, res, next) => {
    const dbTypes = await Types.findAll()
    if (dbTypes.length === 0) {
        const getTypes = await axios.get('https://pokeapi.co/api/v2/type')
        const results = getTypes.data.results
        results.forEach(type => {
            Types.create({
                id: typeId++,
                name: type.name
            })
        })
        return res.send(results)
    } else {
        console.log('entre')
        return res.send(dbTypes)
    }
    
})


// const getTipos = axios.get('https://pokeapi.co/api/v2/type')
// .then(response => {
//     const resp = response.data.results
//     resp.forEach(type => {
//         Types.create({
//             id: typeId++,
//             name: type.name
//         })
//     })
// })
// .catch(error => console.log(error))

// router.get('/', async (req, res, next) => {
//     const dbTypes = await Types.findAll()
//     .then(response => {
//         res.send(response)
//     })
//     .catch(error => {
//         next(error)
//     })
       
//    })



module.exports = router;