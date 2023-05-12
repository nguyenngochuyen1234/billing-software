import React, { useEffect } from 'react'
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import { getDocument, setDocument, updateDocument } from './firebase/api'
import AlertMessage from './AlertMessage';
import CircularProgress from '@mui/material/CircularProgress';
const SettingPage = ({ setSettingData }) => {
    const idTeacher = localStorage.getItem('idTeacher')
    const [alertData, setAlertData] = useState({
        severity: '',
        message: '',
        open: false
    })
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [formData, setFormData] = useState({
        tuitionFee: '',
        universityGraduation: '',
        master: '',
        doctorate: '',
        associateProfessor: '',
        professor: '',
    });

    const getSettingData = async () => {
        try {
            setLoading(true)
            if (idTeacher) {
                let initialFormData = await getDocument('settingDataConfig', idTeacher)
                if (initialFormData) {
                    setFormData(initialFormData)
                    setSettingData(initialFormData)
                }
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        getSettingData()
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoadingBtn(true)
            const { tuitionFee, universityGraduation, master, doctorate, associateProfessor, professor } = formData
            if (tuitionFee === '' || universityGraduation === '' || master === '' || doctorate === '' || 
            associateProfessor === '' || professor === '') {
                setLoadingBtn(false)
                setAlertData({
                    severity: 'warning',
                    message: 'Vui lòng nhập đầy đủ thông tin',
                    open: true
                })
            } else if (tuitionFee < 0 || universityGraduation < 0 || master < 0 || doctorate < 0 || 
                associateProfessor < 0 || professor < 0) {
                setLoadingBtn(false)
                setAlertData({
                    severity: 'warning',
                    message: 'Vui lòng không nhập số âm',
                    open: true
                })

            }
            else {
                if (idTeacher) {
                    await updateDocument('settingDataConfig', idTeacher, formData)
                }
                setSettingData(formData);
                setOpen(false);
                setLoadingBtn(false)
                setAlertData({
                    severity: 'success',
                    message: 'Lưu thông tin thành công',
                    open: true
                })
            }

        } catch (error) {
            setOpen(false);
            setLoadingBtn(false)
            setAlertData({
                severity: 'error',
                message: 'Có ',
                open: true
            })
        }
    };
    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };


    return (
        <div>

            <AlertMessage alertData={alertData} />

            <Dialog open={open} onClose={handleClose} className='dialog-setting'>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogTitle>{idTeacher ? "Bạn có muốn thay đổi dữ liệu trước đó không ?" : "Hãy thiết lập trước khi sử dụng phần mềm"}</DialogTitle>
                <DialogContent>
                    <h4>1. Thiết lập tiền dạy một giờ chuẩn</h4>
                    <TextField
                        name="tuitionFee"
                        value={formData.tuitionFee}
                        required

                        id="outlined-password-input"
                        onChange={handleInputChange}
                        label="Tiền dạy"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                        }}
                    />
                    <h4>2. Thiết lập hệ số giáo viên theo bằng cấp </h4>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            name="universityGraduation"
                            value={formData.universityGraduation}
                            required
                            id="outlined-password-input"
                            onChange={handleInputChange}
                            label="Tốt nghiệp đại học"
                            type="number"

                        />
                        <TextField
                            name="master"
                            value={formData.master}
                            required
                            id="outlined-password-input"
                            onChange={handleInputChange}
                            label="Thạc sĩ"
                            type="number"

                            style={{ width: "100px" }}
                        />
                        <TextField
                            name="doctorate"
                            value={formData.doctorate}
                            required
                            id="outlined-password-input"
                            onChange={handleInputChange}
                            label="Tiến sĩ"
                            type="number"

                            style={{ width: "100px" }}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            name="associateProfessor"
                            value={formData.associateProfessor}
                            required
                            id="outlined-password-input"
                            onChange={handleInputChange}
                            label="Phó giáo sư"
                            type="number"

                        />
                        <TextField
                            name="professor"
                            value={formData.professor}
                            required
                            id="outlined-password-input"
                            onChange={handleInputChange}
                            label="Giáo sư"
                            type="number"

                        />
                    </Box>


                </DialogContent>
                <DialogActions>
                    {idTeacher ?
                        <div>
                            <LoadingButton
                                onClick={handleSubmit}
                                loading={loadingBtn}
                                loadingIndicator="Loading…"
                                variant="outlined"
                            >
                                <span>Thay đổi</span>
                            </LoadingButton>
                            <Button onClick={handleClose}>Thoát</Button>
                        </div>
                        : <Button onClick={handleSubmit}>Lưu</Button>}
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default SettingPage