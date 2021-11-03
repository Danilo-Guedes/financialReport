import { configureStore } from '@reduxjs/toolkit'

import expensesReducer from '../slices/expenses-slice'

export const store = configureStore({
    reducer: {
        expenses: expensesReducer
    },
})