import Button from "../Styles/NavBar/Button"

export default function Pagination ({pokemonsPerPage, totalPokemons, paginate}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return <div style={{display: 'flex', justifyContent: 'center', position:'static'}}>
        {pageNumbers.map(number => (
            <div  key ={pageNumbers[number]} >
           <h3><Button onClick={() => paginate(number)} style={{background:'transparent',padding:'20px', margin:'20px',borderColor:'#1f5f96', borderRadius: '20px', border:'medium solid'}}>{number}</Button></h3></div>
        ))}
             </div>
}