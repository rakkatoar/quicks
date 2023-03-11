import Image from 'next/image';
interface IMenu {
	title: string,
	active: boolean,
	color: string,
 	active_icon: string,
	inactive_icon: string
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
			<div key={menu.title} className='z-20'>
				<button className={`w-[40px] h-[40px] bottom-3 rounded-full duration-500 ${menu.active ? 'absolute bg-[#4F4F4F] right-[22px] ' : 'right-3'}`} onClick={() => changeActiveMenu(-1)} ></button>
				<button key={menu.title} className={`right-3 fixed bottom-3 duration-500`} style={{ marginRight : showMenu && !isPopUpActive ? (index+1)*50+'px' : showMenu && isPopUpActive ? (index)*60+'px' : '0'}} onClick={() => changeActiveMenu(index)}>
					<p className={`${showMenu && !isPopUpActive ? 'opacity-100 -top-6' : 'opacity-0 top-0'} w-full mx-auto absolute text-sm text-[#F2F2F2] font-semibold mb-1 delay-100 duration-100`}>{menu.title}</p>
					<div className={`w-[40px] h-[40px] rounded-full`} style={{backgroundColor : menu.active ? menu.color : '#F2F2F2'}}>
					{menu.inactive_icon !== '' &&
						<Image className='m-auto h-full' src={menu.active ? menu.active_icon : menu.inactive_icon} alt="FAB" width={20} height={20} />
					}
					</div>
				</button>
			</div>
			)}
    </>
  )
}

export default MenuButton;