import { useCallback } from 'react'
import XLSX from 'xlsx'
import { useDispatch } from 'react-redux'

import { useDropzone } from 'react-dropzone'
import { loadExpensesList, loadExpensesTotal } from '../../redux/slices/expenses-slice'
import useStyles from './styles'

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
                // cellDates: true,
                type: 'binary',
            })

            const sheetName = workbook.SheetNames[0]

            const allData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

            const data = allData.filter(i => i.Categoria !== "Transferências")

            // console.log(data);

            const expenses = data.filter(i => i.Tipo === 'D')
            const income = data.filter(i => i.Tipo === 'C')

            const calculateTotal = (list) => {
                let total = 0
                list.forEach(i => {
                    total += i.Valor
                })
                return Intl.NumberFormat('pt-BR').format(total)
            }

            const totalExpenses = calculateTotal(expenses)
            const totalIncome = calculateTotal(income)


           alert(`Total de despesas ${totalExpenses} e Total de receitas ${totalIncome}`)

           dispatch(loadExpensesList(expenses))
           dispatch(loadExpensesTotal(totalExpenses))
        }

        reader.onloadend = e => {
            console.log('onloadend chamado')
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.xlsx,.xls,.csv',
    })

    return (
        <div {...getRootProps({ className: styles.dropFile })}>
            <input {...getInputProps()} />
            {isDragActive ? <p>{droptxt}</p> : <p>{dragTxt}</p>}
        </div>
    )
}

export default DropFile
