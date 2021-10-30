import styled from 'styled-components'
import background from '../Storage/background2.jpg'

const BackgroundImage = styled.div`
background: url(${background});
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
`

export default BackgroundImage