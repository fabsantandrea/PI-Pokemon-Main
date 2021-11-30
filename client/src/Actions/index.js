import { GET_POKEMONS, DELETE_SORT_BY_STORAGE, SORT_BY_STORAGE,
     GET_POKEMONS_BY_QUERY, SORT_BY_ATTACK, SORT_BY_NAME, 
     GET_TYPES, DELETE_QUERY, GET_POKEMONS_BY_ID, CREATE_POKEMON,
     SORT_BY_TYPE, DELETE_SORT_BY_TYPE} from "./const"
import axios from 'axios'

export function getPokemons() {
    return function (dispatch) {
        axios.get('/pokemons')
        .then(pokemons => {
            dispatch({
                type: GET_POKEMONS,
                payload: pokemons
            })
        })
    }
}
export function sortBySpeed (param) {

    return function(dispatch) {
        axios.put('/pokemons?filterBySpeed=' + param.state.filterBySpeed, param.pokemons)
        .then(pokemons => {
           
            dispatch({
                type: 'SORT_BY_SPEED',
                payload: pokemons
            })
        })
    }
}

export function getPokemonByQuery(name) {
    return function (dispatch) {
        axios.get('/pokemons/?name=' + name)
        .then(pokemons => {
        
            dispatch({
                type: GET_POKEMONS_BY_QUERY,
                payload: pokemons
            })
        })
    }
}
export function getPokemonById(id) {
    return function (dispatch) {
        axios.get('/pokemons/' + id)
        .then(pokemons => {
            
            dispatch({
                type: GET_POKEMONS_BY_ID,
                payload: pokemons
            })
        })
    }
}

export function sortByAttack(param) {
    return function (dispatch) {
        axios.put('/pokemons/?sort=' + param.state.sort + '&filter=' + param.state.filter, param.pokemons)
        .then(sortedPokemons => {
            dispatch({
                type: SORT_BY_ATTACK,
                payload: sortedPokemons
            })
        })
    }
}
export function sortByType(param) {
   
    return function (dispatch) {
        axios.put('/pokemons/?type=' + param.state.type, param.pokemons)
        .then(sortedPokemons => {
            dispatch({
                type: SORT_BY_TYPE,
                payload: sortedPokemons
            })
        })
    }
}
export function createPokemon(data) {
   
    return function (dispatch) {
        axios.post('/pokemons/', data)
        .then((pokemon) => dispatch({
            type: CREATE_POKEMON,
            payload: pokemon
        }))
    }
}


export function sortByName(param) {

//  return {
//        type: SORT_BY_NAME,
//        payload: {sort, filter}
//     }
return function (dispatch) {
    axios.put('/pokemons/?sort=' + param.state.sort + '&filter=' + param.state.filter, param.pokemons)
    .then(sortedPokemons => {
        dispatch({
            type: SORT_BY_NAME,
            payload: sortedPokemons
        })
    })
}
}
export function sortByStorage(param) {
  
    return {
       type: SORT_BY_STORAGE,
       payload: param
    }
}
export function deleteQuery() {
    return {
       type: DELETE_QUERY
    }
}
export function deleteSortByStorage() {
    return {
       type: DELETE_SORT_BY_STORAGE
    }
}
export function deleteSortByType() {
    return {
       type: DELETE_SORT_BY_TYPE
    }
}

export function getTypes() {
    return function (dispatch) {
        axios.get('/types')
        .then(types => {
            dispatch({
                type: GET_TYPES,
                payload: types
            })
        })
        .catch(error => alert('No pokemon found with that type'))
    }
}