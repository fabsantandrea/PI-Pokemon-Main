

export default function Pagination ({pokemonsPerPage, totalPokemons, paginate}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return <div style={{display: 'flex', justifyContent: 'center'}}>
        {pageNumbers.map(number => (
            <div  key ={pageNumbers[number]} >
           <span><button onClick={() => paginate(number)}>{number}</button></span></div>
        ))}
             </div>
}