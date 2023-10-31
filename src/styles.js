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

export const InfoBoxContainer = styled.div `
   flex-basis: 25%;
   flex-grow: 0;
   flex-shrink: 0;
   max-width: 90vw;
   @include md {
       flex-basis: 25%;
   }
`

export const VitalSigns = styled.div `
      width: 100%;
`

export const InfoBox = styled.div`
      min-width: 200px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-left: 1px solid #364ba0;
      padding: 6px;
      height: 100%;
      width: 100%;
      background: radial-gradient(circle, rgb(60, 60, 63) 0%, rgb(28, 28, 30) 100%);
      border-bottom: 1px solid #364ba0;
      @include sm {
          height: auto;
      }
`

export const IbRow1 = styled.div`
      flex-grow: 1;
      display: flex;
`

export const IbRow1Col1 = styled.div`
      flex-grow: 1;
      font-size: 32px;
`

export const IbRow1Col2 = styled.div`
      text-align: right;
      margin-top: 4px;
      font-size: 12px;
`

export const IbRow2 = styled.div`
      display: flex;
      align-items: flex-end;
`

export const IbRow2Col1 = styled.div`
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      font-size: 14px;
      img {
          width: 45px;
      }
`

export const IbRow2Col2 = styled.div`
      display: flex;
      justify-content: center;
`

