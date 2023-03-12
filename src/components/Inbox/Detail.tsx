import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import moment from 'moment';
interface IChat {
	id: number,
	sender: string,
	text: string,
	time: string,
	bubble_color: string,
	sender_color: string
}
interface ICard {
	id: number,
	title: string,
	unread: boolean,
	isGroup: boolean,
	participants: number,
	chats: IChat[]
}
const initialState: ICard = {
	id: 0,
	title: "",
	unread: false,
	isGroup: false,
	participants: 0,
	chats: []
};
interface IMessage {
	messages: ICard[],
	message: ICard,
	setSelectedMessage: (active: ICard) => void,
	changeActiveMenu: (active: number) => void,
	submitNewChat: (newChat: string, selectedCard: ICard) => void,
}
export const Detail = (props: IMessage) => {
	const {message, messages, setSelectedMessage, changeActiveMenu, submitNewChat } = props;
	const [chats, setChats] = useState<IChat[]>([])
	const [newChat, setNewChat] = useState<string>('')

	const formatDate = (time:string) => {
		const dateTime = moment(time);
		return dateTime.format('HH:MM')
	}

	useEffect(() => {
		let arr:IChat[] = []
		message.chats.forEach((element, index) => {
			if(index > 0){
				const date = moment(element.time);
				let split = date.format('MMMM DD[,] YYYY')
				const prevDate = moment(message.chats[index-1].time);
				const prevSplit = prevDate.format('MMMM DD[,] YYYY')
				if(split !== prevSplit){
					const todayDate = moment();
					const today = todayDate.format('MMMM DD[,] YYYY')
					if(today === split){
						split = date.format('[Today ]MMMM DD[,] YYYY')
					}
					const obj = {
						id: -1,
						sender: split,
						text: "",
						time: element.time,
						bubble_color: "",
						sender_color: ""
					}
					arr.push(obj)
				}
				if(index === (message.chats.length-1) && element.sender !== 'You'){
					split = date.format('[New Message]')
					const obj = {
						id: -2,
						sender: split,
						text: "",
						time: element.time,
						bubble_color: "",
						sender_color: ""
					}
					arr.push(obj)
				}
				arr.push(element)
			} else {
				arr.push(element)
			}
		})
		setChats(arr)
  }, [messages])


  return (
    <>
			<div>
				<div className='flex justify-between sticky -top-4 py-4 bg-white border-b-2'>
					<div className='flex gap-2'>
						<button>
							<IoMdArrowRoundBack className='text-2xl' onClick={() => setSelectedMessage(initialState)}/>
						</button>
						<div>
							<p className='text-[#2F80ED] font-semibold text-sm md:text-base'>{message.title}</p>
							{message.isGroup &&
								<p>{message.participants+' participants'}</p>
							}
						</div>
					</div>
					<button>
						<IoCloseSharp className='text-2xl' onClick={() => changeActiveMenu(-1)}/>
					</button>
				</div>
				<div>
					{chats.map((chat, index) =>
 						<div key={chat.text+index} className={`w-full flex flex-col my-4 ${chat.sender === 'You' ? 'items-end' : ''}`}>
							<p className={`font-semibold ${chat.id < 0 ? 'text-center before:mr-5 after:ml-5 divider font-bold before:bg-black after:bg-black my-8' : ''} ${chat.id === -2 ? 'text-[#EB5757] before:bg-[#EB5757] after:bg-[#EB5757]' : ''}`} style={{color: chat.sender_color}}>{chat.sender}</p>
							{chat.id >= 0 &&
								<div className={`flex items-start gap-2 ${chat.sender === 'You' ? 'justify-end' : ''}`}>
									<div className={`max-w-[70%] w-fit p-4 rounded-md ${chat.sender === 'You' ? 'order-2' : ''}`} style={{backgroundColor : chat.bubble_color}}>
										<p>{chat.text}</p>
										<p>{formatDate(chat.time)}</p>
									</div>
									<button className={`${chat.sender === 'You' ? 'order-1' : ''}`}>
										<BsThreeDots />
									</button>
								</div>
							}
						</div>
					)}
				</div>
			</div>
				<div className='flex w-full gap-2 sticky bottom-0'>
					<input className="placeholder:text-black border px-4 rounded-md border-[#828282] w-full" value={newChat || ''} placeholder={"Type a new message"} onChange={e => setNewChat(e.target.value)} />
					<button className='bg-[#2F80ED] px-4 py-2 rounded-lg text-white' onClick={() => {submitNewChat(newChat, message); setNewChat('')}}>Send</button>
				</div>
    </>
  )
}

export default Detail;