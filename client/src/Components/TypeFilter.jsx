import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, sortByType } from "../Actions"
import { SelectBox } from "../Styles/NavBar/SelectBox"
let state = {}
export default function TypeFilter () {
    const pokemons = useSelector(state => state.pokemons)
    useEffect(() => dispatch(getTypes()), [])
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    const handleChange = (e) => {
        state[e.target.name] = e.target.value
        console.log(state)
        dispatch(sortByType({state, pokemons}))
    }
   
    return <div>
        
        <SelectBox  style={{background:'#89B5AF'}} name= 'type' onChange={handleChange}>
            <option>Type:</option>
            {types.map(type => (
                <option key={type.id} value={type.name}>{type.name}</option>
            ))}
            </SelectBox>
    </div>
}