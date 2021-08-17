import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

/**
 * 
 * @param AppProps 
 * @returns {JSX.Element}
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
export default MyApp
