import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
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
    PieChart,
    Pie,
    Text,
} from 'recharts'
import useStyles from './styles'
import DropFile from '../components/DropFile'
import Logo from '../svg/Logo'
import { currencyFormater } from '../utils/functions'
import { randomColorGenerator } from '../utils/colors'

function App() {
    const styles = useStyles()
    const categorizedExpensesTotals = useSelector(
        state => state.expenses?.categorizedExpensesTotals
    )
    const expensesGeneraltotal = useSelector(
        state => state.expenses?.generalTotal
    )
    const categorizedIncomesTotals = useSelector(
        state => state.incomes?.categorizedIncomesTotals
    )
    const incomesGeneralTotal = useSelector(
        state => state.incomes?.generalIncomesTotal
    )
    const fixedAndVariableCosts = useSelector(
        state => state.expenses?.fixedAndVariableCosts
    )

    const COLORS = [
        'forestgreen',
        'orangered',
        'lightseagreen',
        'mediumslateblue',
        'darkcyan',
        'rebeccapurple',
        'gray',
        'steelblue',
        'blue',
    ]

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.logoAndDrop}>
                <Logo style={{ width: 200, height: 200 }} />
                <DropFile
                    dragTxt='Arraste o extrato financeiro mensal no formato .xlsx .xls'
                    droptxt='Solte o arquivo para o processamento dos dados'
                    maxFiles={1}
                />
            </Box>

            {categorizedExpensesTotals && (
                <ResponsiveContainer width='95%' height={500}>
                    <BarChart
                        width={400}
                        height={500}
                        data={categorizedExpensesTotals}
                        margin={{
                            top: 0,
                            right: 10,
                            bottom: 120,
                            left: 50,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3 3' />
                        <XAxis
                            dataKey='categoria'
                            interval={0}
                            angle={-30}
                            textAnchor='end'
                            tickFormatter={value =>
                                value.replace('#v', '').replace('#f', '')
                            }
                        />
                        <YAxis
                            tickFormatter={value => currencyFormater(value)}
                        />
                        <Tooltip
                            formatter={(value, name, porps) => [
                                currencyFormater(value),
                            ]}
                        />
                        <Legend
                            formatter={() => (
                                <Typography
                                    variant='span'
                                    className={styles.totals}
                                >
                                    {`Total de despesas ${currencyFormater(
                                        expensesGeneraltotal
                                    )}`}
                                </Typography>
                            )}
                            iconType='line'
                            verticalAlign='top'
                            align='center'
                            height={50}
                        />
                        <Bar dataKey='total' barSize={25} minPointSize={5}>
                            {categorizedExpensesTotals.map((obj, idx) => (
                                <Cell
                                    key={`call-${idx}`}
                                    fill={randomColorGenerator()}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
            {fixedAndVariableCosts && (
                <Box className={styles.fixedAndVarBar} >
                <ResponsiveContainer width={900} height={400}>
                    <BarChart
                        width={500}
                        height={300}
                        data={fixedAndVariableCosts.totals}
                        margin={{
                            top: 50,
                            right: 0,
                            left: 50,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='type' />
                        <YAxis
                            tickFormatter={value => currencyFormater(value)}
                        />
                        <Tooltip
                            formatter={(value, name, porps) => [
                                currencyFormater(value),
                            ]}
                        />
                               <Legend
                            formatter={() => (
                                <Typography
                                    variant='span'
                                    className={styles.totals}
                                >
                                    {`Custo Fixo ${currencyFormater(fixedAndVariableCosts.totals[0].total)} - Custo Variável ${currencyFormater(fixedAndVariableCosts.totals[1].total)}`}
                                </Typography>
                            )}
                            iconType='line'
                            verticalAlign='top'
                            align='center'
                            height={60}
                        />
                        <Bar dataKey='total'>
                            {fixedAndVariableCosts.totals.map((i, idx) => {
                                return (
                                    <Cell
                                        key={`bar-${i.type}`}
                                        fill={COLORS[idx % COLORS.length]}
                                    />
                                )
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </Box>
            )}
            {categorizedIncomesTotals && (
                <Box className={styles.pieChartWrapper}>
                    <Typography variant='span' className={styles.totals}>
                        Total de Receitas{' '}
                        {currencyFormater(incomesGeneralTotal)}
                    </Typography>
                    <ResponsiveContainer width={900} height={400}>
                        <PieChart>
                            <Pie
                                data={categorizedIncomesTotals}
                                cx='50%'
                                cy='50%'
                                outerRadius={150}
                                fill='#8884d8'
                                dataKey='total'
                                minAngle={2}
                            >
                                {categorizedIncomesTotals.map((item, idx) => {
                                    return (
                                        <Cell
                                            key={`cell-${idx}`}
                                            fill={COLORS[idx % COLORS.length]}
                                        />
                                    )
                                })}
                            </Pie>
                            <Legend
                                verticalAlign='middle'
                                align='left'
                                layout='vertical'
                                formatter={(value, entry, idx) => {
                                    return `${
                                        entry.payload?.categoria
                                    } - ${currencyFormater(
                                        entry.payload?.total
                                    )} -  ${(
                                        entry.payload?.percent * 100
                                    ).toFixed(2)} %`
                                }}
                                iconType='circle'
                                iconSize={18}
                            />
                            <Tooltip
                                formatter={(value, name, props) => {
                                    return [
                                        `${currencyFormater(value)} - ${(
                                            (value / incomesGeneralTotal) *
                                            100
                                        ).toFixed(2)} %`,
                                        null,
                                    ]
                                }}
                                contentStyle={{ fontSize: 18 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </Box>
    )
}

export default App
