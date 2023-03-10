import Image from 'next/image';
interface IMenu {
	title: string,
 	active_icon: string,
 	inactive_icon: string,
	active: boolean
}
interface IPopUp {
	menus: IMenu[],
	showMenu: boolean,
	isPopUpActive: boolean,
	changeActiveMenu: (active: number) => void,
}
export const MenuButton = (props: IPopUp) => {
	const { menus, showMenu, changeActiveMenu, isPopUpActive } = props;
  return (
    <>
			{menus.map((menu, index) =>
			<div key={menu.title}>
				<div className={`w-[40px] h-[36px] bottom-[16px] right-[20px] rounded-full  ${menu.active ? 'absolute bg-[#4F4F4F] ' : ''}`} onClick={() => changeActiveMenu(-1)} ></div>
				{isPopUpActive ? 'true' : 'false'}
				<button key={menu.title} className={`right-3 fixed bottom-3 duration-500`} style={{ marginRight : showMenu && !isPopUpActive ? (index+1)*50+'px' : showMenu && isPopUpActive ? (index)*60+'px' : '0'}} onClick={() => changeActiveMenu(index)}>
					<p className={`${showMenu ? 'opacity-100 -top-6' : 'opacity-0 top-0'} w-full mx-auto absolute text-sm text-[#F2F2F2] font-semibold mb-1 delay-100 duration-100`}>{menu.title}</p>
					<Image src={menu.active ? menu.active_icon : menu.inactive_icon} alt={menu.title+'-btn'} width={40} height={40} />
				</button>
			</div>
			)}
    </>
  )
}

export default MenuButton;