import React, { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/BorderColor';
import { DataGrid } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';
import { AppContext } from './AppContext';
const TableData = ({ rowsData, settingDataConfig }) => {
    const { coeffTeacherSaved } = useContext(AppContext)
    const [rowDelete, setRowDelete] = useState([])
    const [rowEdit, setRowEdit] = useState([])
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)
    const [dialogEditOpen, setDialogEditOpen] = useState(false)
    const columns = [
        { field: 'id', headerName: 'STT', align: 'center' },
        { field: 'nameClass', headerName: 'Lớp', align: 'center' },
        { field: 'numberStudent', headerName: 'Số sinh viên trong lớp', type: 'number', width: 200, align: 'center' },
        {
            field: 'coefficientLesson',
            headerName: 'Hệ số môn học',
            type: 'number',
            width: 200,
            align: 'center'
        },
        {
            field: 'numberLesson',
            headerName: 'Số tiết',
            type: 'number',
            width: 200,
            align: 'center'

        },
        {
            field: 'tuitionFee',
            headerName: 'Tiền dạy',
            type: 'number',
            width: 200,
            align: 'center',
            renderCell: (params) => {
                let rowData = params.row
                let tuitionFee = settingDataConfig.tuitionFee
                let totalRow = parseFloat(rowData.numberLesson) * (parseFloat(coeffTeacherSaved) + parseFloat(rowData.coefficientClass) + parseFloat(rowData.coefficientLesson)) * parseFloat(tuitionFee)
                return (
                    <> {totalRow.toFixed(2)}</>
                )
            }
        },
        {
            field: 'feature',
            headerName: 'Tính năng',
            sortable: false,
            width: 200,
            align: 'center',
            headerClassName: 'aggregationColumnHeader--alignCenter',
            renderCell: (params) => (
                <div>
                    <DeleteIcon style={{ margin: '0 10px', cursor: 'pointer' }} onClick={() => { deleteRowHandle(params.row) }} color="error" />
                    <EditIcon style={{ margin: '0 10px', cursor: 'pointer' }} onClick={() => { editRowHandle(params.row) }} color="primary" />
                </div>

            ),
        },
    ];
    const deleteRowHandle = (data) => {
        setRowDelete(data)
        setDialogDeleteOpen(true)
    }
    const editRowHandle = (data) => {
        setRowEdit(data)
        setDialogEditOpen(true)
    }
    return (
        <>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    rows={rowsData}
                    columns={columns}
                    getRowId={(row) => row.id}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    hideFooter={true}
                />
            </div>
            <DialogDelete
                dialogDeleteOpen={dialogDeleteOpen}
                setDialogDeleteOpen={setDialogDeleteOpen}
                rowDelete={rowDelete}
            />
            <DialogEdit
                dialogEditOpen={dialogEditOpen}
                setDialogEditOpen={setDialogEditOpen}
                rowEdit={rowEdit}

            />
        </>

    )
}

export default TableData