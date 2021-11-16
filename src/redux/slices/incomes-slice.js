import { createSlice } from '@reduxjs/toolkit'

const incomesSlice = createSlice({
    name: 'incomes',
    initialState: {
        incomesList: null,
        generalIncomesTotal: null,
        categorizedIncomes: null,
        categorizedIncomesTotals: null
    },
    reducers: {
        loadIncomesList(state, action) {
            state.incomesList = action.payload
        },
        loadIncomesTotal(state, action) {
            state.generalIncomesTotal = action.payload
        },
        loadCategorizedIncomes(state, action) {
            state.categorizedIncomes = action.payload
        },
        loadCategorizedIncomesTotals(state, action) {
            state.categorizedIncomesTotals = action.payload
        }
    },
})

export const { loadIncomesList, loadIncomesTotal, loadCategorizedIncomes, loadCategorizedIncomesTotals } = incomesSlice.actions
export default incomesSlice.reducer
