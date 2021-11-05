import styled from 'styled-components'

export const LoadingPokeball = styled.div`
    background: url('https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-2.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
    width: 100px;
    height: 100px;
    transition-property: transform;
    transition-duration: 1s;
    animation-name: rotate; 
    animation-duration: 0.5s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;
@keyframes rotate {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}


`
