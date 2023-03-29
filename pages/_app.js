import '@/styles/globals.css'
import Script from 'next/script'


export default function App({ Component, pageProps }) {
  return(
    <>
        <Script
          src="https://apis.google.com/js/api.js"
          strategy="afterInteractive"
        />
      <Component {...pageProps} />
  </>
  )
}

