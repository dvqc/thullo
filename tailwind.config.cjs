/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px"
      },
      fontFamily: {
        poppins: "Poppins"
      },
      fontSize: {
        "2xs": "10px"
      },
      animation: {
        "fade-in": "fadein 200ms ease-in forwards",
        "fade-out": "fadeout 200ms ease-in forwards",
        "slide-in": "slidein 200ms ease-in forwards",
        "slide-out": "slideout 200ms ease-in forwards",
        "slide-up": "slideup 200ms ease-out  forwards",
        "bounce-up": "bounceUp 200ms ease-out forwards",
        "bounce-down": "bounceDown 200ms ease-out forwards",
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
            transform: "translateX(100%)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0%)"
          }
        },
        slideout: {
          "0%": {
            opacity: "1",
            transform: "translateX(0%)"
          },
          "100%": {
            opacity: "0",
            transform: "translateX(100%)"
          }
        },
        slideup: {
          "0%": {
            top: "100%"
          },
          "100%": {
            top: "0%"
          }
        },
        bounceUp: {
          "0%": {
            transform: "translateY(0%)"
          },
          "100%": {
            transform: "translateY(-20%)"
          }
        },
        bounceDown: {
          "0%": {
            transform: "translateY(-20%)"
          },
          "100%": {
            transform: "translateY(0%)"
          }
        }

      }
    }
  },
  plugins: []
};

module.exports = config;
