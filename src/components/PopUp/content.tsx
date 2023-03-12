import Task from '@/components/Task/Content'
import Inbox from '@/components/Inbox/Content'
interface IPopUp {
    activePopUp: string,
    setActivePopUp : (active: string) => void,
    changeActiveMenu : (active: number) => void,
}
export const MenuButton = (props: IPopUp) => {
  const { activePopUp, changeActiveMenu } = props;
  return (
    <>
			<div className={`${activePopUp !== '' ? 'border-2 opacity-100 md:max-w-[600px] w-full h-[500px]' : 'max-w-0 max-h-0 opacity-0'} bg-white w-auto fixed bottom-16 border-[#BDBDBD] rounded-sm right-0 md:right-8 duration-500`}>
        {activePopUp === 'Task' ? 
          <Task /> :
          activePopUp === 'Inbox' ? 
          <Inbox changeActiveMenu={changeActiveMenu} /> :
          <></>
        }
			</div>
    </>
  )
}

export default MenuButton;