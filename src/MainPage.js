import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TableData from './TableData'
import InputAdornment from '@mui/material/InputAdornment';
import { AppContext } from './AppContext';
const MainPage = ({ settingData }) => {
    const { rowsData,
        changeAndSaveDataTable, totalCost, setTotalCost, setCoeffTeacherSaved,tuitionFee, setTuitionFee } = useContext(AppContext)
    const [coefficientTeacher, setCoefficientTeacher] = useState(0)
    const [coefficientClass, setCoefficientClass] = useState(0)
    const [coefficientTeacherArr, setCoefficientTeacherArr] = useState([])
    const [teacherInfo, setTeacherInfo] = useState({
        nameTeacher: '',
        teacherCode: '',
        degree: 'universityGraduation'
    })
    const [settingDataConfig, setSettingDataConfig] = useState(settingData)

    useEffect(()=>{
        setTuitionFee(settingDataConfig.tuitionFee)
        setCoefficientTeacherArr([
        {
            value: 'universityGraduation',
            coefficient: settingDataConfig.universityGraduation
        },
        {
            value: 'master',
            coefficient: settingDataConfig.master
        },
        {
            value: 'doctorate',
            coefficient: settingDataConfig.doctorate
        },
        {
            value: 'associateProfessor',
            coefficient: settingDataConfig.associateProfessor
        },
        {
            value: 'professor',
            coefficient: settingDataConfig.professor
        },
    ])
    },[settingDataConfig])

    useEffect(() => {
        let initialTeacherData = JSON.parse(localStorage.getItem('teacherInfo'))
        if (initialTeacherData) {
            setTeacherInfo(initialTeacherData)
            setSavedTeacherInfo({
                nameTeacher: initialTeacherData.nameTeacher,
                teacherCode: initialTeacherData.teacherCode,
            })
            coefficientTeacherArr.forEach(item => {
                if (item.value == initialTeacherData.degree) {
                    setCoeffTeacherSaved(item.coefficient)
                    setCoefficientTeacher(item.coefficient)
                }
            })
        }
    }, [coefficientTeacherArr])
    useEffect(() => {
        let initialFormSettingData = JSON.parse(localStorage.getItem('settingData'))
        if (initialFormSettingData) {
            setSettingDataConfig(initialFormSettingData)
            setCoefficientTeacher(initialFormSettingData.universityGraduation)
        }
    }, [settingData])

    const [savedTeacherInfo, setSavedTeacherInfo] = useState({
        nameTeacher: 'Chưa có thông tin',
        teacherCode: 'Chưa có thông tin',
    })
    const [classInfo, setClassInfo] = useState({
        nameClass: '',
        numberStudent: '',
        coefficientLesson: '',
        numberLesson: ''
    }
    )
    const degree = [
        {
            value: 'universityGraduation',
            label: 'Tốt nghiệp đại học',

        },
        {
            value: 'master',
            label: 'Thạc sĩ',
        },
        {
            value: 'doctorate',
            label: 'Tiến sĩ',
        },
        {
            value: 'associateProfessor',
            label: 'Phó giáo sư',
        },
        {
            value: 'professor',
            label: 'Giáo sư',
        },
    ];
    const handleTeacherInputChange = (event) => {
        const { name, value } = event.target;
        setTeacherInfo((prevData) => ({ ...prevData, [name]: value }));
        if (name === "degree") {
            coefficientTeacherArr.forEach(item => {
                if (item.value == value) {
                    setCoefficientTeacher(item.coefficient)

                }
            })
        }
    };
    const handleClassInputChange = (event) => {
        const { name, value } = event.target;
        setClassInfo((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'numberStudent') {
            let coefClass = 0
            if (value < 20) {
                coefClass = -0.5
            } else if (value >= 20 && value < 40) {
                coefClass = 0
            } else {
                coefClass = 0.2
            }
            setCoefficientClass(coefClass)
        }

    };
    const handleTeacherSubmit = (event) => {
        event.preventDefault();
        const { nameTeacher, teacherCode } = teacherInfo
        if (nameTeacher == '' || teacherCode == '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else {
            setSavedTeacherInfo({
                nameTeacher,
                teacherCode,
            })
            setCoeffTeacherSaved(coefficientTeacher)
            localStorage.setItem("teacherInfo", JSON.stringify(teacherInfo))
        }
    }
    const handleClassSubmit = (event) => {
        event.preventDefault();
        const { nameClass, numberStudent, coefficientLesson, numberLesson } = classInfo
        if (nameClass === '' || numberStudent === '' || coefficientLesson === '' || numberLesson === '') {
            alert('Vui lòng nhập đầy đủ thông tin')
        } else {
            let tuitionFeeClass = parseFloat(numberLesson) * (parseFloat(coefficientTeacher) + parseFloat(coefficientClass) + parseFloat(coefficientLesson)) * parseFloat(settingDataConfig.tuitionFee)
            let newRow = {
                id: rowsData.length + 1,
                nameClass,
                numberStudent,
                coefficientLesson,
                numberLesson,
                tuitionFee: tuitionFeeClass || 0,
                coefficientTeacher,
                coefficientClass,
                tuitionFee: settingDataConfig.tuitionFee
            }
            changeAndSaveDataTable(newRow)
            setClassInfo({
                nameClass: '',
                numberStudent: '',
                coefficientLesson: '',
                numberLesson: ''
            })
        }
    }

    return (
        <div className='main-page'>
            <h2 style={{marginBottom:"10px"}}>Phần mềm tính lương của Đại học Thăng Long</h2>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch', textAlign: 'center' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    size="small"
                    id="outlined-password-input"
                    label="Họ tên giáo viên"
                    autoComplete="current-password"
                    name="nameTeacher"
                    value={teacherInfo.nameTeacher}
                    onChange={handleTeacherInputChange}
                />
                <TextField
                    size="small"
                    id="outlined-password-input"
                    label="Mã giáo viên"
                    autoComplete="current-password"
                    name="teacherCode"
                    value={teacherInfo.teacherCode}
                    onChange={handleTeacherInputChange}

                />
                <TextField
                    size="small"
                    id="outlined-select-currency"
                    select
                    label="Bằng cấp"
                    defaultValue="universityGraduation"
                    name="degree"
                    value={teacherInfo.degree}
                    onChange={handleTeacherInputChange}

                >
                    {degree.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label="Hệ số (tự động)"
                    type="number"
                    value={coefficientTeacher}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button className="btnSave" onClick={handleTeacherSubmit} variant="text">Lưu</Button>
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
                    size="small"
                    id="outlined-password-input"
                    label="Tên lớp học"
                    type="text"
                    autoComplete="current-password"
                    style={{ width: "150px" }}
                    name="nameClass"
                    value={classInfo.nameClass}
                    onChange={handleClassInputChange}
                />
                <TextField
                    size="small"
                    id="outlined-password-input"
                    label="Số sinh viên"
                    type="number"
                    autoComplete="current-password"
                    name="numberStudent"
                    value={classInfo.numberStudent}
                    onChange={handleClassInputChange}

                />

                <TextField
                    size="small"
                    id="outlined-read-only-input"
                    label="Hệ số lớp học (tự động)"
                    type="number"
                    defaultValue='0'
                    InputProps={{
                        readOnly: true,
                    }}
                    value={coefficientClass}
                />
                <TextField
                    size="small"
                    id="outlined-password-input"
                    label="Hệ số môn học"
                    type="number"
                    autoComplete="current-password"
                    name="coefficientLesson"
                    value={classInfo.coefficientLesson}
                    onChange={handleClassInputChange}

                />
                <TextField
                    size="small"
                    id="outlined-password-input"
                    label="Số tiết"
                    type="number"
                    autoComplete="current-password"
                    style={{ width: "100px" }}
                    name="numberLesson"
                    value={classInfo.numberLesson}
                    onChange={handleClassInputChange}
                />

                <Button className="btnSave" onClick={handleClassSubmit} variant="text">Thêm</Button>

            </Box>
            <h3 style={{ margin: '10px 0' }}>Bảng tính lương của giáo viên</h3>
            <p style={{ fontStyle: 'italic', fontSize: 14, fontWeight: 300, margin: '10px 0' }}>Tiền dạy mỗi lớp =  số tiết * (hệ số giáo viên + hệ số môn học + hệ số lớp) * tiền dạy môt giờ chuẩn</p>
            <TableData rowsData={rowsData} settingDataConfig={settingDataConfig} />
            <div>
                <Box
                    component="form"
                    className='box-footer'
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{ display: 'flex', width: '50%' }}>

                        <TextField
                            id="outlined-read-only-input"
                            label="Tên giáo viên"
                            variant="standard"
                            defaultValue="Chưa có thông tin"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={savedTeacherInfo.nameTeacher}
                            focused
                        />
                        <TextField
                            id="outlined-read-only-input"
                            label="Mã giáo viên"
                            focused
                            variant="standard"
                            defaultValue="Chưa có thông tin"
                            value={savedTeacherInfo.teacherCode}
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ margin: '0 20px' }}
                        />
                    </div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Tổng tiền lương"
                        variant="standard"
                        type="number"
                        value={totalCost}
                        color="success"
                        focused
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}

export default MainPage