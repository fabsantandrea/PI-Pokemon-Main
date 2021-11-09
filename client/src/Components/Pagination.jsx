
import CardContainer from "../Styles/CardContainer"
import PButton from "../Styles/Pagination/PButton"
export default function Pagination ({pokemonsPerPage, totalPokemons, paginate}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return <CardContainer style={{gridColumnGap:' 2rem'}}>
        {pageNumbers.map(number => (
            <div key ={pageNumbers[number]} >
           <PButton onClick={() => paginate(number)} ><span style={{fontSize:'20px'}}>{number}</span></PButton></div>
        ))}
             </CardContainer>
}