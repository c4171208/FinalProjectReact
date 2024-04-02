import ProductInMinBasket from './ProductInMinBasket'
import { useSelector } from "react-redux";
import "./MinBasket.css"
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


const MinBasket = () => {
  const basket = useSelector((state) => state.basket.basketArr);
  const navigate = useNavigate();

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

  const routeChange = () => {

    navigate("/basket");
  }

  const StyledButton = styled(Button)(({ theme }) => ({


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
  return (<div >
    {basket.map(item => <li key={item._id} className='drawer-content'><ProductInMinBasket product={item} /></li>)}
    <div className='buttom'>
      <h4 >ESTIMATED TOTAL: {'$' + Number(calculateSum()).toLocaleString('en')} </h4>

      <StyledButton onClick={routeChange}>
        Checkout
      </StyledButton>

      {/* <button variant="outlined" className='checkOut' >{<Link to={'/basket'}>Checkout</Link>}</button>                     */}
    </div>
  </div>

  );
}

export default MinBasket;


