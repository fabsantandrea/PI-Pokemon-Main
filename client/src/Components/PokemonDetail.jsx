import { useEffect } from "react"
import { Link } from "react-router-dom"
import { deleteQuery, getPokemonByQuery} from "../Actions"
import { PokemonStyle } from "../Styles/PokemonStyle"
import PokemonDetailCard from "./PokemonDetailCard"
import { useDispatch} from "react-redux"
import Button from '../Styles/NavBar/Button'
export default function PokemonDetail ({pokemon, match}) {
    const dispatch = useDispatch()
    useEffect(() => dispatch(getPokemonByQuery(match.params.name)), [])
    
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
        <Link to='/home' style={{width:'200px', alignSelf:'center'}}> 
        <Button style={{width:'200px'}} onClick={handleClick}>Back</Button>
        </Link>
        </div>
}