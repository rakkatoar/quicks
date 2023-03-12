import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { VscLoading } from 'react-icons/vsc'
import moment from 'moment';
import Image from 'next/image';
interface IReplyChat {
	sender: string,
	text: string
}
const initialStateReply: IReplyChat = {
	sender: "",
	text: ""
};
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
	deleteMessage: (selectedCard: ICard, index:number) => void,
	setEditing: (index: number) => void,
	setReplying: (index: number) => void,
	setMessages: (active: ICard[]) => void,
}
export const Detail = (props: IMessage) => {
	const {message, messages, setMessages, setSelectedMessage, changeActiveMenu, submitNewChat, setEditing, deleteMessage, setReplying } = props;
	const [chats, setChats] = useState<IChat[]>([])
	const [newChat, setNewChat] = useState<string>('')
	const [replyChat, setReplyChat] = useState<IReplyChat>(initialStateReply)
	const [waitingConnection, setWaitingConnection] = useState<boolean>(true)
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<number>(0)

	const closeInbox = () => {
		let localMessages: ICard[] = [...messages];
		const selected = localMessages.findIndex(element => element.id === message.id);
		if(selected >= 0){
			localMessages[selected].unread = false;
			setMessages(localMessages);
		}
		setSelectedMessage(initialState)
	}
	const showActionButton = (index:number) => {
		let localChats = [...chats];
		localChats.forEach((element, i) => {
			if(i === index){
				element.show_action_button = !element.show_action_button;
			} else {
				element.show_action_button = false;
			}
		})

		setChats(localChats)
	}

	const formatDate = (time:string) => {
		const dateTime = moment(time);
		return dateTime.format('HH:MM')
	}

	const shareMessage = (index:number) => {
		let localChats = [...chats];
		navigator.clipboard.writeText(localChats[index].text)
		localChats[index].show_action_button = !localChats[index].show_action_button;
		setChats(localChats)
	}
	const replyMessage = (index:number) => {
		let localChats = [...chats];
		localChats[index].show_action_button = !localChats[index].show_action_button;
		const obj = {
			sender: localChats[index].sender,
			text: localChats[index].text
		}
		setReplying(localChats[index].id)
		setReplyChat(obj)
		setChats(localChats)
	}
	const editMessage = (index:number) => {
		let localChats = [...chats];
		localChats[index].show_action_button = !localChats[index].show_action_button;
		setNewChat(localChats[index].text)
		setEditing(localChats[index].id)
	}

	useEffect(() => {
		if(waitingConnection){
			setTimeout(() => {
				setWaitingConnection(false)
			}, 4000);
		}
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
						sender_color: "",
						show_action_button: false,
						reply_message: ""
					}
					arr.push(obj)
				}
				if(message.unread && index === (message.chats.length-1) && element.sender !== 'You'){
					split = date.format('[New Message]')
					const obj = {
						id: -2,
						sender: split,
						text: "",
						time: element.time,
						bubble_color: "",
						sender_color: "",
						show_action_button: false,
						reply_message: ""
					}
					arr.push(obj)
				}
				arr.push(element)
			} else {
				const date = moment(element.time);
				let split = date.format('MMMM DD[,] YYYY')
				const obj = {
					id: -1,
					sender: split,
					text: "",
					time: element.time,
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				}
				arr.push(obj)
				if(message.unread && index === (message.chats.length-1) && element.sender !== 'You'){
					split = date.format('[New Message]')
					const obj = {
						id: -2,
						sender: split,
						text: "",
						time: element.time,
						bubble_color: "",
						sender_color: "",
						show_action_button: false,
						reply_message: ""
					}
					arr.push(obj)
				}
				arr.push(element)
			}
		})
		setChats(arr)
  }, [messages])


  return (
    <>
			<div className='h-full'>
				<div className='flex justify-between sticky z-10 top-0 p-4 bg-white border-b-2'>
					<div className='flex gap-2'>
						<button>
							<IoMdArrowRoundBack className='text-2xl' onClick={() => closeInbox()}/>
						</button>
						<div>
							<p className='text-[#2F80ED] font-semibold text-sm md:text-base'>{message.title}</p>
							{message.isGroup &&
								<p>{message.participants+' participants'}</p>
							}
						</div>
					</div>
					<button onClick={() => changeActiveMenu(-1)}>
						<IoCloseSharp className='text-2xl'/>
					</button>
				</div>
				<div className='pb-4 px-4 overflow-y-auto w-screen overflow-x-hidden h-[70%] md:w-[596px] md:h-[400px]'>
					{chats.map((chat, index) =>
 						<div key={chat.text+index} className={`w-full flex flex-col ${chat.sender === 'You' ? 'items-end' : ''} ${chat.id < 0 ? '' : 'my-2'}`}>
							<p className={` text-sm font-semibold ${chat.id === -1 ? 'text-center before:mr-5 after:ml-5 divider font-bold before:bg-black after:bg-black' : ''} ${chat.id === -2 ? 'text-center before:mr-5 after:ml-5 divider font-bold text-[#EB5757] before:bg-[#EB5757] after:bg-[#EB5757]' : ''}`} style={{color: chat.sender_color}}>{chat.sender}</p>
							{chat.reply_message !== '' &&
								<div className={`max-w-[70%] w-fit p-2 rounded-md border-2 bg-[#F2F2F2] min-w-[100px] my-2`}>
									<p className='text-sm'>{chat.reply_message}</p>
								</div>
							}
							{chat.id >= 0 &&
								<div className={`flex items-start gap-2 ${chat.sender === 'You' ? 'justify-end' : ''}`}>
									<div className={`max-w-[70%] w-fit p-2 rounded-md  min-w-[100px]  ${chat.sender === 'You' ? 'order-2' : ''}`} style={{backgroundColor : chat.bubble_color}}>
										<p className='text-sm'>{chat.text}</p>
										<p className='text-xs'>{formatDate(chat.time)}</p>
									</div>
									<div className='relative'>
										<button className={`${chat.sender === 'You' ? 'order-1' : ''}`}>
											<BsThreeDots onClick={() => showActionButton(index)} />
										</button>
										<div className={`absolute z-10 top-6 left-0 bg-white rounded-lg min-w-[120px] duration-300 ${chat.sender === 'You' && chat.show_action_button ? 'visible opacity-100' : 'collapse opacity-0'}`}>
											<div className='rounded-t-lg border-2 border-b-0 py-2 px-4 cursor-pointer hover:bg-slate-200' onClick={() => editMessage(index)}>
												<p className='text-[#2F80ED]'>Edit</p>
											</div>
											<div className='rounded-b-lg border-2 py-2 px-4 cursor-pointer hover:bg-slate-200' onClick={() => setShowDeleteConfirmation(chat.id)}>
												<p className='text-[#EB5757]'>Delete</p>
											</div>
										</div>
										<div className={`absolute z-10 top-6 right-0 bg-white rounded-lg min-w-[120px] duration-300 ${chat.sender !== 'You' && chat.show_action_button ? 'visible opacity-100' : 'collapse opacity-0'}`}>
											<div className='rounded-t-lg border-2 border-b-0 py-2 px-4 cursor-pointer hover:bg-slate-200' onClick={() => shareMessage(index)}>
												<p className='text-[#2F80ED]'>Share</p>
											</div>
											<div className='rounded-b-lg border-2 py-2 px-4 cursor-pointer hover:bg-slate-200' onClick={() => replyMessage(index)}>
												<p className='text-[#2F80ED]'>Reply</p>
											</div>
										</div>
									</div>
								</div>
							}
						</div>
					)}
				</div>
				<div className='w-full absolute bottom-0 px-4 pb-4'>
					{waitingConnection && !message.isGroup &&
						<div className='bg-[#E9F3FF] p-4 rounded-lg flex gap-2 mb-3 items-center'>
							<Image className="animate-spin" alt="Loading" src={'/assets/icons/loading-icon.svg'} width={30} height={30} />
							<p className='font-semibold text-sm'>Please wait while we connect you with one of our team ...</p>
						</div>
					}
					<div className='flex gap-2 items-end'>
						<div className='w-full'>
							{replyChat.text !== "" &&
								<div className='bg-[#F2F2F2] p-2 rounded-t-md border-2 flex gap-2 justify-between items-start h-[20vh] md:h-full'>
									<div className='h-full'>
										<p className='font-semibold text-sm'>Replying to {replyChat.sender}</p>
										<div className='text-sm overflow-y-auto h-[70%] md:h-full w-full'>{replyChat.text}</div>
									</div>
									<button onClick={() => setReplyChat(initialStateReply)}>
										<IoCloseSharp className='text-lg'/>
									</button>
								</div>
							}
							<input className={`placeholder:text-black h-10 border px-2 border-[#828282] w-full ${replyChat.text !== '' ? 'rounded-b-md' : 'rounded-md'}`} value={newChat || ''} placeholder={"Type a new message"} onChange={e => setNewChat(e.target.value)} />
						</div>
						<button className='bg-[#2F80ED] h-10 px-4 py-2 rounded-lg text-white' disabled={waitingConnection} onClick={() => {submitNewChat(newChat, message); setNewChat(''); setReplyChat(initialStateReply)}}>Send</button>
					</div>
				</div>
				{showDeleteConfirmation > 0 &&
					<div className='absolute flex w-full h-full items-center justify-center top-0 bg-base-black-transparent z-10'>
						<div className='p-4 bg-white'>
							<p>Delete this chat?</p>
							<div className='flex justify-between'>
								<button className='bg-[#2F80ED] h-10 px-4 py-2 rounded-lg text-white' onClick={() => setShowDeleteConfirmation(0)}>No</button>
								<button className='bg-[#2F80ED] h-10 px-4 py-2 rounded-lg text-white' onClick={() => {deleteMessage(message, showDeleteConfirmation); setShowDeleteConfirmation(0)}}>Yes</button>
							</div>
						</div>
					</div>
				}
			</div>
    </>
  )
}

export default Detail;