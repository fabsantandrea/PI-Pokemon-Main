import StyledCard from "../Styles/StyledCard"


String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonCard({name,image, type}) {
    let types = type.split(', ')
    console.log(types)
    return <StyledCard>
         <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
         <img src={image} alt= 'imagen' style={{maxHeight: '90px', maxWidth: '100px', borderRadius:'10px'}}/>
        </div>
      
        <div >
           
           <h2> {name.capitalizeFirstLetter()}</h2>
           <div>
            <span>{types[0].capitalizeFirstLetter()}</span>
            <br />
            {types[1] ? <span>{types[1].capitalizeFirstLetter()}</span>: console.log('hola')}
            </div>
        </div>
    </StyledCard>
}