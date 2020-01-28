import Typography from "typography"
const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.566667,
  headerFontFamily: ['Libre Baskerville','Merriweather','Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Libre Baskerville','Merriweather','Georgia', 'serif'],
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
    {
      name: 'Roboto',
      styles: [
        '400',
        '400i',
        '500',
        '900',
        '700',
        '700i',
      ],
    },
  ],
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      a: {
        borderColor: `black`,
        color: `black`,
        textDecoration: `none`,
      },
      blockquote: {
        borderLeft: `${rhythm(1 / 4)} solid red`,
        color: `black`,
        fontStyle: `italic`,
        marginLeft: 0,
        marginRight: rhythm(1),
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
        paddingLeft: rhythm(2 / 4),
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      hr: {
        background: `smoke`,
        height: `2px`,
      },
      // Style gatsby-remark-images elements.
      "@media only screen and (max-width:769px)": {
        div: {

        }

      },
    }
  }
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
