'use client'

import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'
import Scroll from './Scroll'

export default function LayoutClient({ children, googleClientId, navDataComponent, footer }) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Scroll />
      <NextTopLoader
        color="#F62B00"
        initialPosition={0.08}
        crawlSpeed={100}
        height={2}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={100}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={1600}
        showAtBottom={false}
      />
      <div className="overflow-x-hidden">
        {navDataComponent}
        {children}
        {footer}
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />
    </GoogleOAuthProvider>
  )
}
