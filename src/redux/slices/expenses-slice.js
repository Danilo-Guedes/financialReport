import { createSlice } from '@reduxjs/toolkit'

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expensesList: null,
        generalTotal: null,
        categorizedExpenses: null,
        categorizedTotals: null
    },
    reducers: {
        loadExpensesList(state, action) {
            state.expensesList = action.payload
        },
        loadExpensesTotal(state, action) {
            state.generalTotal = action.payload
        },
        loadCategorizedExpenses(state, action) {
            state.categorizedExpenses = action.payload
        },
        loadCategorizedTotals(state, action) {
            state.categorizedTotals = action.payload
        }
    },
})

export const { loadExpensesList, loadExpensesTotal, loadCategorizedExpenses, loadCategorizedTotals } = expensesSlice.actions
export default expensesSlice.reducer
