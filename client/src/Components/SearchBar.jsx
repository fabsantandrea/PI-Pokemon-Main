import { useState } from "react"
import { useDispatch} from "react-redux"

import { deleteQuery, getPokemonById, getPokemonByQuery } from "../Actions"
import Input from "../Styles/NavBar/Input";

function hasNumber(string) {
    return /\d/.test(string);
  }

export default function SearchBar() {
    const [pokemon, setPokemon] = useState({
    })
    let dispatch = useDispatch()
    let handleChange = (e) => {
        setPokemon({
            ...pokemon,
            name: e.target.value
        })
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        if (pokemon.name) {
            if (hasNumber(pokemon.name)){
                dispatch(getPokemonById(pokemon.name))
            } else {
                dispatch(getPokemonByQuery(pokemon.name.trim()))
            }
            
        } else {
            dispatch(deleteQuery())
        }
   
    }
    return <div>   
        <form onSubmit= {handleSubmit}>
        <Input name= 'name' placeholder='Insert name or ID' onChange= {handleChange}></Input>
        </form>    
    </div>
}