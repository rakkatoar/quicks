
import Image from 'next/image';
import React, { useState } from 'react';
import MenuButton from '@/components/FAB/menu'
interface IButton {
	setActivePopUp : (active: string) => void,
}
export const Button = (props: IButton) => {
	const { setActivePopUp } = props;
  const [menus, setMenus] = useState([
		{
			title:"Inbox",
			active_icon:"/assets/icons/inbox-active.svg",
			inactive_icon:"/assets/icons/inbox.svg",
			active: false
		},
		{
			title:"Task",
			active_icon:"/assets/icons/tasks-active.svg",
			inactive_icon:"/assets/icons/tasks.svg",
			active: false
		},
		// {
		// 	title:"Task 2",
		// 	active_icon:"/assets/icons/tasks-active.svg",
		// 	inactive_icon:"/assets/icons/tasks.svg",
		// 	active: false
		// },
		// {
		// 	title:"Inbox 2",
		// 	active_icon:"/assets/icons/inbox-active.svg",
		// 	inactive_icon:"/assets/icons/inbox.svg",
		// 	active: false
		// }
	]);
  const [showMenu, setShowMenu] = useState(false);
	const [isPopUpActive, setIsPopUpActive] = useState(false);
	const changeActiveMenu = (selectedIndex:number) => {
		let localMenus = [...menus];
		if (selectedIndex === -1){
			setIsPopUpActive(false)
			setActivePopUp('')
			setShowMenu(false)
			localMenus.forEach(menu => {
				menu.active = false;
			})
		} else {
			localMenus.forEach((menu, index) => {
				if(index === selectedIndex){
					setActivePopUp(menu.title)
					setIsPopUpActive(true)
					menu.active = true;
				} else {
					menu.active = false;
				}
			})
			const [from, take] = [selectedIndex, 1];
			localMenus = [...localMenus.splice(from, take), ...localMenus];
		}
		
		setMenus(localMenus)
	};

  return (
    <>
			<button className={`z-10 fixed bottom-3 right-3 ${isPopUpActive ? 'hidden' : 'block'}`} onClick={() => {setShowMenu(!showMenu)}}>
				<Image src={'/assets/icons/floating-btn.svg'} alt="FAB" width={40} height={40} />
			</button>
			<MenuButton menus={menus} isPopUpActive={isPopUpActive} changeActiveMenu={changeActiveMenu} showMenu={showMenu}/>
    </>
  )
}

export default Button;