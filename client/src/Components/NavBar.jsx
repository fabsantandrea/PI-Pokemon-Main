
import Filters from "./Filters"
import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom"
import { deleteQuery} from "../Actions"
import { useDispatch } from "react-redux"

import FilterByDbAndApi from "./FilterByDbAndApi"
import TypeFilter from "./TypeFilter"

export default function NavBar () {
    const dispatch = useDispatch()
    const handleClick = () => {
        
        dispatch(deleteQuery())
        
    }
    return <nav style={{background: '#b5463c', borderRadius: '1px', height:'100px'}}>
        <h1>Soy el NavBar</h1>
        <div>
            <NavLink to='/home'><button onClick={handleClick}>All Pokemons</button> </NavLink>
            <NavLink to= '/createcharacter'><button>Create Pokemon</button></NavLink>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <FilterByDbAndApi/>
            <SearchBar />
        <Filters />
        <TypeFilter />
            </div>
        
        </div>
        </nav>
}