import { useDispatch } from "react-redux"
import { sortByStorage } from "../Actions"
import  Button  from "../Styles/NavBar/Button"
export default function FilterByDbAndApi () {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(sortByStorage(e.target.value))
    }
    return <div>
        
        <span>Filter By:         </span>
        <Button value= 'db' onClick={handleClick}> Created Pokemons</Button>

        <Button value = 'api' onClick={handleClick}> Existing Pokemons</Button>   
    </div>
}