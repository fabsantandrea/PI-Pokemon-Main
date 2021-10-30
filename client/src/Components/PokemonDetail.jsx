
import { Link } from "react-router-dom"
import PokemonDetailCard from "./PokemonDetailCard"


export default function PokemonDetail ({pokemon}) {
    return <div>
        <Link to='/home'> 
        <button>Back</button>
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
    </div>
}