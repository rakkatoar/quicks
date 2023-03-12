import Button from '@/components/FAB/button'
import PopUp from '@/components/PopUp/content'
import Head from 'next/head'
import { useState, useRef } from 'react';
interface RefObject {
  changeActiveMenu: (active: number) => void
}
export default function Home() {
  const [activePopUp, setActivePopUp] = useState<string>('');
  const buttonRef = useRef<RefObject>(null);
  const changeActiveMenu = (selectedIndex:number) => {
    if (buttonRef.current) {
      buttonRef.current.changeActiveMenu(selectedIndex);
    }
  }
  return (
    <>
      <Head>
        <title>Quicks</title>
        <meta name="description" content="Quicks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-[#262626] h-screen'>
        <PopUp activePopUp={activePopUp} setActivePopUp={setActivePopUp} changeActiveMenu={changeActiveMenu} />
        <Button ref={buttonRef} setActivePopUp={setActivePopUp} />
      </main>
    </>
  )
}
