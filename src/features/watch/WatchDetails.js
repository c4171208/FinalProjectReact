// import { useNavigate, useParams } from "react-router-dom";
// import { getWatchById } from "./watchApi";
// import { useEffect, useState } from "react";
// import { addToBasket } from "../order/basket/basketSlice";
// import { useDispatch } from 'react-redux'
// import MinBasket from "../order/basket/MinBasket";
// import React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// //
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// //


// const StyledButton = styled(Button)(({ theme }) => ({
//     borderRadius: '20px',
//     backgroundColor: '#cb1021',
//     color: 'white',
//     padding: '10px 20px',
//     transition: 'background-color 0.3s, color 0.3s',
//     '&:hover': {
//         backgroundColor: 'white',
//         color: '#cb1021',
//         border: '2px solid #cb1021',
//     },
// }));

// const WatchDetails = () => {
//     const [open, setOpen] = useState(false);
//     const [watchCurrent, setwatchCurrent] = useState(undefined);
//     let { _id } = useParams()
//     // let [isShown, setIsShown] = useState(false);
//     let navigate = useNavigate();
//     const dispatch = useDispatch();


//     const toggleDrawer = (newOpen) => () => {
//         alert("1OK")
//         setOpen(newOpen);
//     };

//     const onAddToBasket = (product) => {
//         dispatch(addToBasket(product))
//         toggleDrawer(true)
//         alert("??????//")
//         // setIsShown(true)
//     }

//     useEffect(() => {
//         getWatchById(_id)
//             .then(res => {
//                 setwatchCurrent(res.data)
//                 alert(res.data)
//             })
//             .catch(err => {
//                 alert("error");
//             })
//     }, [_id]);
//     //




//     const DrawerList = (
//         <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
//             <List>
//                 <p>dod MONjol</p>
//                 {/* <MinBasket product={watchCurrent} /> */}
//             </List>
//         </Box>
//     );
//     return (


//         <div className="watchDetails"
//             style={{
//                 position: "fixed",
//                 top: 0,
//                 width: "100vw",
//                 height: "100vh",
//                 backgroundColor: " rgb(202, 201, 201)",
//                 color: "white"
//             }}>


//             {watchCurrent &&
//                 <div >

//                     <h1>{watchCurrent.description}</h1>
//                     <h2>{watchCurrent.model}</h2>
//                     <img src={watchCurrent.urlImg} />
//                     <Stack spacing={1}>
//                         <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{ color: 'black' }} />
//                     </Stack>
//                     <p>{watchCurrent.price}</p>
//                     <StyledButton onClick={() => onAddToBasket(watchCurrent)}>
//                         Add to Basket
//                     </StyledButton>
//                     <p>{watchCurrent.caseSize}</p>
//                     <p>{watchCurrent.strapSize}</p>
//                     <p>{watchCurrent.TotalDiamondCarats}</p>
//                     <p>{watchCurrent.TotalDiamondCount}</p>
//                     <p>{watchCurrent.silhouette}</p>
//                     <p>{watchCurrent.category}</p>
//                     <p>{watchCurrent.material}</p>/

//                     <input type="button" value="back" onClick={() => { navigate("/watches") }} />

//                     {/* {isShown && <MinBasket product={watchCurrent} />} */}
//                     <div>

//                         {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
//                         <Drawer open={open} onClose={toggleDrawer(false)}>
//                             {DrawerList}
//                         </Drawer>
//                     </div>

//                 </div>}

//         </div>);
// }

// export default WatchDetails;
//goo
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWatchById } from './watchApi';
import { useDispatch } from 'react-redux';
import { addToBasket, saveBasketToLocalStorage } from '../order/basket/basketSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MinBasket from '../order/basket/MinBasket';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import './WatchDetails.css'
// StyledButton component with MUI styling
const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px',
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

const WatchDetails = () => {
    const [open, setOpen] = useState(false);
    const [watchCurrent, setwatchCurrent] = useState(undefined);
    const { _id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Toggle drawer open/close state
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Add item to basket and open drawer
    const onAddToBasket = (product) => {
        dispatch(addToBasket(product));

        // Dispatch actions and handle side effect of saving basket to localStorage
        // dispatch(saveBasketToLocalStorage());

        toggleDrawer(true)();
    };

    // Fetch watch details by ID when component mounts
    useEffect(() => {
        getWatchById(_id)
            .then(res => {
                setwatchCurrent(res.data);
            })
            .catch(err => {
                console.error("Error fetching watch:", err);
            });
    }, [_id]);

    // Drawer content component
    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <MinBasket />
            </List>
        </Box>
    );

    return (
        <>
            <div className="watchDetails">
    {watchCurrent &&
        <div className='all'>


            <input type="button" value="back" onClick={() => navigate("/watches")} class="back-button" />


            <div className='section'>

                <img src={watchCurrent.urlImg} alt="Watch" />

            </div>
            <div className='section'>
                <h3>{watchCurrent.description}</h3>
                <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{ color: 'black' }} />
                </Stack>
                <p>{'$' + Number(watchCurrent.price).toLocaleString('en')}</p>

                <StyledButton onClick={() => onAddToBasket(watchCurrent)}>
                    Add to Basket
                </StyledButton>
            </div>


            <div className='section' id='details'>
                <h2>Product Details</h2>
                <ul>
                    {watchCurrent.model && <li>Sku:{watchCurrent.model}</li>}
                    {watchCurrent.caseSize && <li>Case Size:{watchCurrent.caseSize}</li>}
                    {watchCurrent.category && <li>Case Color:{watchCurrent.category}</li>}
                    {watchCurrent.TotalDiamondCount && <li>Total Diamond:{watchCurrent.TotalDiamondCount}</li>}
                    {watchCurrent.TotalDiamondCarats && <li>Carats:{watchCurrent.TotalDiamondCarats}</li>}
                </ul>

            </div>

        </div>

    }</div>

<div>
    <Drawer open={open} onClose={toggleDrawer(false)}
        anchor="right" // מגדיר את המיקום של הדלת
        className='drawer'>
        {DrawerList}
    </Drawer>
</div></>
    );
}

export default WatchDetails;
