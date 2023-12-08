import styled from 'styled-components';
import backGround from '../assets/ecg_back.png';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
    ::-webkit-scrollbar {
      display: none
    }
    z-index: 1;
`;

export const Button = styled.button`
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;
  background-image: ${(props) => props?.icon && `url(${props.icon})`};
  background-size: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

export const ContainerEcg = styled.div`
  background-image: url(${backGround}) ;
  position: relative;
  height: 300px;
  width: 90vw;
  //style="background-image: url(ecg_back.png); position: relative; height: 250px; width: 1000px;"
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  justify-content: space-around;
`;

export const ButtonGroup = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
  /* margin-bottom: 20px; */
  width: 98vw;
  justify-content: center;
`

export const ButtonSelect = styled.button`
  margin: 20px;
  padding: 10px;
  cursor: pointer;
`
