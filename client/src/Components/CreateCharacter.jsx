import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { createPokemon, getPokemons} from "../Actions"
import  Input  from "../Styles/NavBar/Input"
import  Button  from "../Styles/NavBar/Button"
import { SelectBox, Option } from "../Styles/NavBar/SelectBox"
import FormContainer from "../Styles/Create Character/Form Container"
const ErrorSpan = styled.span`
    color: #b5463c;
    font-family: fantasy;
`
String.prototype.capitalizeFirstLetter = function () {
    if (this){
      return this.charAt(0).toUpperCase() + this.slice(1);}
    }
// const alerter = (pokemon, selectTypes, dispatch) => {
//     let inputs = ['name', 'image', 'hp', 'speed', 'attack', 'defense', 'weight', 'height']
//     for (let i = 0; i < inputs.length; i++) {
//         if (!pokemon[inputs[i]] ) {
//             return alert(`Pokemon's ${inputs[i]} can't be empty`)
//         } else if (selectTypes.type.length < 1) {
//             return alert(`Pokemon's type can't be empty`)
//         }
       
//     }
 
// }

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
            errors[inputs[i]] = inputs[i].capitalizeFirstLetter() + ` can't be empty`
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
    
 

    return <div style={{display:'flex',  flexDirection:'column', alignContent:'center'}}>
        
         
            <br />
           
            <FormContainer >
            <h1>CREATE YOUR OWN POKEMON</h1>
            <br />
        <form >
            <label>Name</label>
            <Input name= 'name' onChange= {handleChange} style={errors.name && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.name}</ErrorSpan>
            <p></p>
            <label>Image (URL)</label>
            <Input name= 'image' onChange= {handleChange} style={errors.image && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.image}</ErrorSpan>
            <p></p>
            <label>HP</label>
            <Input name= 'hp' onChange= {handleChange} style={errors.hp && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.hp}</ErrorSpan>
            <p></p>
            <label>Speed</label>
            <Input name= 'speed' onChange= {handleChange} style={errors.speed && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.speed}</ErrorSpan>
            <p></p>
            <label>Attack</label>
            <Input name= 'attack' onChange= {handleChange} style={errors.attack && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.attack}</ErrorSpan>
            <p></p>
            <label>Defense</label>
            <Input name= 'defense' onChange= {handleChange} style={errors.defense && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.defense}</ErrorSpan>
            <p></p>
            <label>Height</label>
            <Input name= 'height' onChange= {handleChange} style={errors.height && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.height}</ErrorSpan>
            <p></p>
            <label>Weight</label>
            <Input name= 'weight' onChange= {handleChange} style={errors.weight && {borderColor: '#b5463c'}}></Input>
            <ErrorSpan>{errors.weight}</ErrorSpan>
            <br/>
            <br/>
            <br/>
            <SelectBox name= 'type' onChange={handleType} style={errors.type && {borderColor: '#b5463c'}}> 
            <Option>Type:</Option>
            {types.map(type => (
                <Option value={type.name} >{type.name.capitalizeFirstLetter()}</Option>
            ))}
            </SelectBox>
            <SelectBox name= 'type2' onChange={handleType} >
                <Option>Type:</Option>
            {types.map(type => (
                <Option value={type.name}>{type.name.capitalizeFirstLetter()}</Option>
            ))}
            </SelectBox>
            <ErrorSpan>{errors.type}</ErrorSpan>
        </form>
                <br />
                <br />
           <form>  
           <Link to='/home'>
           <Button onClick= {handleSubmit} style={{width: '400px'}}>Create Character</Button>
           </Link>
           </form>
           
            </FormContainer>
            <br/>
            <Link to= '/home'>
            <Button>Back</Button>
            </Link>
           
    </div>
}