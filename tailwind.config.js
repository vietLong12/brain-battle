/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Đảm bảo đúng đường dẫn
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 3px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.6)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.7)",
      },
      colors: {
        "orange-primary": "#D97706", // Đúng định dạng
        "orange-secondary": "#FFF9C4", // Thêm "#" trước mã màu
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    
  },
};
