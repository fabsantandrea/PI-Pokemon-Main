import { PokemonStyle } from "../Styles/PokemonStyle";

import pokedex from "../Storage/Pokedex.png"

String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonDetailCard({name,image,type, attack, hp, defense, speed, weight, height, id}) {
    
    return <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}} >
      <div>
           <img src={image} alt= 'imagen' style={{maxHeight: '1000px', maxWidth: '1000px'}}/>
        </div>
         <div>
         <h1>{name.capitalizeFirstLetter()}</h1>
        <span>HP: {hp}</span>
        <div><span>Attack: {attack}</span></div>
        <div><span>Defense:{defense}</span></div>
        <div><span>Speed:{speed}</span></div>
        <div><span>Weight:{weight}</span></div>
        <div><span>Height:{height}</span></div>
        <div><span>ID:{id}</span></div>
        <h3>{type}</h3>
        </div>
        
        
        
          </div>
}