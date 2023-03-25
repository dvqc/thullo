/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadein 200ms ease-in forwards",
        "fade-out": "fadeout 200ms ease-in forwards",
        "slide-in": "slidein 200ms ease-in forwards",
        "slide-out": "slideout 200ms ease-in forwards",
        glide: "glideKF 2s ease-in-out infinite alternate"
      },
      keyframes: {
        glideKF: {
          "0%": {
            transform: "translateX(-50%)"
          },
          "100%": {
            transform: "translateX(50%)"
          }
        },
        fadein: {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        fadeout: {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        },
        slidein: {
          "0%": {
            opacity: "0",
            left: "100%"
          },
          "100%": {
            opacity: "1",
            left: "0%"
          }
        },
        slideout: {
          "0%": {
            opacity: "1",
            right: "0%"
          },
          "100%": {
            opacity: "0",
            right: "50%"
          }
        }
      }
    },
  },
  plugins: [],
};

module.exports = config;
