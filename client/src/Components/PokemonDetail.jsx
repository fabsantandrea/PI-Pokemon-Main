import { useEffect } from "react"
import { Link } from "react-router-dom"
import { deleteQuery, getPokemonByQuery, getPokemons } from "../Actions"
import { PokemonStyle } from "../Styles/PokemonStyle"
import PokemonDetailCard from "./PokemonDetailCard"
import { useDispatch, useSelector} from "react-redux"

export default function PokemonDetail ({pokemon}) {

    const dispatch = useDispatch()
    useEffect(() => dispatch(getPokemonByQuery(pokemon.name)), [])
    const handleClick = () => dispatch(deleteQuery());
    return <div style={{display:"flex", height: '900px', flexDirection:'column'}}>
        <PokemonStyle>
        <Link to='/home'> 
        <button onClick={handleClick}>Back</button>
        </Link>
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
    </div>
}