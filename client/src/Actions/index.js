import { GET_POKEMONS, DELETE_SORT_BY_STORAGE, SORT_BY_STORAGE,
     GET_POKEMONS_BY_QUERY, SORT_BY_ATTACK, SORT_BY_NAME, 
     GET_TYPES, DELETE_QUERY, GET_POKEMONS_BY_ID, CREATE_POKEMON,
     SORT_BY_TYPE, DELETE_SORT_BY_TYPE} from "./const"
import axios from 'axios'

export function getPokemons() {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons')
        .then(pokemons => {
            dispatch({
                type: GET_POKEMONS,
                payload: pokemons
            })
        })
    }
}
export function sortBySpeed (param) {
    console.log(param)
    return function(dispatch) {
        axios.put('http://localhost:3001/pokemons?filterBySpeed=' + param.state.filterBySpeed, param.pokemons)
        .then(pokemons => {
            console.log(pokemons, 'SOY POKEMONS')
            dispatch({
                type: 'SORT_BY_SPEED',
                payload: pokemons
            })
        })
    }
}

export function getPokemonByQuery(name) {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons/?name=' + name)
        .then(pokemons => {
            console.log(pokemons)
            dispatch({
                type: GET_POKEMONS_BY_QUERY,
                payload: pokemons
            })
        })
    }
}
export function getPokemonById(id) {
    return function (dispatch) {
        axios.get('http://localhost:3001/pokemons/' + id)
        .then(pokemons => {
            console.log(pokemons)
            dispatch({
                type: GET_POKEMONS_BY_ID,
                payload: pokemons
            })
        })
    }
}

export function sortByAttack(param) {
    return function (dispatch) {
        axios.put('http://localhost:3001/pokemons/?sort=' + param.state.sort + '&filter=' + param.state.filter, param.pokemons)
        .then(sortedPokemons => {
            dispatch({
                type: SORT_BY_ATTACK,
                payload: sortedPokemons
            })
        })
    }
}
export function sortByType(param) {
    console.log(param)
    return function (dispatch) {
        axios.put('http://localhost:3001/pokemons/?type=' + param.state.type, param.pokemons)
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
        axios.post('http://localhost:3001/pokemons/', data)
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
    axios.put('http://localhost:3001/pokemons/?sort=' + param.state.sort + '&filter=' + param.state.filter, param.pokemons)
    .then(sortedPokemons => {
        dispatch({
            type: SORT_BY_NAME,
            payload: sortedPokemons
        })
    })
}
}
export function sortByStorage(param) {
    console.log(param, 'soy param')
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
        axios.get('http://localhost:3001/types')
        .then(types => {
            dispatch({
                type: GET_TYPES,
                payload: types
            })
        })
        .catch(error => alert('No pokemon found with that type'))
    }
}