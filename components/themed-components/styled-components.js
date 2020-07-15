import styled from 'vue-styled-components';


const divProps = {
  backgroundColor: String,
  borderColor: String
}

export const ThemedDiv = styled('div', divProps)`
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
`;

const containerDivProps = {
  backgroundColor: String
}

export const ThemedContainerDiv = styled('div', containerDivProps)`
  background-color: ${props => props.backgroundColor};
`;

const hamburgerDivProps = {
  backgroundColor: String
}

export const ThemedHamburgerDiv = styled('div', hamburgerDivProps)`
  background-color: ${props => props.backgroundColor};
`;

const buttonProps = {
  backgroundColor: String,
  color: String,
  borderColor: String,
  hoverBackgroundColor: String,
  hoverColor: String
};

export const ThemedButton = styled('button', buttonProps)`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-color: ${props => props.borderColor};

  &:hover {
    background-color: ${props => props.hoverBackgroundColor};
    color: ${props => props.hoverColor};
  }
`;

const h1Props = {
  color: String
}

export const ThemedH1 = styled('h1', h1Props)`
  color: ${props => props.color};
`;

const pProps = {
  color: String
}

export const ThemedP = styled('p', pProps)`
  color: ${props => props.color};
`;

const iProps = {
  color: String
}

export const ThemedI = styled('i', iProps)`
  color: ${props => props.color};
`;

const hrProps = {
  color: String
}

export const ThemedHr = styled('hr', hrProps)`
  color: ${props => props.color};
  border-color: ${props => props.color};
  background-color: ${props => props.color};
`;