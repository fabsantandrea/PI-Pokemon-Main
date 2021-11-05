import { GET_POKEMONS,DELETE_SORT_BY_STORAGE, DELETE_SORT_BY_TYPE, SORT_BY_STORAGE, GET_POKEMONS_BY_QUERY, GET_TYPES, SORT_BY_ATTACK, SORT_BY_NAME, DELETE_QUERY, GET_POKEMONS_BY_ID, CREATE_POKEMON, SORT_BY_TYPE } from "../Actions/const";


const InitialState = {
    pokemons: [],
    filteredPokemons : [],
    types: []
}

function reducer (state = InitialState, action) {
    switch(action.type) {
        case GET_POKEMONS : {
            return {
                ...state,
                pokemons: action.payload.data,
                filteredPokemons: action.payload.data
            }
        }
        case GET_POKEMONS_BY_QUERY : {
            return {
                ...state,
                filteredPokemons: [action.payload.data]
            }
        }
        case GET_POKEMONS_BY_ID : {
            return {
                ...state,
                filteredPokemons: [action.payload.data]
            }
        }
        case SORT_BY_ATTACK : {
            return {
                ...state,
                filteredPokemons: action.payload.data
            }
        }
        case SORT_BY_TYPE : {
            return {
                ...state,
                filteredPokemons: action.payload.data
            }
        }
        case SORT_BY_NAME : {
                // let sorted = state.filteredPokemons.sort(function (a, b) {
                //     if (a.name < b.name) {
                //         return action.payload.sort === 'asc' ? -1 : 1 
                //      }
                //      if (a.name > b.name) {
                //         return action.payload.sort === 'desc' ? -1: 1
                //              }
                              
                //      return 0;
                //  });
                //  console.log(sorted)
                // return {
                //     ...state,
                //     filteredPokemons: sorted
                //         }
                return {
                    ...state,
                    filteredPokemons: action.payload.data
                }  

            }
        case SORT_BY_STORAGE : {
            let sortedPokemons = [...state.pokemons]
            console.log(sortedPokemons)
            if (action.payload === 'db') {
                let sortedByDb = sortedPokemons.filter(pokemon => pokemon.id.length > 15)
                console.log(sortedByDb)
                return {
                    ...state,
                    filteredPokemons: sortedByDb
                         }     
            } else {
                sortedPokemons = [...state.pokemons]
                let sortedByApi = sortedPokemons.filter(pokemon => pokemon.id < 1500)
                return {
                    ...state,
                    filteredPokemons: sortedByApi
                         }  
            }                
        }
        case GET_TYPES: {
            return {
                ...state,
                types: action.payload.data
            }
        }
        case CREATE_POKEMON: {
            return {
                ...state,
                filteredPokemons: []
            }
        }
        case DELETE_QUERY: {
            return {
                ...state,
                filteredPokemons: [...state.pokemons]
            }
        }
        case DELETE_SORT_BY_STORAGE: {
            return {
                ...state,
                filteredPokemons: [...state.pokemons]
            }
        }
        case DELETE_SORT_BY_TYPE: {
            return {
                ...state,
                filteredPokemons: []
            }
        }
    
        default: 
            return state;
    
    }
}

export default reducer