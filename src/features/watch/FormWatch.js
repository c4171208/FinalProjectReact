import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { addWatch } from "./watchApi";
import { useSelector } from 'react-redux';
import { Paper, Typography, Container } from "@mui/material";
import Button from "@mui/material/Button"; // Imported Button component from Material-UI
import TextField from "@mui/material/TextField";
import './FormWatch.css'
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import MenuItem from '@mui/material/MenuItem';


const validCategory = ['Diamond', 'Tow Tone', 'Gold', 'Silver', 'Sport'];
const validCaseSize = ['S', 'M', 'L']

const schema = Joi.object({
    price: Joi.number().min(0).required(),
    model: Joi.string().required(),
    movement: Joi.string(),
    description: Joi.string().required(),
    category: Joi.string().valid(...validCategory).required(),
    collectionMichele: Joi.string(),
    strapSize: Joi.number().min(14).max(20),
    caseSize: Joi.string().valid(...validCaseSize),
    silhouette: Joi.string(),
    caseMaterial: Joi.string(),
    TotalDiamondCount: Joi.number(),
    TotalDiamondCarats: Joi.number(),
    batteryType: Joi.number().default(371),
    urlImg: Joi.string().required(), // Added required validation for urlImg
}).required();

const FormWatch = () => {
    let navigate = useNavigate();
    let currentUser1 = useSelector((state) => state.user.currentUser);
    const [isSuccess, setIsSuccess] = useState(false); // סטטוס האם ההוספה הצליח

    const {
        register,
        control,
        reset,
        handleSubmit,
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

    const add = async (data) => {
        try {
            await addWatch(data, currentUser1.token);
            setIsSuccess(true); // הצלחת העדכון


        } catch (err) {
            console.log("err " + err);
            alert(err);
        }
    };

    const handleSnackbarClose = () => {
        setIsSuccess(false);
        navigate("/watches");
    };

    return (
        <>
            <Snackbar open={isSuccess} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    The product has been successfully added
                </Alert>
            </Snackbar>
            <h1 style={{ fontFamily: "initial" }}>
                Add a new watch
            </h1>
            <form onSubmit={handleSubmit(add)} >
                <div className="all">
                    <div className="section">
                        <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="model*"
                                    type="text"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.model}
                                    helperText={errors.model}
                                />
                            )}
                        />

                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="price*"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.price}
                                    helperText={errors.price}
                                />
                            )}
                        />
                        <Controller
                            name="batteryType"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Battery Type"
                                    type="number"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.batteryType}
                                    helperText={errors.batteryType}
                                />
                            )}
                        />

                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Category*"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.category}
                                    helperText={errors.category}
                                >
                                    {validCategory.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />


                        <Controller
                            name="caseSize"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Case Size"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.caseSize}
                                    helperText={errors.caseSize}
                                >
                                    {validCaseSize.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                    </div>

                    <div className="section">

                        <Controller
                            name="strapSize"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="strapSize"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.strapSize}
                                    helperText={errors.strapSize}
                                />
                            )}
                        />

                        <Controller
                            name="urlImg"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="urlImg"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.urlImg}
                                    helperText={errors.urlImg}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="description*"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={errors.description}
                                />
                            )}
                        />
                        <Controller
                            name="TotalDiamondCount"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="TotalDiamondCount"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.TotalDiamondCount}
                                    helperText={errors.TotalDiamondCount}
                                />
                            )}
                        />
                        <Controller
                            name="TotalDiamondCarats"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="TotalDiamondCarats"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.TotalDiamondCarats}
                                    helperText={errors.TotalDiamondCarats}
                                />
                            )}
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        marginTop: "0px",
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
                    Add
                </Button>
            </form>

        </>
    );
};

export default FormWatch;




