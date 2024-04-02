// import { useDispatch, useSelector } from 'react-redux'
// import { userOut } from './user/userSlice'
// import { deletAllBasket } from './order/basket/basketSlice'
// import { Link } from 'react-router-dom';
// import { BsBagHeart } from "react-icons/bs";
// import { BsBag } from "react-icons/bs";
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import './MyNavBar.css'
// const MyNavBar = () => {
//   const currentUser1 = useSelector((state) => state.user.currentUser);
//   const basket = useSelector((state) => state.basket.basketArr);

//   let dispatch = useDispatch();
//   const onLogOut = () => {
//     dispatch(userOut())
//     dispatch(deletAllBasket())

//   }
//   return (

//     <nav  >
//       <div className='header'>Complimentary shipping and returns on all orders</div>
//       <div class='header-items'>
//       {!currentUser1 && <Link to="/sighIn" className='link'> Sigh in </Link>}
//       {!currentUser1 && <Link to="/login" className='link'> Login </Link>}

//       {currentUser1 && <Stack direction="row" spacing={1} >
//       <Chip avatar={<Avatar onClick={() => onLogOut()} >{currentUser1 &&<button value="-"  />}</Avatar>} label={currentUser1.name}/>
//     </Stack>}
//       {(!currentUser1 || currentUser1.role != 'ADMIN') && <Link to="/basket" className='link'>   {basket.length == 0 && <BsBag size={"2em"} className='basket' />}</Link>}
//       {(!currentUser1 || currentUser1.role != 'ADMIN') && <Link to="/basket" className='link'>  {basket.length > 0 && <BsBagHeart size={"2em"} className='basket' />}</Link>}

//       </div>
//       <div id='logo'><img src="../logo.svg" /></div>
//       <ul>
//         <li >
//           <Link to="/watches" className='link'>watches</Link>
//         </li>
//         <li> 
//           <Link to="/watches/Sport" className='link'> Sport </Link>
//           </li>
//           <li>
//           <Link to="/watches/Silver" className='link'> Silver </Link>
//           </li>
//           <li>
//           <Link to="/watches/Gold" className='link'> Gold </Link>
//           </li>
//           {/* <li>
//           <Link to="/watches/Tow Ton" className='link'> Tow Ton </Link>
//         </li> */}
//         {/* {(!currentUser1||currentUser1.role!='ADMIN')&&<li>
//           <Link to="/basket" className='link'> basket </Link>
//         </li>} */}
//         {/* <li>
//           <Link to="/login" className='link'> login </Link>
//         </li>

//         <li>
//           <Link to="/sighIn" className='link'> sighIn </Link>
//           </li> */}
//         {currentUser1 && currentUser1.role === 'ADMIN' && <li>
//           <Link to="/addWatch" className='link'> addWatch </Link>
//         </li>}
//       </ul>
//     </nav>

//   );
// };

// export default MyNavBar;
import { useDispatch, useSelector } from 'react-redux'
import { userOut } from './user/userSlice'
import { deletAllBasket } from './order/basket/basketSlice'
import { Link } from 'react-router-dom';
import { BsBagHeart } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip'; // ייבוא ה־Tooltip
import './MyNavBar.css'

const MyNavBar = () => {
  const currentUser1 = useSelector((state) => state.user.currentUser);
  const basket = useSelector((state) => state.basket.basketArr);

  let dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(userOut())
    dispatch(deletAllBasket())
  }

  const logoutLabel = "Log out"; // הגדרת משתנה עם הטקסט "Log out"

  return (
    <nav>
      <div className='header'>Complimentary shipping and returns on all orders</div>
      <div className='header-items'>
        {!currentUser1 && <Link to="/sighIn" className='link'>Sign in</Link>}
        {!currentUser1 && <Link to="/login" className='link'>Login</Link>}

        {currentUser1 && (
          <Stack direction="row" spacing={1}>
            <Tooltip title={logoutLabel}> {/* שימוש ב־Tooltip */}
              <Chip
                avatar={
                  <Avatar onClick={onLogOut}>
                    {currentUser1 && <button value="-" />}
                  </Avatar>
                }
                label={currentUser1.name}
              />
            </Tooltip>
          </Stack>
        )}
        {(!currentUser1 || currentUser1.role !== 'ADMIN') && (
          <Link to="/basket" className='link'>
            {basket.length === 0 && <BsBag size={"2em"} className='basket' />}
          </Link>
        )}
        {(!currentUser1 || currentUser1.role !== 'ADMIN') && (
          <Link to="/basket" className='link'>
            {basket.length > 0 && <BsBagHeart size={"2em"} className='basket' />}
          </Link>
        )}
      </div>
      <div id='logo'><img src="../logo.svg" alt="Logo" /></div>
      <ul>
        <li>
          <Link to="/HomePage" className='link'>HomePage</Link>
        </li>
        <li>
          <Link to="/watches" className='link'>Watches</Link>
        </li>

        {currentUser1 && currentUser1.role === 'ADMIN' && (
          <li>
            <Link to="/addWatch" className='link'>Add Watch</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MyNavBar;
