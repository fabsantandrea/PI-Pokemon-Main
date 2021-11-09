import styled from "styled-components";

const StyledCard = styled.div`
    background: white;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    height: 125px;
    width: 250px;
    border-radius: 15px;
    display: flex;
    box-shadow: 1px 1px 1px 1px #2d2d2d;
    &:hover{
    opacity: 90%;
   
}
`

export default StyledCard