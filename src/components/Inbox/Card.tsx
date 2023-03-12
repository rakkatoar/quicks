import { BsPerson, BsDot } from 'react-icons/bs'
import moment from 'moment';
interface IChat {
	id: number,
	sender: string,
	text: string,
	time: string,
	bubble_color: string,
	sender_color: string,
	show_action_button: boolean,
	reply_message: string
}
interface ICard {
	id: number,
	title: string,
	unread: boolean,
	isGroup: boolean,
	participants: number,
	chats: IChat[]
}
interface IMessage {
	message: ICard,
	messages: ICard[],
	setSelectedMessage: (active: ICard) => void,
}
export const Card = (props: IMessage) => {
	const { message, setSelectedMessage } = props;
	const otherColor = [
		{
			bubble_color: "#FCEED3",
			sender_color: "#E5A443"
		},
		{
			bubble_color: "#D2F2EA",
			sender_color: "#43B78D"
		}
	]
	const formatDate = (card:ICard) => {
		const day = moment(card.chats[card.chats.length - 1].time);
		if(card.unread){
			return day.format('MMMM D[,]YYYY HH:MM')
		} else {
			return day.format('DD[/]MM[/]YYYY HH:MM')
		}
	}
	const selectCard = (message:ICard) => {
		let otherSender:string[] = [];
			message.chats.forEach(element => {
				if(element.id >= 0){
					if(element.sender === "You"){
						element.sender_color = "#9B51E0"
						element.bubble_color = "#EEDCFF"
					} else {
						if(message.isGroup){
							const doesExists = otherSender.findIndex(sender => sender === element.sender)
							if(doesExists < 0){
								otherSender.push(element.sender)
								element.sender_color = otherColor[otherSender.length - 1].sender_color
								element.bubble_color = otherColor[otherSender.length - 1].bubble_color
							} else {
								element.sender_color = otherColor[doesExists].sender_color
								element.bubble_color = otherColor[doesExists].bubble_color
							}
						} else {
							element.sender_color = "#2F80ED"
							element.bubble_color = "#F8F8F8"
						}
					}
				}
			})
			
			setSelectedMessage(message)
	}
  return (
    <>
 			<div className='flex md:gap-4 border-b py-4 md:pr-4 relative flex-col md:flex-row cursor-pointer' onClick={() => selectCard(message)}>
				<div className='relative w-[10%] h-8'>
					{message.isGroup ? 
						<div>
							<div className='w-8 h-8 bg-[#E0E0E0] rounded-full absolute'>
								<BsPerson className='m-auto h-full font-bold' />
							</div>
							<div className='w-8 h-8 bg-[#2F80ED] rounded-full absolute left-4'>
								<BsPerson className='m-auto h-full text-white font-bold' />
							</div>
						</div> :
						<div className='w-8 h-8 bg-[#2F80ED] rounded-full absolute left-2'>
							<p className='mx-auto text-center text-white'>{message.title[0]}</p>
						</div>
					}
				</div>
				<div className='w-full md:w-[90%] flex gap-4'>
					<div className='flex flex-col w-full'>
						<p className='md:gap-4 inline-flex flex-col md:flex-row'><span className='text-[#2F80ED] font-semibold text-sm md:text-base !leading-5'>{message.title}</span> <span className='whitespace-nowrap text-xs'>{formatDate(message)}</span></p>
						{message.isGroup &&
							<p className='text-xs font-semibold'>{message.chats[message.chats.length - 1].sender}</p>
						}
						<p className='text-sm truncate text-[#4F4F4F] max-w-full md:max-w-[80%]'>{message.chats[message.chats.length - 1].text}</p>
					</div>
				</div>
				{message.unread &&
					<BsDot className='text-[#EB5757] absolute bottom-2 right-0 text-4xl'/>
				}
			</div>
    </>
  )
}

export default Card;