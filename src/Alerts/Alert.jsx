import Snackbar from '@mui/material/Snackbar';

function Alert({ message }) {

    return <>
        <Snackbar
            open={message.openPop}
            message={message.mess}
        />
    </>
}
export default Alert;