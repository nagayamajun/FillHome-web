import { Loading } from '@/components/Loading'
import { ToastModal } from '@/components/ToastModal'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <RecoilRoot>
      <ToastModal />
      <Loading />
      {
        getLayout(
          <Component {...pageProps} />
        )
      }
    </RecoilRoot>
  )
}
