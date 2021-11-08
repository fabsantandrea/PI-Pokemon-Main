import styled from "styled-components";

const StyledCard = styled.div`
    background: #069e9e;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    height: 150px;
    width: 250px;
    border-radius: 15px;
    display: flex;
    justify-content: space-evenly;
    &:hover{
    opacity: 90%;
}
`

export default StyledCard