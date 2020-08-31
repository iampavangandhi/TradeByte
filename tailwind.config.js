const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: true,
    content: ["./views/**/*.ejs"],
  },
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          900: "#1955e4",
        },
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
        // colors according to design 400->blue 200->red 500->green
        tempc: {
          100: "#365088",
          200: "#E93434",
          300: "#AAB8D0",
          400: "#266FEA",
          500: "#41D7AA",
          600: "#236AE1",
          700: "#879CC0",
          800: "#CADAEC",
          900: "#3DB197",
          1000: "#D9FFF7",
          1100: "#E5EDFB",
          1200: "#F8FAFF",
        },
      },
      fontFamily: {
        body: ["Nunito"],
      },
    },
  },
  variants: {},
  plugins: [],
};
