import React from 'react';
import styled from '@emotion/styled';

const  MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-family: 'Bebas Neue', cursive;
    font-weight: bold;
    text-align: center;
`;

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}
 

export default Error;