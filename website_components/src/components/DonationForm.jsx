// import { Card, Fade, Container } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useCreatePaymentIntent } from "./hooks/useCreatePaymentIntent";
// import DonationInput from "./DonationInput.jsx";

// export default function DonationForm() {
//     const [amount, setAmount] = useState(10);
//     const [paymentIntent, setPaymentIntent] = useState(null);
//     const { mutate, isLoading, data, error } = useCreatePaymentIntent();
//     const handleChange = (e) => {
//         setAmount(e.target.value);
//     }
//     const handleSubmit = () => (mutate(amount));

//     useEffect(() => {
//         if (data) setPaymentIntent(data);
//     }, [data]);

//     return (
//         <Card>
//             <Fade in={!paymentIntent} unmountOnExit>
//                 <Container>
//                     <DonationInput amount={amount} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} data={data} error={error} />
//                 </Container>
//             </Fade>
//         </Card>)
// }