import styled from "styled-components";

const Input = styled.input`
width: 500px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
-webkit-appearance: button;
    -moz-appearance: button;
    -webkit-padding-end: 20px;
    -moz-padding-end: 20px;
    -webkit-padding-start: 2px;
    -moz-padding-start: 2px;
    border: medium solid #AAA;
    border-radius: 20px;
    border-color: #5c5d5d;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: inherit;
    margin: 0;
    overflow: hidden;
    padding-top: 2px;
    padding-bottom: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
`
export default Input