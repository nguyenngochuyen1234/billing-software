import React from 'react'
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AppContext } from './AppContext';
import LoadingButton from '@mui/lab/LoadingButton';
import AlertMessage from './AlertMessage';
const DialogDelete = ({ dialogDeleteOpen, setDialogDeleteOpen, rowDelete }) => {
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        open: false
    })
    const { deleteAndSaveDataTable } = useContext(AppContext)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [loadingBtn, setloadingBtn] = useState(false)
    const handleClose = () => {
        setDialogDeleteOpen(false);
    };

    const handleDelete = async () => {
        try {
            setloadingBtn(true)
            await deleteAndSaveDataTable(rowDelete.id || -1)
            setloadingBtn(false)
            setDialogDeleteOpen(false);
            setAlertData({
                severity: 'success',
                message: 'Xóa thành công',
                open: true
            })
        } catch (err) {
            setloadingBtn(false)
            setDialogDeleteOpen(false);
            console.log(err)
        }
    };

    return (
        <div>
            <AlertMessage alertData={alertData} />
            <Dialog
                fullScreen={fullScreen}
                open={dialogDeleteOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Bạn có chắc chắn muốn xóa thông tin lớp học này không ?"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                focused
                                id="standard-read-only-input"
                                label="Tên lớp"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                value={rowDelete?.nameClass || ''}
                            />
                            <TextField
                                focused
                                id="standard-read-only-input"
                                label="Số sinh viên"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                value={rowDelete?.numberStudent || ''}
                            />
                            <TextField
                                focused
                                id="standard-read-only-input"
                                label="Hệ số môn học "
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                value={rowDelete?.coefficientLesson || ''}
                            />
                            <TextField
                                focused
                                id="standard-read-only-input"
                                label="Số tiết"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                value={rowDelete?.numberLesson || ''}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        className="btnSave"
                        onClick={handleDelete}
                        loading={loadingBtn}
                        loadingIndicator="Loading…"
                        variant="text"
                    >
                        <span>Xóa</span>
                    </LoadingButton>
                    <Button autoFocus onClick={() => { setDialogDeleteOpen(false) }}>
                        Thoát
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogDelete