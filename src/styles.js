import styled from 'styled-components'

export const ChartWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const Button = styled.button`
  margin-top: 10px;
  border-radius: 8px;
  background-color: green;
  font-size: 16px;
  position: absolute;
  margin-right: 10px;
  cursor: pointer;
  color: white;
  padding: 5px;
`

export const ContainerSelect = styled.div`
  margin-left: 10px;
  display: flex;
  position: absolute;
  top: 8px;
`

export const ContainerBpm = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  position: absolute;
  color: green;
  bottom: 0px;
  flex-direction: column;
  height: 200px;
  border: green solid 5px;
  span {
    font-size: 100px;
  }
  
  div {
    font-size: 50px;
  }
  
`

export const Label = styled.label`
  font-size: 16px;
  margin-right: 10px;
  color: white;
`
export const Select = styled.select`
  color: white;
  background-color: green;
  font-size: 15px;
  cursor: pointer;
`

export const VitalSigns = styled.div `
      width: 100%;
`
