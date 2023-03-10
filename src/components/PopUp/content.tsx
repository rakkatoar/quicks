interface IPopUp {
    activePopUp: string,
    setActivePopUp : (active: string) => void,
}
export const MenuButton = (props: IPopUp) => {
  const { activePopUp } = props;
  return (
    <>
			<div className={`${activePopUp !== '' ? 'max-w-[400px] max-h-[400px] p-4 border-2' : 'max-w-0 max-h-0'} bg-white w-full fixed bottom-20 border-[#BDBDBD] rounded-sm h-full right-8`}>
				{activePopUp}
			</div>
    </>
  )
}

export default MenuButton;