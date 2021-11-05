import styled from "styled-components"
import pokedex from "../Storage/Pokedex.png"
export const PokemonStyle = styled.div`
    background: url(${pokedex});
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
    height: 700px;
    display:flex;
    justify-content: flex-start;
`