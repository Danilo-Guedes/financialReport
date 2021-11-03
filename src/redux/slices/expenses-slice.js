import { createSlice } from '@reduxjs/toolkit'

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        list: null,
        total: null
    },
    reducers: {
        loadExpensesList(state, action) {
            state.list = action.payload
        },
        loadExpensesTotal(state, action) {
            state.total = action.payload
        }
    },
})

export const { loadExpensesList, loadExpensesTotal } = expensesSlice.actions
export default expensesSlice.reducer
