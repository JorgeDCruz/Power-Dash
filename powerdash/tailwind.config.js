/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: {
          DEFAULT: "#000000"
        },
        ibm: {
          coolGray: {
            DEFAULT: "#121619",
            90: "#21272a",
            80: "#343a3f",
            70: "#4d5358",
            60: "#697077",
            50: "#878d96",
            40: "#a2a9b0",
            30: "#c1c7cd",
            20: "#dde1e6",
            10: "#f2f4f8"
          },
          magenta: {
            DEFAULT: "#2a0a18",
            90: "#510224",
            80: "#740937",
            70: "#9f1853",
            60: "#d02670",
            50: "#ee5396",
            40: "#ff7eb6",
            30: "#ffafd2",
            20: "#ffd6e8",
            10: "#fff0f7"
          },
          purple: {
            DEFAULT: "#1c0f30",
            90: "#31135e",
            80: "#491d8b",
            70: "#6929c4",
            60: "#8a3ffc",
            50: "#a56eff",
            40: "#be95ff",
            30: "#d4bbff",
            20: "#e8daff",
            10: "#f6f2ff"
          },
          blue: {
            DEFAULT: "#001141",
            90: "#001d6c",
            80: "#002d9c",
            70: "#0043ce",
            60: "#0f62fe",
            50: "#4589ff",
            40: "#78a9ff",
            30: "#a6c8ff",
            20: "#d0e2ff",
            10: "#edf5ff"
          },
          cyan: {
            DEFAULT: "#061727",
            90: "#012749",
            80: "#003a6d",
            70: "#00539a",
            60: "#0072c3",
            50: "#1192e8",
            40: "#33b1ff",
            30: "#82cfff",
            20: "#bae6ff",
            10: "#e5f6ff"
          }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}