import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPokemonByQuery } from "../Actions"
import { LoadingPokeball } from "../Styles/LoadingPokeball"
export default function Pokeball({match}) {
    const dispatch = useDispatch()
    useEffect(() => match && dispatch(getPokemonByQuery(match.params.name)))
    return <div style={{ alignSelf:'center'}}>
        <LoadingPokeball>
        </LoadingPokeball>
    </div>
}