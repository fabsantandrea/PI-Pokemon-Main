import styled from "styled-components"

 const Button = styled.button`
    font-family: fantasy;
    font: 300;
    background: transparent;
    border: 1px solid #AAA;
    border-color: #2d2d2d;
    border-radius: 20px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    color: #2d2d2d;
    font-size: inherit;
    margin: 0;
    overflow: hidden;
    padding-top: 2px;
    padding-bottom: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    justify-content: center;
    &:hover{
        opacity: 70%;
    }
`
export default Button