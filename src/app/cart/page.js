'use server'
import { cookies } from 'next/headers'

import NetworkFetch from './components/NetworkFetch'

const page =async () => {
  const CorrCookie=[]
  let cookieStore = cookies()
  cookieStore=cookieStore.getAll()
  cookieStore.forEach(element => {
    if (element.name.includes('westside')) {
      CorrCookie.push(element)
    }
  });

  return (
   <>
   <NetworkFetch cookies={CorrCookie}></NetworkFetch>
   </>
    )
}
  
  export default page