import {BackgroundImage, TitleDiv } from "../Styles/BackgroundImage"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPokemons } from "../Actions"
import Button from "../Styles/NavBar/Button"

export default function LandingPage () {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons())
    }, [])
    return <BackgroundImage>
        <TitleDiv>
        <h1 style={{fontSize:'100px'}}>Welcome!</h1>
        <Link to='/home'>
            <Button style={{height:'100px', width:'300px'}}><h1>Enter Website</h1></Button>
        </Link>
        </TitleDiv>
    </BackgroundImage>
}