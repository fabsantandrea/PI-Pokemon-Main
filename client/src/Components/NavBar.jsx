
import Filters from "./Filters"
import SearchBar from "./SearchBar"
import { NavLink } from "react-router-dom"
import { deleteQuery} from "../Actions"
import { useDispatch } from "react-redux"
import Button from "../Styles/NavBar/Button"
import FilterByDbAndApi from "./FilterByDbAndApi"
import TypeFilter from "./TypeFilter"
import { StyledNav } from "../Styles/NavBar/NavBar"

export default function NavBar () {
    const dispatch = useDispatch()
    const handleClick = () => {
        
        dispatch(deleteQuery())
        
    }
    return <StyledNav >
        {/* <img 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png'
        style = {{width:'150px', paddingTop:'100px', paddingLeft:'50px'}}
        /> */}
        <NavLink to= '/createcharacter'><Button>Create Pokemon</Button></NavLink>
        <br/>
        <SearchBar />
        <br/>
        <div style={{display: 'flex', alignSelf:'center'}}>
        <FilterByDbAndApi/>
        <NavLink to='/home'><Button onClick={handleClick}>All Pokemons</Button> </NavLink>
        <Filters />
        <TypeFilter />
        </div>
        </StyledNav>
}