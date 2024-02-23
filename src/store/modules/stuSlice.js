import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getStuListApi, AddStuApi, updateStuApi, deleteStuByIdApi} from '../../api/stuApi'


export const stuSlice = createSlice({
    name: "stu",
    initialState: {
        stuList: []
    },
    reducers: {
        setStuList: (state, {payload}) => {
            state.stuList = payload;
        },

        addStu: (state, {payload}) => {
            state.stuList.push(payload);
        },

        updateStu: (state, {payload}) => {
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === payload.id) {
                    state.stuList.splice(i, 1, payload.stu);
                    break;
                }
            }
        },

        deleteStu: (state, {payload}) => {
            for (let i = 0; i < state.stuList.length; i++) {
                if (state.stuList[i].id === payload.id) {
                    state.stuList.splice(i, 1);
                    break;
                }
            }
        }

    }
});

const {
    setStuList,
    addStu,
    updateStu,
    deleteStu
} = stuSlice.actions;

export const fetchStuList = () => {
    return async (dispatch) => {
        const res = await getStuListApi();
        dispatch(setStuList(res.data));
    }
}


export const addStuAsync = createAsyncThunk(
    "stu/addStuAsync",
    async (payload, thunkAPI) => {
        const {data} = await AddStuApi(payload)
        thunkAPI.dispatch(addStu(data));
    }
);


export const updateStuAsync = createAsyncThunk(
    "stu/updateStuAsync",
    async (payload, thunkAPI) => {
        await updateStuApi(payload.id, payload.stu);
        thunkAPI.dispatch(updateStu(payload));
    }
);


export const deleteStuAsync = createAsyncThunk(
    "stu/deleteStuAsync",
    async (payload,thunkAPI) => {
        await deleteStuByIdApi(payload);
        thunkAPI.dispatch(deleteStu(payload));
    }
);


export default stuSlice.reducer;
