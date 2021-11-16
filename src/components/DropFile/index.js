import { useCallback } from 'react'
import XLSX from 'xlsx'
import { useDispatch } from 'react-redux'

import { useDropzone } from 'react-dropzone'
import {
    loadExpensesList,
    loadExpensesTotal,
    loadCategorizedExpenses,
    loadCategorizedExpensesTotals,
} from '../../redux/slices/expenses-slice'
import {
    loadIncomesList,
    loadIncomesTotal,
    loadCategorizedIncomes,
    loadCategorizedIncomesTotals
} from '../../redux/slices/incomes-slice'
import { handleExpenses } from '../../ExcelHandlers/expensesXLHandler'
import useStyles from './styles'
import { handleIncome } from '../../ExcelHandlers/incomeXLHandler'

function DropFile({ dragTxt, droptxt }) {
    const styles = useStyles()
    const dispatch = useDispatch()

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        const selectedFile = acceptedFiles[0]
        reader.readAsBinaryString(selectedFile)

        reader.onload = e => {
            const binaryData = e.target.result

            const workbook = XLSX.read(binaryData, {
                cellDates: true,
                type: 'binary',
            })

            const sheetName = workbook.SheetNames[0]

            const parsedExcel = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
            )

            const {
                expenses,
                categorizedExpenses,
                totalExpenses,
                sortedExpensesCategorizedTotal,
            } = handleExpenses(parsedExcel)

            const {
                incomes,
                categorizedIncomes,
                totalIncomes,
                sortedIncomesCategorizedTotal,
            } = handleIncome(parsedExcel)

            // expenses
            dispatch(loadExpensesList(expenses))
            dispatch(loadExpensesTotal(totalExpenses))
            dispatch(loadCategorizedExpenses(categorizedExpenses))
            dispatch(loadCategorizedExpensesTotals(sortedExpensesCategorizedTotal))

            //income
            dispatch(loadIncomesList(incomes))
            dispatch(loadIncomesTotal(totalIncomes))
            dispatch(loadCategorizedIncomes(categorizedIncomes))
            dispatch(loadCategorizedIncomesTotals(sortedIncomesCategorizedTotal))
        }

        // reader.onloadend = e => {
        //     console.log('onloadend chamado')
        // }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.xlsx,.xls',
    })

    return (
        <div {...getRootProps({ className: styles.dropFile })}>
            <input {...getInputProps()} />
            {isDragActive ? <p>{droptxt}</p> : <p>{dragTxt}</p>}
        </div>
    )
}

export default DropFile
