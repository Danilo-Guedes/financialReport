export function handleExpenses(parsedXLtoObj) {
    const transformeDate = data => {
        const withRightDateObj = data.map(i => {
            return {
                ...i,
                Data: i.Data.toLocaleDateString(),
            }
        })
        return withRightDateObj
    }

    const parsedXLToJsonWithDate = transformeDate(parsedXLtoObj)

    const filterdJson = parsedXLToJsonWithDate.filter(
        i => i.Categoria !== 'Transferências'
    ) //TODO : transform into a discard function with a array of discard optns

    const expenses = filterdJson.filter(i => i.Tipo === 'D')

    const calculateTotal = list => {
        //TODO: transfor into a function CalculateTotalInJSON where recieve a column name as a parameter
        let total = 0
        list.forEach(i => {
            total += Number(i.Valor)
        })
        //   const formatedValue = Intl.NumberFormat('pt-BR').format(total)

        return parseFloat(total.toFixed(2))
    }

    const totalExpenses = calculateTotal(expenses)

    const separateCategories = data => {
        const categories = new Set()
        expenses.forEach(exp => {
            categories.add(exp.Categoria)
        })
        return Array.from(categories)
    }

    const ExpCategoriesList = separateCategories(expenses)

    const categorizedExpenses = ExpCategoriesList.map(ctg => {
        const expAux = expenses.filter(exp => {
            return exp.Categoria === ctg
        })
        return {
            [ctg]: expAux,
        }
    })

    const calculateCategorizedTotal = list => {
        return list.map((xp, idx) => {
            const entries = Object.entries(xp)

            let total = 0
            entries?.[0]?.[1].forEach(xp => {
                total += Number(xp.Valor)
            })

            return {
                categoria: entries?.[0]?.[0],
                total: parseFloat(total.toFixed(2)),
            }
        })
    }

    const categorizedTotals = calculateCategorizedTotal(categorizedExpenses)

    const separateFixedAndVariableCosts = list => {
        const fixedCosts = []
        const variableCosts = []
        let fixedTotal = 0
        let variableTotal = 0

        list.forEach(i => {
            if (i.categoria.includes('#f')) {
                fixedCosts.push(i)
                fixedTotal += i.total
            } else {
                variableCosts.push(i)
                variableTotal += i.total
            }
        })

        const finalObj = {
            fixedCosts,
            variableCosts,
            totals : {
                fixedTotal,
                variableTotal
            }
        }

        return finalObj
    }

    const fixedAndVariableCosts =
        separateFixedAndVariableCosts(categorizedTotals)

    const sortedExpensesCategorizedTotal = categorizedTotals.sort((a, b) => {
        if (Number(a.total) < Number(b.total)) return 1
        if (Number(a.total) > Number(b.total)) return -1
        return 0
    })

    return {
        expenses,
        categorizedExpenses,
        totalExpenses,
        sortedExpensesCategorizedTotal,
        fixedAndVariableCosts,
    }
}
