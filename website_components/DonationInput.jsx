import { CardContent, Typography,TextField,  InputAdornment, Button, CircularProgress } from "@mui/material";
import {Grid2} from '@mui/material';  
import { useState } from "react";



const DonationInput = ({  handleSubmit, isLoading, error }) => {
    const [amount, setAmount] = useState(10);
    const [amountError, setAmountError] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setAmount(value);

        if (value <= 0 || isNaN(value)) {
            setAmountError('Please enter a valid amount');
        } else {
            setAmountError('');
        }
    };

    const onSubmit = () => {
        if (amount > 0 && !isNaN(amount) ) {
            handleSubmit(amount);
        }   else {
            setAmountError('Please enter a valid amount');
        }
            
        }
    
    return (
    <CardContent>
          <Grid2 container spacing={2} justifyContent="center">
        <Grid2 item xs={12}>
          <Typography variant="h5" align="center">
            Want to make a donation?
          </Typography>
        </Grid2>
        <Grid2 item xs={6}>
          <TextField
            type="number"
            label="Donation Amount"
            value={amount}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            fullWidth
            error={!!amountError}
            helperText={amountError}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={onSubmit}
            disabled={isLoading || !!amountError}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Donate'}
          </Button>
          {error && (
            <Typography color="error" align="center">
              Something went wrong
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </CardContent>);
};
export default DonationInput;