import React, { useEffect } from 'react'
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

const DialogEdit = ({ dialogEditOpen, setDialogEditOpen, rowEdit }) => {
    const { editAndSaveDataTable } = useContext(AppContext)
    const [rowData, setRowData] = useState(rowEdit)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRowData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = () => {
        let coefClassValue = rowData.coefficientClass
        let coefClass = 0
        if (coefClassValue < 20) {
            coefClass = -0.5
        } else if (coefClassValue >= 20 && coefClassValue < 40) {
            coefClass = 0
        } else {
            coefClass = 0.2
        }
        editAndSaveDataTable({...rowData, coefficientClass:coefClass})
        setDialogEditOpen(false);
    }
    const handleClose = () => {
        setDialogEditOpen(false);
    };
    useEffect(() => {
        setRowData(rowEdit)
    }, [rowEdit])

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={dialogEditOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Thay đổi thông tin lớp học ?"}
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
                                onChange={handleInputChange}
                                id="standard-read-only-input"
                                label="Tên lớp"
                                variant="filled"
                                name="nameClass"
                                value={rowData?.nameClass || ''}
                            />
                            <TextField
                                onChange={handleInputChange}

                                id="standard-read-only-input"
                                label="Số sinh viên"
                                variant="filled"
                                name="numberStudent"
                                value={rowData?.numberStudent || ''}
                            />
                            <TextField
                                onChange={handleInputChange}

                                id="standard-read-only-input"
                                label="Hệ số môn học "
                                variant="filled"
                                name="coefficientLesson"
                                value={rowData?.coefficientLesson || ''}
                            />
                            <TextField
                                onChange={handleInputChange}

                                id="standard-read-only-input"
                                label="Số tiết"
                                variant="filled"
                                name="numberLesson"
                                value={rowData?.numberLesson || ''}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} autoFocus>
                        Thay đổi
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Thoát
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogEdit