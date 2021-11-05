import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { createPokemon, deleteSortByType, getPokemons} from "../Actions"

const ErrorSpan = styled.span`
    color: #b5463c;
    font-family: fantasy;
`

const alerter = (pokemon, selectTypes, dispatch) => {
    let inputs = ['name', 'image', 'hp', 'speed', 'attack', 'defense', 'weight', 'height']
    for (let i = 0; i < inputs.length; i++) {
        if (!pokemon[inputs[i]] ) {
            return alert(`Pokemon's ${inputs[i]} can't be empty`)
        } else if (selectTypes.type.length < 1) {
            return alert(`Pokemon's type can't be empty`)
        }
       
    }
 
}

const validate =(data, pokemons) => {
    let inputs = Object.keys(data)
    const errors = {}
    let filter = pokemons.filter(pokemon => pokemon.name.toLowerCase() === data.name.toLowerCase())
    if (filter.length > 0) {
        errors.name = "That pokemon already exists, choose another name"
    }
    console.log(filter, 'soy filter')
    for (let i = 0; i < inputs.length; i++) {
        if (!data[inputs[i]]) {
            errors[inputs[i]] = inputs[i] + ` can't be empty`
        }
        if (!selectTypes.type) {
            errors.type = `Type can't be empty` 
        }
     }
    
    return errors
}


let selectTypes = {
    type: '',
    type2: ''
}
export default function CreateCharacter () {
    const pokemonList = useSelector(state => state.pokemons)
    const[pokemon, setPokemon] = useState({
        name: '',
        image: '',
        hp: '',
        speed: '',
        attack: '',
        defense: '',
        height: '',
        weight: ''
    })
    const[errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)

    let handleChange = (e) => {
        setPokemon(() =>{
        const state = {
            ...pokemon,
            [e.target.name]: e.target.value
        }
        
    return state
    }) }
    let handleType = (e) => {
        selectTypes[e.target.name] = e.target.value
    }
    const handleSubmit = (e) => {
        e.preventDefault()   
        let state = pokemon
        const validations = validate(state, pokemonList)
        const checkErrors = Object.values(errors)
        setErrors(validations)
        console.log(checkErrors, 'soy checkerrors')
        console.log(validations, 'soy valitaions')
        const check = Object.keys(validations)
        if(check.length === 0) {
        dispatch(createPokemon({pokemon, selectTypes}))
        alert('Se creó el Pokemon')
        dispatch(getPokemons())
        }
         
    }
    
 

    return <div style={{display:'flex', flexDirection:'column', alignContent:'center'}}>
        
            <Link to= '/home'>
            <button>Back</button>
            </Link>
        <form style={{alignSelf:'center', display: 'flex', flexDirection:'column', width: '15rem'}}>
            <label>Name</label>
            <input name= 'name' onChange= {handleChange} style={errors.name && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.name}</ErrorSpan>
            <p></p>
            <label>Image (URL)</label>
            <input name= 'image' onChange= {handleChange} style={errors.image && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.image}</ErrorSpan>
            <p></p>
            <label>HP</label>
            <input name= 'hp' onChange= {handleChange} style={errors.hp && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.hp}</ErrorSpan>
            <p></p>
            <label>Speed</label>
            <input name= 'speed' onChange= {handleChange} style={errors.speed && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.speed}</ErrorSpan>
            <p></p>
            <label>Attack</label>
            <input name= 'attack' onChange= {handleChange} style={errors.attack && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.attack}</ErrorSpan>
            <p></p>
            <label>Defense</label>
            <input name= 'defense' onChange= {handleChange} style={errors.defense && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.defense}</ErrorSpan>
            <p></p>
            <label>Height</label>
            <input name= 'height' onChange= {handleChange} style={errors.height && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.height}</ErrorSpan>
            <p></p>
            <label>Weight</label>
            <input name= 'weight' onChange= {handleChange} style={errors.weight && {borderColor: '#b5463c'}}></input>
            <ErrorSpan>{errors.weight}</ErrorSpan>
            <p></p>
            <select name= 'type' onChange={handleType} style={errors.type && {borderColor: '#b5463c'}}>
            <option>Type:</option>
            {types.map(type => (
                <option value={type.name} >{type.name}</option>
            ))}
            </select>
            <select name= 'type2' onChange={handleType} >
                <option>Type:</option>
            {types.map(type => (
                <option value={type.name}>{type.name}</option>
            ))}
            </select>
            <ErrorSpan>{errors.type}</ErrorSpan>
        </form>
        
       
           <form>  
           <Link to='/home'>
           <button onClick= {handleSubmit}>Create Character</button>
           </Link>
           </form>
           
    </div>
}