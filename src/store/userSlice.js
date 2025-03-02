import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
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
};

const initialState = loadUserFromLocalStorage();

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
});

export const { setUser, setRoom, logoutUser } = userSlice.actions;
export default userSlice.reducer;
