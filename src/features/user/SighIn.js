
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import Joi from "joi";
import { userIn } from "./userSlice";
import Button from "@mui/material/Button"; // Imported Button component from Material-UI
import React from "react";
import TextField from "@mui/material/TextField";
import { Typography, Container } from "@mui/material";
import { sighIn } from "./userApi";
import { useNavigate } from "react-router-dom";

// Defined Joi schema for form validation
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
  tz: Joi.string().min(9).pattern(/^[0-9]{9}$/).required(),
  email: Joi.string().email({ tlds: false }).required(),

}).required();

// Login component
const SighIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // Destructuring the useForm hook
  const {
    control,
    handleSubmit, // Renamed handleSubmit to avoid confusion
    formState: { errors },
  } = useForm({
    resolver: async (data) => {
      try {
        const validatedData = await schema.validateAsync(data, { abortEarly: false });
        return {
          values: validatedData,
          errors: {},
        };
      } catch (err) {
        return {
          values: {},
          errors: err.details.reduce((acc, curr) => {
            acc[curr.context.key] = curr.message;
            return acc;
          }, {}),
        };
      }
    },
  });

  // Function to handle login logic
  const sighInDo = async (data) => {
    try {
      let res = await sighIn(data);
      dispatch(userIn(res.data));
      navigate("/HomePage")
    }
    catch (err) {
      alert(err);
    }
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    handleSubmit(sighInDo)(data); // Call loginDO inside handleSubmit
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" style={{ marginTop: 40, marginBottom: 20, fontFamily: "initial" }}>
          create an account
        </Typography>
        <Typography variant="h8" style={{ fontFamily: "initial" }}>
          Returning Customers
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (

              <TextField
                {...field}
                label="name*"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.name}
                helperText={errors.name}

              />

            )}
          />
          <Controller
            name="tz"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="tz"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.tz}
                helperText={errors.tz}
              />
            )}
          />
          {/* Controlled input for password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="password*"
                // type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
            )}
          />


          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            )}
          />


          {/* Button for form submission */}
          <Button
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
            create an account
          </Button>
        </form>
      </Container>
    </>
  );
};

export default SighIn;


