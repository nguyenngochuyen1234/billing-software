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
const DialogDelete = ({ dialogDeleteOpen, setDialogDeleteOpen, rowDelete }) => {
    const {deleteAndSaveDataTable} = useContext(AppContext)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setDialogDeleteOpen(true);
    };
    const handleClose = () => {
        setDialogDeleteOpen(false);
    };
    
    const handleDelete = () => {
        deleteAndSaveDataTable(rowDelete.id || -1)
        setDialogDeleteOpen(false);
    };

    return (
        <div>
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
                            <TextField
                                focused
                                id="standard-read-only-input"
                                label="Tiền dạy"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                value={rowDelete?.tuitionFee || ''}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={()=>{setDialogDeleteOpen(false)}}>
                        Disagree
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogDelete