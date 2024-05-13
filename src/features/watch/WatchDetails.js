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
