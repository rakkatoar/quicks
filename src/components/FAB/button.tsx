
import Image from 'next/image';
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import MenuButton from '@/components/FAB/menu'
interface IButton {
	setActivePopUp : (active: string) => void,
}
interface RefObject {
  changeActiveMenu: (active: number) => void
}
export const Button = forwardRef((props: IButton, ref: Ref<RefObject>) => {
	const { setActivePopUp } = props;
	useImperativeHandle(ref, () => ({ changeActiveMenu }));
  const [menus, setMenus] = useState([
		{
			title:"Inbox",
			active: false,
			color: "#8785FF",
			active_icon:"/assets/icons/inbox-active.svg",
			inactive_icon:"/assets/icons/inbox.svg",
		},
		{
			title:"Task",
			color: "#F8B76B",
			active: false,
			active_icon:"/assets/icons/tasks-active.svg",
			inactive_icon:"/assets/icons/tasks.svg",
		},
		// {
		// 	title:"PopUp",
		// 	color: "#6FCF97",
		// 	active_icon:"",
		// 	inactive_icon:"",
		// 	active: false
		// },
		// {
		// 	title:"PopUp 2",
		// 	color: "#56CCF2",
		// 	active_icon:"",
		// 	inactive_icon:"",
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
			<button className={`z-10 bottom-3 bg-[#2F80ED] w-10 h-10 rounded-full duration-500 fixed ${isPopUpActive ? 'opacity-0 right-4' : ' opacity-100 right-3'}`} onClick={() => {setShowMenu(!showMenu)}}>
				<Image className='mx-auto' src={'/assets/icons/floating-btn.svg'} alt="FAB" width={34} height={34} />
			</button>
			<MenuButton menus={menus} isPopUpActive={isPopUpActive} changeActiveMenu={changeActiveMenu} showMenu={showMenu}/>
    </>
  )
})

export default Button;