
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteWatchById } from './watchApi';
import { useSelector } from 'react-redux';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './WatchToAdmin.css'


const WatchToAdmin = ({ product, watches, setWatches }) => {
    const currentUser1 = useSelector((state) => state.user.currentUser);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onDelet = (product) => {
        alert();
        deleteWatchById(product._id, currentUser1.token);
        let copy = [...watches];
        copy = copy.filter(item => item._id !== product._id);
        setWatches(copy);
    };

    return (
        <div className='watchItem'>
            <Link className='link' to={"/editWatch"} state={product}>
                <div>
                    <CardMedia alt={product.description} sx={{ height: 300 }} image={product.urlImg} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1.2rem', display: windowWidth < 1200 ? 'none' : 'block' }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                </div>
            </Link>
            <Typography variant="body1" color="text.secondary">
                {'$' + Number(product.price).toLocaleString('en')}
            </Typography>
            <button type="button" className="deleteButton" onClick={() => {
                const confirmBox = window.confirm("Do you really want to delete this item?");
                if (confirmBox === true) {
                    onDelet(product);
                }
            }}>
                <RiDeleteBin5Fill />
            </button>
        </div>
    );
};

export default WatchToAdmin;
