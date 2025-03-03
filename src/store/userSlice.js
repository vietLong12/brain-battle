import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "../api/userApi";
import { setLoading } from "./appSlice";
import toast from "react-hot-toast";

const loadUserFromLocalStorage = () => {
<<<<<<< HEAD
  const storedUser = localStorage.getItem("user");
  return storedUser
    ? JSON.parse(storedUser)
    : {
        userInfor: {
          name: "",
          avatar: "",
          id: "",
        },
        roomInfor: {
          id: "",
        },
      };
=======
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { name: "", avatar: "", room: "", id: "" };
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
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

<<<<<<< HEAD
const emoji = [
  { id: 1, emoji: "🌸" },
  { id: 2, emoji: "🌺" },
  { id: 3, emoji: "🌻" },
  { id: 4, emoji: "🌼" },
  { id: 5, emoji: "🌷" },
  { id: 6, emoji: "💐" },
];

const getEmoji = () => {
  const randomIndex1 = Math.floor(Math.random() * emoji.length);
  return `${emoji[randomIndex1].emoji}`;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfor.name = action.payload.name + " " + getEmoji();
      state.userInfor.avatar = action.payload.avatar;
      state.userInfor.id = action.payload.id;

      localStorage.setItem("user", JSON.stringify(state));
    },

    setRoom: (state, action) => {
      state.roomInfor.id = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },

    logoutUser: (state) => {
      localStorage.removeItem("user");
      return {
        userInfor: { name: "", avatar: "", id: "" },
        roomInfor: { id: "" },
      };
    },
  },
=======
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
>>>>>>> 7b12379b0a1b2d4d6eb344ef173478eb9d648cc2
});

export const { setRoom, logoutUser } = userSlice.actions;
export default userSlice.reducer;
