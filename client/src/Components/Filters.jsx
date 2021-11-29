import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { sortByName, sortByAttack, deleteQuery, sortBySpeed } from "../Actions"
import { SelectBox, Option } from '../Styles/NavBar/SelectBox'
import Button from '../Styles/NavBar/Button'
let state = {}
export default function Filters() {
    const pokemons = useSelector(state => state.filteredPokemons)
    const dispatch = useDispatch()
    

    const handleChange = (e) => {
      
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
        if (state.filterBySpeed === 'desc') {
            dispatch(sortBySpeed({state, pokemons}))
        }
    }

    return <div style={{justifySelf:'flex-end'}}>
       
        <SelectBox name= 'sort' onChange={handleChange} >
        <Option >Asc-Desc</Option>
            <Option value= 'desc'>Descendente</Option>
            <Option value= 'asc'>Ascendente</Option>
        </SelectBox>
        
        <SelectBox name= 'filter' onChange={handleChange}>
            <Option>Sort by:</Option>
            <Option value= 'name'>Name</Option>   
            <Option value= 'attack'>Attack</Option> 
        </SelectBox>
        {/* <SelectBox name= 'filterBySpeed' onChange={handleChange} >
        <Option >Speed</Option>
            <Option value= 'desc'>Descendente</Option>
            
        </SelectBox> */}
    </div>
}