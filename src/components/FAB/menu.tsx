import Image from 'next/image';
import { useState, useEffect } from 'react';
export const MenuButton = ({menu, changeActiveMenu, showMenu, index}) => {

  return (
    <>
			<button className={`right-3 fixed bottom-3 duration-500`} style={{ marginRight : showMenu ? (index+1)*50+'px' : '0'}} onClick={() => changeActiveMenu(index)}>
				<p className={`${showMenu ? 'opacity-100 -top-6' : 'opacity-0 top-0'} w-full mx-auto absolute text-sm text-[#F2F2F2] font-semibold mb-1 delay-100 duration-100`}>{menu.title}</p>
				<Image src={menu.active ? menu.active_icon : menu.inactive_icon} alt={menu.title+'-btn'} width={40} height={40} />
			</button>
    </>
  )
}

export default MenuButton;