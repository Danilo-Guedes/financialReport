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
import { currencyFormater } from '../utils/functions'
import { randomColorGenerator } from '../utils/colors'

function App() {
    const styles = useStyles()
    const categorizedTotals = useSelector(state => state.expenses?.categorizedTotals)

    return (
        <Box className={styles.wrapper}>
            <DropFile
                dragTxt='Arraste o extrato financeiro mensal no formato .xlsx .xls'
                droptxt='Solte o arquivo para o processamento dos dados'
                maxFiles={1}
            />

            {categorizedTotals && (
                <ResponsiveContainer>
                    <BarChart
                        width={400}
                        height={500}
                        data={categorizedTotals}
                        margin={{
                            top: 50,
                            right: 10,
                            bottom: 0,
                            left: 50,
                        }}
                        
                    >
                        <CartesianGrid strokeDasharray="3 3 3" />
                        <XAxis dataKey="categoria"/>
                        <YAxis tickFormatter={(value) => currencyFormater(value)} domain={[0, 20000]} />
                        <Tooltip  formatter={(value, name, porps) => [currencyFormater(value), name]} />
                        <Legend />
                        <Bar dataKey='total'fill={randomColorGenerator()} barSize={20}>
                            {categorizedTotals.map((obj, idx) => (
                                <Cell key={`call-${idx}`} fill={randomColorGenerator()} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Box>
    )
}

export default App
