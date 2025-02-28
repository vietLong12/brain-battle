import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
        name: "",
        avatar: "",
        room: "",
        id: "",
    };
};

const initialState = loadUserFromLocalStorage();


const emoji = [
    {
        id: 1,
        emoji: "🌸",
    },
    {
        id: 2,
        emoji: "🌺",
    },
    {
        id: 3,
        emoji: "🌻",
    },
    {
        id: 4,
        emoji: "🌼",
    },
    {
        id: 5,
        emoji: "🌷",
    },
    {
        id: 6,
        emoji: "💐",
    },
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

            // Cập nhật state
            state.name = action.payload.name + ' ' + getEmoji();
            state.avatar = action.payload.avatar;

            // Lưu vào localStorage
            localStorage.setItem('user', JSON.stringify(state));
        },

        setRoom: (state, action) => {
            state.room = action.payload;
        },
        logoutUser: (state) => {
            localStorage.removeItem("user");
            return { name: "", avatar: "", room: "", id: "" };
        }
    },
});

export const { setUser, setRoom, logoutUser } = userSlice.actions;
export default userSlice.reducer;
