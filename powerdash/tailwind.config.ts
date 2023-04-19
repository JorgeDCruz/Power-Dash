import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "orange": "#F15025",
      "white": "#FFFFFF",
      "gray": "#CED0CE",
      "lgray": "#E6E8E6",
      "black": "#191919"
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
