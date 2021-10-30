import StyledCard from "../Styles/StyledCard"


String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonCard({name,image, type}) {
    
    return <StyledCard>
         <div>
           <h1> {name.capitalizeFirstLetter()}</h1>
        </div>
        <div>
           <img src={image} alt= 'imagen' style={{maxHeight: '100px', maxWidth: '100px'}}/>
        </div>
        <div>
            <h3>{type}</h3>
        </div> 
    </StyledCard>
}