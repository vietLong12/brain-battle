import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "../api/userApi";
import { setLoading } from "./appSlice";
import toast from "react-hot-toast";

const loadUserFromLocalStorage = () => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "", avatar: "", room: "", id: "" };
};

// 🎯 Hàm async để gọi API
export const setUserAsync = createAsyncThunk(
    "user/setUser",
    async ({ name, file }, { rejectWithValue }) => {
        try {
            const res = await createUser({ name, file });
            console.log('res: ', res);
            if (res.status) {
                return { name: res.data.name, avatar: res.data.avatar, id: res.data._id };
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
);

const initialState = loadUserFromLocalStorage();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.room = action.payload;
        },
        logoutUser: (state) => {
            sessionStorage.removeItem("user");
            return { name: "", avatar: "", room: "", id: "" };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserAsync.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.avatar = action.payload.avatar;
                state.id = action.payload.id;
                sessionStorage.setItem("user", JSON.stringify(state));
            })
            .addCase(setUserAsync.rejected, (state, action) => {
                console.log("Lỗi khi tạo user:", action.payload);
            });
    }
});

export const { setRoom, logoutUser } = userSlice.actions;
export default userSlice.reducer;
