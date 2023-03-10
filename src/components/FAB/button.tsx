
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MenuButton from '@/components/FAB/menu'
export const Button = ({setActivePopUp}) => {
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
  const [chat, setChat] = useState<string>();
  const [showMenu, setShowMenu] = useState(false);
	const changeActiveMenu = (selectedIndex:number) => {
		let localMenus = [...menus];
		localMenus.forEach((menu, index) => {
			if(index === selectedIndex){
				setActivePopUp(menu.title)
				menu.active = true;
			} else {
				menu.active = false;
			}
		})

		setMenus(localMenus)
	};
  useEffect(() => {
  }, [])

  return (
    <>
			<button className='z-10 fixed bottom-3 right-3' onClick={() => {setShowMenu(!showMenu)}}>
				<Image src={'/assets/icons/floating-btn.svg'} alt="FAB" width={40} height={40} />
			</button>
			{menus.map((menu, index) =>
				<MenuButton key={menu.title} index={index} menu={menu} changeActiveMenu={changeActiveMenu} showMenu={showMenu}/>
			)}
    </>
  )
}

export default Button;