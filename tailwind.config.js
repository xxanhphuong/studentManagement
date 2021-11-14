module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Inter", "system-ui", "sans-serif"],
      body: ["Inter", "system-ui", "sans-serif"],
    },
    screens: {
      sm: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px", //2xl needs quotes because it starts with a number
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#306ee5",
      white: "#f3f5f9",
    }),
    textColor: {
      primary: "#306ee5",
    },
    colors: {
      // set up theme colors
      primary: {
        50: "#f5f8fe",
        100: "#eaf1fc",
        200: "#cbdbf9",
        300: "#acc5f5",
        400: "#6e9aed",
        500: "#306ee5",
        600: "#2b63ce",
        700: "#2453ac",
        800: "#1d4289",
        900: "#183670",
      },
      gray: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
      },
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        rainbow:
          "0 0 0 10px #ff0000,0 0 0 20px #ff7700,0 0 0 30px #FFDD00,0 0 0 40px #00FF00,0 0 0 50px #0000FF,0 0 0 60px #C77DF3,0 0 0 70px #8A2BE2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
