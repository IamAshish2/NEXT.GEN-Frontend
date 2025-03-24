import { Slide, SlideProps, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { IToaster } from "./interface";
import React from "react";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

type TransitionProps = Omit<SlideProps, "direction">;

const Toaster = ({ data, close }: IToaster) => {
    const handleClose = () => {
        close(false);
    };  

    return (
        <Snackbar
            open={data?.open}
            autoHideDuration={1000}
            onClose={handleClose}
            sx={{
                display: data?.open ? "block" : "none",
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            key={TransitionUp ? TransitionUp.name : ""}
        >
            <Alert onClose={handleClose} severity={data?.severity}>
                {data?.message}
            </Alert>
        </Snackbar>
    );
};

export default Toaster;