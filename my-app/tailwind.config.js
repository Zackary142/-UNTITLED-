import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: false,
  },
  safelist: [
    'grid-cols-1',
    'md:grid-cols-3',
  ],
}
