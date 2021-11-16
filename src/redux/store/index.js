import { configureStore } from '@reduxjs/toolkit'

import expensesReducer from '../slices/expenses-slice'
import incomesReducer from '../slices/incomes-slice'

export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        incomes: incomesReducer
    },
})