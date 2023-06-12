import { styled } from 'styled-components';
import breakPoints from '../styles/breakPoints';

export const Flex = styled.div<{
  width?: string;
  height?: string;
  justify?: string;
  align?: string;
}>`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : 'center')};
  align-items: ${(props) => (props.align ? props.align : 'center')};
  flex-direction: ${(props) => props.dir};
  max-width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
`;

export const Img = styled.img<{ height?: string; width?: string }>`
  height: ${(props) => (props.height ? props.height : '100%')};
  width: ${(props) => (props.width ? props.width : '100%')};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-areas: 'header main';

  @media only screen and (${breakPoints.device.md}) {
    grid-template-areas:
      'header'
      'main';
  }
`;

export const MovieGrid = styled.div`
  width: 900px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (${breakPoints.device.md}) {
    width: 700px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (${breakPoints.device.sm}) {
    width: 300px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Horizontal = styled.div`
  display: flex;
`;
