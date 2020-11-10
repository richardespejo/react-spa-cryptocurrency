import React , { useEffect , useState } from 'react';
import styled from '@emotion/styled';
import Error from './error.js';
import useMoneda from '../hooks/useMoneda.js'; 
import useCriptomoneda from '../hooks/useCriptomoneda'; 
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFFFFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptoMoneda}) => {
    //state listado de criptomoneda
    const [ listaCripto, guardarCriptomonedas] = useState([]);
    const [ error , guardarError ] = useState(false);

    useEffect( ()=>{
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }   
        consultarApi();
    }, []);

    const Monedas = [
        { codigo:'USD' , nombre:'Dolar de Estados Unidos'},
        { codigo:'MXN' , nombre:'Peso Mexicano'},
        { codigo:'EUR' , nombre:'Euro'},
        { codigo:'GBP' , nombre:'Libra Esterlina'},
    ]
    //utilizando el hook useMoneda
    const [ moneda , SelectMoneda  ] = useMoneda('Elige tu moneda' , '', Monedas);
    
    //utilizando el hook de useCriptomoneda
    const [ criptomoneda , SelectCripto  ] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda  === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null }
            <SelectMoneda />
            <SelectCripto />
            <Boton type="submit" value="Calcular"></Boton>
        </form>
     );
}
 
export default Formulario;