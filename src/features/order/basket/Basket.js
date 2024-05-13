import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ProductInBasket from './ProductInBasket..js';
import { useSelector, useDispatch } from 'react-redux'
import { okToOrder } from './basketSlice.js'

import './Basket.css';



const Basket = () => {

    const basket = useSelector((state) => state.basket.basketArr);

    const currentUser1 = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();


    const routeChange = async () => {
        okToOrder(basket)
        navigate("/checkout");
    }



    function calculateSum() {
        let sum = 0;
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].count > 1)
                sum += (basket[i].price) * (basket[i].count)
            else
                sum += basket[i].price;
        }
        return sum;
    }

    const StyledButton = styled(Button)(({ theme }) => ({

        width: "23vw",
        backgroundColor: '#cb1021',

        color: 'white',
        padding: '10px 20px',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: 'white',
            color: '#cb1021',
            border: '2px solid #cb1021',
        },
    }));
    return (<>

        {basket.length == 0 && <h1 >Your Shopping Cart is Empty</h1>}

        {basket.length > 0 && <div className='all-page'>

            <h2 id='title'>Shopping Cart </h2>
            <input type='button' className='back-button' value="Back to shopping" onClick={() => { navigate("/watches"); }} />

            <div className='all-container'>
                <div className='section'>
                    {basket.map(item => <li key={item._id}  ><ProductInBasket product={item} /></li>)}
                </div>
                <div className='section' id='summary' >

                    <p className='start'>ORDER SUMMARY</p>
                    <p> Subtotal         {'$' + Number(calculateSum()).toLocaleString('en')}</p>
                    <p> Shipping cost    FREE </p>
                    <p>Estimated Tax     $0.00 </p>
                    <p className='end'>  ESTIMATED TOTAL:    {'$' + Number(calculateSum()).toLocaleString('en')}</p>
                    {currentUser1 && <StyledButton onClick={routeChange} >
                        Checkout
                    </StyledButton>}

                </div>
            </div>
        </div>}

    </>)
}

export default Basket;












