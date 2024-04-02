

// //!!!!
// // import Card from 'react-bootstrap/Card';
// // import ListGroup from 'react-bootstrap/ListGroup';
// // import { addToBasket } from "../order/basket/basketSlice";
// // import {  useDispatch } from 'react-redux'
// // import { Link } from "react-router-dom";

// // const WatchItem = ({product}) => {

// //     const dispatch = useDispatch()
// //     return ( 
// //     <div > <h1>{product.model}</h1>
// //     <img src={product.urlImg}/>
// //     <p>2{product.price}</p>

// //     <input type="button" value="add to the basket"  onClick={() => dispatch(addToBasket(product))}/>
// //     <Link to={""+product._id}>to details </Link>
// //     </div>)

// // }

// // export default WatchItem;  
//it!
// import * as React from 'react';
// import { addToBasket } from "../order/basket/basketSlice";
// import { useDispatch } from 'react-redux'
// import { Link } from "react-router-dom";
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
// import './WatchItem.css'
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const WatchItem = ({ product }) => {

//     const dispatch = useDispatch()
//     return (

//         <div className='watchItem'>
//             <Link className='link'
//                 to={"" + product._id} > <div>
//                     <CardMedia
//                         alt={product.description}
//                         sx={{ height: 300 }}
//                         image={product.urlImg}

//                     />

//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {product.description}
//                         </Typography>
//                     </CardContent>
//                 </div>
//             </Link>

//             <Stack  spacing={1}>
//                 <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{ color: 'black' }} />
//             </Stack>
//             <Typography variant="body1" color="text.secondary">
//             {'$'+Number(product.price).toLocaleString('en')}
//             </Typography>
//         </div>


//     );
// }
// export default WatchItem;     


import * as React from 'react';
import { addToBasket } from "../order/basket/basketSlice";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import './WatchItem.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WatchItem = ({ product }) => {

    const dispatch = useDispatch()
    return (

        <Card sx={{ minWidth: 345, maxWidth: 345, minHeight: 550, maxHeight: 550, boxShadow: 'none', border: 'none' }}>
            <Link className='link'
                to={"" + product._id} > <div>
                    <CardMedia
                        alt={product.description}
                        sx={{ height: 300 }}
                        image={product.urlImg}

                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className="description">
                            {product.description}
                        </Typography>
                    </CardContent>
                </div>
            </Link>

            <Stack spacing={1}>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{ color: 'black' }} />
            </Stack>
            <Typography variant="body1" color="text.secondary">
                {'$' + Number(product.price).toLocaleString('en')}
            </Typography>
        </Card>


    );
}
export default WatchItem;



