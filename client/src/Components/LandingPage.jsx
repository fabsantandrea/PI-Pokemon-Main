import BackgroundImage from "../Styles/BackgroundImage"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPokemons } from "../Actions"
export default function LandingPage () {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons())
    }, [])
    return <BackgroundImage> 
        <h1>Este es el Landing Page</h1>
        <Link to='/home' style={{textDecoration: 'none', color: 'black'}}>
            <div style={{borderStyle: 'solid', width: '60px'}}>hace click pete</div>
        </Link>
    </BackgroundImage>
}