import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
const SettingPage = ({ setSettingData }) => {
    
    const [open, setOpen] = useState(true);
    const [archivedData, setArchivedData] = useState(false)
    const [formData, setFormData] = useState({
        tuitionFee: '',
        universityGraduation: '',
        master: '',
        doctorate: '',
        associateProfessor: '',
        professor: '',
    });
    useEffect(() => {
        let initialFormData = JSON.parse(localStorage.getItem('settingData'))
        if (initialFormData) {
            setFormData(initialFormData)
            setSettingData(initialFormData)
            setArchivedData(true)
        }
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { tuitionFee, universityGraduation, master, doctorate, associateProfessor, professor } = formData
        if (tuitionFee === '' || universityGraduation === '' || master === '' || doctorate === '' || associateProfessor === '' || professor === '') {
            alert('Vui lòng nhập lại')
        } else {
            localStorage.setItem('settingData', JSON.stringify(formData))
            setSettingData(formData);
            setOpen(false);
        }
    };
    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose} className='dialog-setting'>
                <DialogTitle>{archivedData ? "Bạn có muốn thay đổi dữ liệu trước đó không ?" : "Hãy thiết lập trước khi sử dụng phần mềm"}</DialogTitle>
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
                    {archivedData ?
                        <div>
                            <Button onClick={handleSubmit}>Thay đổi</Button>
                            <Button onClick={handleClose}>Thoát</Button>
                        </div>
                        : <Button onClick={handleSubmit}>Lưu</Button>}
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default SettingPage