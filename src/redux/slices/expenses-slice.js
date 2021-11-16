import { createSlice } from '@reduxjs/toolkit'

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expensesList: null,
        generalTotal: null,
        categorizedExpenses: null,
        categorizedExpensesTotals: null
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
        loadCategorizedExpensesTotals(state, action) {
            state.categorizedExpensesTotals = action.payload
        }
    },
})

export const { loadExpensesList, loadExpensesTotal, loadCategorizedExpenses, loadCategorizedExpensesTotals } = expensesSlice.actions
export default expensesSlice.reducer
