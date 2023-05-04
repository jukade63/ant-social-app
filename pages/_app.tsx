import Layout from '@/components/Layout'
import LoginModal from '@/components/modal/LoginModal'
import RegisterModal from '@/components/modal/RegisterModal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Titillium_Web } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import EditModal from '@/components/modal/EditModal'

const titilium = Titillium_Web({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${titilium.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <LoginModal />
        <RegisterModal />
        <EditModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>


  )
}
