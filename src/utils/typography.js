import Typography from "typography"
const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Libre Baskerville','Comic Sans MS','Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Libre Baskerville','Comic Sans MS','Georgia', 'serif'],
  googleFonts: [
    {
      name: 'Libre Baskerville',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
    {
      name: 'Merriweather',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
