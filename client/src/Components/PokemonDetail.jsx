import { useEffect } from "react"
import { Link } from "react-router-dom"
import { deleteQuery, getPokemonByQuery, getPokemons } from "../Actions"
import { PokemonStyle } from "../Styles/PokemonStyle"
import PokemonDetailCard from "./PokemonDetailCard"
import { useDispatch, useSelector} from "react-redux"
import Button from '../Styles/NavBar/Button'
export default function PokemonDetail ({pokemon}) {
    const dispatch = useDispatch()
    useEffect(() => dispatch(getPokemonByQuery(pokemon.name)), [])
    
    const handleClick = () => dispatch(deleteQuery());

    return  <div style={{display:'flex', flexDirection:'column'}}>
         <PokemonStyle>   
        <PokemonDetailCard 
        attack={pokemon.attack}
        hp={pokemon.hp}
        speed={pokemon.speed}
        type={pokemon.type}
        weight={pokemon.weight}
        height={pokemon.height}
        image={pokemon.image}
        name={pokemon.name}
        defense={pokemon.defense}
        id={pokemon.id}
        
        />
        
        </PokemonStyle>
        <br/>
        <Link to='/home'> 
        <Button style={{width:'200px'}} onClick={handleClick}>Back</Button>
        </Link>
        </div>
}