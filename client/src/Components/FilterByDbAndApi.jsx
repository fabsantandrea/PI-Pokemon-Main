import { useDispatch } from "react-redux"
import { sortByStorage } from "../Actions"

export default function FilterByDbAndApi () {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(sortByStorage(e.target.value))
    }
    return <div>
        
        <label>Filter By:</label>
        <button value= 'db' onClick={handleClick}>Created Pokemons</button>
        <label>Filter By:</label>
        <button value = 'api' onClick={handleClick}>Existing Pokemons</button>   
    </div>
}