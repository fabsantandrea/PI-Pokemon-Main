import styled from "styled-components";


String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonDetailCard({name,image,type, attack, hp, defense, speed, weight, height, id}) {
    
    return  <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
      <div style={{justifySelf:'flex-start', paddingBottom:'100px'}}>
      <h1 style={{fontSize:'100px', height:'80px'}}>{name.capitalizeFirstLetter()}</h1>
      
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}} >
              <div>
              <img src={image} alt= 'imagen' style={{maxHeight: '300px', borderRadius:'15px'}}/>
              </div>
                <div style={{alignSelf:'center'}}>
                <h3>HP: {hp}</h3>
                <div><h3>Attack: {attack}</h3></div>
                <div><h3>Defense: {defense}</h3></div>
                <div><h3>Speed: {speed}</h3></div>
                <div><h3>Weight: {weight}</h3></div>
                <div><h3>Height: {height}</h3></div>
                <div><h3>ID: {id}</h3></div>
                <h3>{type}</h3>
                </div>    
            </div>
            </div>
           </div>
        
       
}