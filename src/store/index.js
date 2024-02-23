import {configureStore} from '@reduxjs/toolkit'
import stuReducer from './modules/stuSlice'


const store = configureStore({
    reducer: {
        stu:stuReducer
    }
});

export default store;