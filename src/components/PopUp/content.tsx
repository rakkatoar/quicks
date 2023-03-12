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
			<div className={`${activePopUp !== '' ? 'md:max-w-[600px] md:max-h-[500px] overflow-y-auto max-w-[76vw] max-h-[70vh] p-4 border-2 opacity-100' : 'max-w-0 max-h-0 opacity-0'} bg-white w-full fixed bottom-16 border-[#BDBDBD] rounded-sm h-full right-8 duration-500`}>
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