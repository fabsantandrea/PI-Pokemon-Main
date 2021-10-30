import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { createPokemon, getPokemons} from "../Actions"
let selectTypes = {
    type: '',
    type2: ''
}
export default function CreateCharacter () {
    const[pokemon, setPokemon] = useState({})
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)

    let handleChange = (e) => {
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        })
        console.log(pokemon)
    }
    let handleType = (e) => {
        selectTypes[e.target.name] = e.target.value
        console.log(selectTypes)
    
    }
    const handleSubmit = (e) => {
        dispatch(createPokemon({pokemon, selectTypes}))
        dispatch(getPokemons())
    }
    
 

    return <div>
        <div>
            <Link to= '/home'>
            <button>Back</button>
            </Link>
        <form>
            <label>Name</label>
            <input name= 'name' onChange= {handleChange}></input>
            <p></p>
            <label>Image (URL)</label>
            <input name= 'image' onChange= {handleChange}></input>
            <p></p>
            <label>HP</label>
            <input name= 'hp' onChange= {handleChange}></input>
            <p></p>
            <label>Speed</label>
            <input name= 'speed' onChange= {handleChange}></input>
            <p></p>
            <label>Attack</label>
            <input name= 'attack' onChange= {handleChange}></input>
            <p></p>
            <label>Defense</label>
            <input name= 'defense' onChange= {handleChange}></input>
            <p></p>
            <label>Height</label>
            <input name= 'height' onChange= {handleChange}></input>
            <p></p>
            <label>Weight</label>
            <input name= 'weight' onChange= {handleChange}></input>
            <p></p>
        </form>
        
            <select name= 'type' onChange={handleType}>
            <option>Type:</option>
            {types.map(type => (
                <option value={type.name}>{type.name}</option>
            ))}
            </select>
            <select name= 'type2' onChange={handleType}>
                <option>Type:</option>
            {types.map(type => (
                <option value={type.name}>{type.name}</option>
            ))}
            </select>
           <form>
               <Link to='/home'> 
           <button onClick= {handleSubmit}>Create Character</button>
           </Link>
           </form>
      </div>
    </div>
}