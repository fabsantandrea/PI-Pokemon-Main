import { PokemonStyle } from "../Styles/PokemonStyle";

import pokedex from "../Storage/Pokedex.png"

String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonDetailCard({name,image,type, attack, hp, defense, speed, weight, height, id}) {
    
    return <div>
     
     {/* <img src={pokedex} style={{width:'60%'}} ></img> */}
         <div>
           <h1>{name.capitalizeFirstLetter()}</h1>
        </div>
        <div>
           <img src={image} alt= 'imagen' style={{maxHeight: '100px', maxWidth: '100px'}}/>
        </div>
        <div>
            <h3>{type}</h3>
        </div>
        <span>HP: {hp}</span>
        <div><span>Attack: {attack}</span></div>
        <div><span>Defense:{defense}</span></div>
        <div><span>Speed:{speed}</span></div>
        <div><span>Weight:{weight}</span></div>
        <div><span>Height:{height}</span></div>
        <div><span>ID:{id}</span></div>
        
          </div>
}