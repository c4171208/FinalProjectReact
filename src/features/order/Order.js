import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from "react-redux";
import { saveOrderInServer } from "./orderApi";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Typography, Container, Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './Order.css'
const Order = () => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  let productsToOrder = useSelector((state) => state.basket.basketArr);
  let currentUser1 = useSelector((state) => state.user.currentUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Place your submission logic here
  };

  function calculateSum() {
    let sum = 0;
    for (let i = 0; i < productsToOrder.length; i++) {
      if (productsToOrder[i].count > 1)
        sum += (productsToOrder[i].price) * (productsToOrder[i].count)
      else
        sum += productsToOrder[i].price;
    }
    return sum;
  }


  const save = () => {

    saveOrderInServer({ products: productsToOrder }, currentUser1.token)
    setOpen(true);
    // navigate("/watches")

  }
  return (<>
    <div className="containers-wrapper">
      <div className="container" id="first">

        <Container maxWidth="md">
          <Typography variant="h4" style={{ marginTop: 40, marginBottom: 20, fontFamily: "initial" }}>
            Details
          </Typography>
          {/* <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}> */}
          <Grid container spacing={2}>


            <Grid item xs={12} sm={6}>
              <Controller
                name="streetAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street Address"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="city"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ZIP Code"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>


          </Grid>


        </Container>


      </div>
      <div className="container">

        <Container>

          <Typography variant="h4" style={{ marginTop: 40, marginBottom: 20, fontFamily: "initial" }}>
            Credit card
          </Typography>
          <Grid container spacing={2}>

            <Grid Grid item xs={12} sm={6}>
              <Controller
                name="creditCardNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Credit Card Number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>

              <Controller
                name="cardHolderName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Card Holder Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />

            </Grid>
            <Grid item xs={12} sm={6}>

              <Controller
                name="expirationDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expiration Date"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>



            <Grid item xs={12} sm={6}>
              <Controller
                name="cvv"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CVV"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button onClick={save}
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              mt: 2,
              backgroundColor: "#cb1021",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "#cb1021",
                border: "2px solid #cb1021",
              },
              height: "50px",
            }}
            color="primary"
          >
            Send order
          </Button>

        </Container>
      </div>
      <div className="container" id="summery">
        <p className='start'>ORDER SUMMARY</p>
        <p> Subtotal         {Number(calculateSum()).toLocaleString('en') + '$'}</p>
        <p> Shipping cost    FREE </p>
        <p>Estimated Tax     $0.00 </p>
        <p className='end'>  ESTIMATED TOTAL:    {Number(calculateSum()).toLocaleString('en') + '$'}</p>

      </div>

    </div>
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for the Ordering !!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your order has been successfully received in the system
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            navigate("/watches")
          }}>OK</Button>

        </DialogActions>
      </Dialog>
    </React.Fragment>


  </>);
}

export default Order;



