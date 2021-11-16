export function handleIncome(parsedXLtoObj) {
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

    const incomes = filterdJson.filter(i => i.Tipo === 'C')

    const calculateTotal = list => {
        //TODO: transfor into a function CalculateTotalInJSON where recieve a column name as a parameter
        let total = 0
        list.forEach(i => {
            total += Number(i.Valor)
        })
        //   const formatedValue = Intl.NumberFormat('pt-BR').format(total)

        return parseFloat(total.toFixed(2))
    }

    const totalIncomes = calculateTotal(incomes)

    const separateCategories = data => {
        const categories = new Set()
        incomes.forEach(exp => {
            categories.add(exp.Categoria)
        })
        return Array.from(categories)
    }

    const IncCategoriesList = separateCategories(incomes)

    const categorizedExpenses = IncCategoriesList.map(ctg => {
        const expAux = incomes.filter(exp => {
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

    const categorizedIncomes = calculateCategorizedTotal(categorizedExpenses)

    const sortedIncomesCategorizedTotal = categorizedIncomes.sort((a, b) => {
        if (Number(a.total) < Number(b.total)) return 1
        if (Number(a.total) > Number(b.total)) return -1
        return 0
    })

    return {
        incomes,
        categorizedIncomes,
        totalIncomes,
        sortedIncomesCategorizedTotal,
    }
}
