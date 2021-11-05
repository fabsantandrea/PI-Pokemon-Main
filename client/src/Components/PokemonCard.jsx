import StyledCard from "../Styles/StyledCard"


String.prototype.capitalizeFirstLetter = function () {
  if (this){
    return this.charAt(0).toUpperCase() + this.slice(1);}
  }

export default function PokemonCard({name,image, type}) {
    
    return <StyledCard>
         <div style={{height:'20%', borderRadius: '15px',display:'flex', flexDirection:'column', alignContent:'flex-start', justifyContent:'center'}}>
           <h1 > {name.capitalizeFirstLetter()}</h1>
        </div>
      
        <div style={{background:'#1f5f96'}}>
           <img src={image} alt= 'imagen' style={{maxHeight: '100px', maxWidth: '100px'}}/>
           </div>
           <div style={{background: '#ebbf7c',height:'20%', borderRadius: '15px',display:'flex', flexDirection:'column', alignContent:'flex-start', justifyContent:'center'}}>
            <h3>{type}</h3>
            </div>
    </StyledCard>
}