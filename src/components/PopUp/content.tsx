import Image from 'next/image';
import { useState, useEffect } from 'react';
export const MenuButton = ({activePopUp, setActivePopUp}) => {
  return (
    <>
			<div className="bg-white p-4 max-w-[400px] w-full fixed bottom-10 border-2 border-[#BDBDBD] rounded- max-h-[400px] h-full right-8">
				{activePopUp}
			</div>
    </>
  )
}

export default MenuButton;