import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer,
} from 'recharts'
import useStyles from './styles'
import DropFile from '../components/DropFile'
import Logo from '../svg/Logo'
import { currencyFormater } from '../utils/functions'
import { randomColorGenerator } from '../utils/colors'

function App() {
    const styles = useStyles()
    const categorizedTotals = useSelector(
        state => state.expenses?.categorizedTotals
    )
    const expensesGeneraltotal = useSelector(
        state => state.expenses?.generalTotal
    )

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.logoAndDrop} >
            <Logo style={{width: 200, height: 200}}/>
            <DropFile
                dragTxt='Arraste o extrato financeiro mensal no formato .xlsx .xls'
                droptxt='Solte o arquivo para o processamento dos dados'
                maxFiles={1}
            />
            </Box>

            {categorizedTotals && (
                <ResponsiveContainer>
                    <BarChart
                        width={400}
                        height={500}
                        data={categorizedTotals}
                        margin={{
                            top: 0,
                            right: 10,
                            bottom: 95,
                            left: 50,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3 3' />
                        <XAxis
                            dataKey='categoria'
                            interval={0}
                            angle={-35}
                            textAnchor='end'
                        />
                        <YAxis
                            tickFormatter={value => currencyFormater(value)}
                            domain={[0, 20000]}
                        />
                        <Tooltip
                            formatter={(value, name, porps) => [
                                currencyFormater(value),
                                name,
                            ]}
                        />
                        <Legend
                            formatter={(value, entry, index) =>
                                `Total de despesas ${expensesGeneraltotal}`
                            }
                            iconType='star'
                            verticalAlign='middle'
                        />
                        <Bar dataKey='total' barSize={25} minPointSize={5}>
                            {categorizedTotals.map((obj, idx) => (
                                <Cell
                                    key={`call-${idx}`}
                                    fill={randomColorGenerator()}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    )
}

export default App
