
import { useDispatch, useSelector } from "react-redux"
import { sortByName, sortByAttack } from "../Actions"


let state = {}
export default function Filters() {
    const pokemons = useSelector(state => state.filteredPokemons)
    const dispatch = useDispatch()
    
    const handleChange = (e) => {
        //  setFilter({
        //     ...filter,
        //     [e.target.name]: e.target.value
        //  })
        // console.log(filter)
        // if (filter.type === 'name') {
        //     dispatch(sortByName(filter))
        // }
        // if (filter.type === 'attack') {
        //     dispatch(sortByAttack({filter, pokemons}))
        // }
        state[e.target.name] = e.target.value

        if (state.filter === 'attack' && state.sort === 'asc') {
            dispatch(sortByAttack({state, pokemons}))
        }
        if (state.filter === 'attack' && state.sort === 'desc') {
            dispatch(sortByAttack({state, pokemons}))
        }
        if (state.filter === 'name' && state.sort === 'asc') {
            dispatch(sortByName({state, pokemons}))
        }
        if (state.filter === 'name' && state.sort === 'desc') {
            dispatch(sortByName({state, pokemons}))
        }
        
    }

    return <div>
        <select name= 'sort' onChange={handleChange} >
        <option >A-Z</option>
            <option value= 'desc'>Descendente</option>
            <option value= 'asc'>Ascendente</option>
        </select>
        <select name= 'filter' onChange={handleChange}>
            <option>Sort by:</option>
            <option value= 'name'>Name</option>   
            <option value= 'attack'>Attack</option> 
        </select>
    </div>
}