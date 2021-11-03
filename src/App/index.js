import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import useStyles from './styles'
import DropFile from '../components/DropFile'

function App() {
    const styles = useStyles()
    const expensesList = useSelector(state => state.expenses.list)

    return (
        <Box className={styles.wrapper}>
            <DropFile
                dragTxt='Arraste o extrato financeiro mensal no formato .xlsx .xls ou .csv'
                droptxt='Solte o arquivo para o processamento dos dados'
                maxFiles={1}
            />

            {expensesList && (
                <ResponsiveContainer>
                    <BarChart
                        width={500}
                        height={500}
                        data={expensesList}
                        margin={{
                            top: 50,
                            right: 10,
                            bottom: 0,
                            left: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='Categoria' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='Valor'fill="#228B22" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    )
}

export default App
