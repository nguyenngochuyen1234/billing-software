import { createContext, useEffect, useState } from "react";
import { setDocument, updateDocument, getDocument } from "./firebase/api";
export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const idTeacher = localStorage.getItem('idTeacher')
    const [rowsData, setRowsData] = useState([]);
    const [totalCost, setTotalCost] = useState(0)
    const [tuitionFee, setTuitionFee] = useState(0)
    const [coeffTeacherSaved, setCoeffTeacherSaved] = useState(0)
    const fetchTableData = async () => {
        try {
            if (idTeacher) {
                let initialFormTableData = await getDocument('dataTable', idTeacher)
                if (initialFormTableData) {
                    setRowsData(initialFormTableData.data)
                }
            }

        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchTableData()
    }, [])
    const changeAndSaveDataTable = async (newValue) => {
        if (idTeacher) {
            await setDocument('dataTable', idTeacher, { data: [...rowsData, newValue] })
        }
        setRowsData(prev => [...prev, newValue])

    }
    const deleteAndSaveDataTable = async (idDel) => {
        const copyRowsData = [...rowsData]
        let newTableData = copyRowsData.filter(row => row.id !== idDel)
        let dataChangedId = changeIdData(newTableData)
        await updateDocument('dataTable', idTeacher, { data: dataChangedId })
        setRowsData(dataChangedId)
    }
    const editAndSaveDataTable = async (editRow) => {
        let dataEdited = rowsData.map(dt => {
            if (dt.id == editRow.id) return editRow
            else return dt
        })
        getTotalCost(dataEdited)
        await updateDocument('dataTable', idTeacher, { data: dataEdited })
        setRowsData(dataEdited)
    }
    const changeIdData = (data) => {
        let newData = data.map((dt, idx) => { return { ...dt, id: idx + 1 } })
        return newData
    }
    const getTotalCost = (data) => {
        let total = 0
        data.forEach(dtRow => {
            let totalRow = parseFloat(dtRow.numberLesson) * (parseFloat(coeffTeacherSaved) + parseFloat(dtRow.coefficientClass) + parseFloat(dtRow.coefficientLesson)) * parseFloat(tuitionFee)
            total += totalRow
        })
        setTotalCost(total.toFixed(2))
    }
    useEffect(() => {
        let total = 0
        rowsData.forEach(item => {
            total += parseFloat(item.numberLesson) * (parseFloat(coeffTeacherSaved) + parseFloat(item.coefficientClass) + parseFloat(item.coefficientLesson)) * parseFloat(tuitionFee)
        })
        setTotalCost(total.toFixed(2))
    }, [rowsData, coeffTeacherSaved, tuitionFee])
    const value = {
        rowsData,
        changeAndSaveDataTable,
        deleteAndSaveDataTable,
        editAndSaveDataTable,
        totalCost,
        setTotalCost,
        coeffTeacherSaved, setCoeffTeacherSaved,
        tuitionFee, setTuitionFee
    };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}