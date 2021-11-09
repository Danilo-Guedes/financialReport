import { useCallback } from 'react'
import XLSX from 'xlsx'
import { useDispatch } from 'react-redux'

import { useDropzone } from 'react-dropzone'
import {
    loadCategorizedExpenses,
    loadCategorizedTotals,
    loadExpensesList,
    loadExpensesTotal,
} from '../../redux/slices/expenses-slice'
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

            const data = allData.filter(i => i.Categoria !== 'Transferências')

            // console.log(data);

            const expenses = data.filter(i => i.Tipo === 'D')
            const income = data.filter(i => i.Tipo === 'C')

            // console.log(JSON.stringify(expenses))

            const calculateTotal = list => {
                let total = 0
                list.forEach(i => {
                    total += Number(i.Valor)
                })
                return Intl.NumberFormat('pt-BR').format(total)
            }

            const totalExpenses = calculateTotal(expenses)
            const totalIncome = calculateTotal(income)

            alert(
                `Total de despesas ${totalExpenses} e Total de receitas ${totalIncome}`
            )

            const separateCategories = data => {
                const categories = new Set()
                expenses.forEach(exp => {
                    categories.add(exp.Categoria)
                })
                return Array.from(categories)
            }

            const expensesCategories = separateCategories(expenses)

            // console.log('qtde categorias =>', expensesCategories.length)

            const categorizedExpenses = expensesCategories.map(ctg => {
                const expAux = expenses.filter(exp => {
                    return exp.Categoria === ctg
                })
                return {
                    [ctg]: expAux,
                }
            })

            // console.log(JSON.stringify(categorizedExpenses));

            const calculateCategorizedTotal = (list) => {
                return list.map((xp, idx) => {
                    // console.log(xp, idx)
                    // console.log(typeof xp)

                    const entries = Object.entries(xp)

                    let total = 0
                    entries?.[0]?.[1].forEach(xp => {
                        // console.log(xp)
                        total += Number(xp.Valor)
                    })

                    // console.log({[entries?.[0]?.[0]]: total,});

                    return {
                       categoria : [entries?.[0]?.[0]],
                       total:  total.toFixed(2),
                    }

                    // return totalAux
                    // console.log(totalAux);
                })
            }

            const categorizedTotals = calculateCategorizedTotal(categorizedExpenses)

            


            dispatch(loadExpensesList(categorizedExpenses))
            dispatch(loadExpensesTotal(totalExpenses))
            dispatch(loadCategorizedExpenses(categorizedExpenses))
            dispatch(loadCategorizedTotals(categorizedTotals))
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
