// tailwind-config.js
window.tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#2a9d8f",
          dark: "#264653",
        },
        primaryDark: {
          light: "#006699",
          dark: "#0077cc",
        },
        secondary: {
          light: "#fefae0",
          dark: "#264653",
        },
        dark: {
          light: "#212529",
          dark: "#e1e1e1",
        },
        light: {
          light: "#f5f6fa",
          dark: "#353b48",
        },
      },
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "serif"],
        "noto-sans": ["Noto Sans", "sans-serif"],
        "pangolin-regular": ["Pangolin", "cursive"],
      },
    },
  },
};

// .pangolin-regular {
//     font-family: "Pangolin", cursive;
//     font-weight: 400;
//     font-style: normal;
//   }
