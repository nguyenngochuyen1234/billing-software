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
import LoadingButton from '@mui/lab/LoadingButton';
import AlertMessage from './AlertMessage';
const DialogEdit = ({ dialogEditOpen, setDialogEditOpen, rowEdit }) => {
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        open: false
    })
    const { editAndSaveDataTable } = useContext(AppContext)
    const [loadingBtn, setloadingBtn] = useState(false)
    const [rowData, setRowData] = useState(rowEdit)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRowData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async () => {
        setloadingBtn(true)
        const { nameClass, numberStudent, coefficientLesson, numberLesson } = rowData
        try {
            if (nameClass === '' || numberStudent === '' || coefficientLesson === '' 
            || numberLesson=== '') {
                setloadingBtn(false)
                setDialogEditOpen(false);
                setAlertData({
                    severity: 'warning',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    open: true
                })
            }else if(numberStudent <0 || coefficientLesson <0 || numberLesson<0){
                setloadingBtn(false)
                setDialogEditOpen(false);
                setAlertData({
                    severity: 'warning',
                    message: 'Vui lòng không nhập số âm',
                    open: true
                })
            }
            else{
                let coefClassValue = parseFloat(numberStudent)
                let coefClass = 0
                if (coefClassValue < 20) {
                    coefClass = -0.5
                } else if (coefClassValue >= 20 && coefClassValue < 40) {
                    coefClass = 0
                } else {
                    coefClass = 0.2
                }
                await editAndSaveDataTable({ ...rowData, coefficientClass: coefClass })
                setloadingBtn(false)
                setDialogEditOpen(false);
                setAlertData({
                    severity: 'success',
                    message: 'Chỉnh sửa thành công',
                    open: true
                })
            }

        } catch (err) {
            console.log(err.message)
        }
    }
    const handleClose = () => {
        setDialogEditOpen(false);
    };
    useEffect(() => {
        setRowData(rowEdit)
    }, [rowEdit])

    return (
        <div>
            <AlertMessage alertData={alertData} />
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
                    <LoadingButton
                        className="btnSave"
                        onClick={handleSubmit}
                        loading={loadingBtn}
                        loadingIndicator="Loading…"
                        variant="text"
                    >
                        <span>Thay đổi</span>
                    </LoadingButton>
                    <Button autoFocus onClick={handleClose}>
                        Thoát
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogEdit