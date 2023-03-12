import { BiSearchAlt2 } from 'react-icons/bi'
import { VscSearchStop } from 'react-icons/vsc'
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Detail from './Detail';
import Image from 'next/image';

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
interface IPopUp {
	changeActiveMenu: (active: number) => void,
}
export const Content = (props: IPopUp) => {
	const { changeActiveMenu } = props;
	const [selectedMessage, setSelectedMessage] = useState<ICard>()
	const [editing, setEditing] = useState<number>(0)
	const [replying, setReplying] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [localKeyword, setLocalKeyword] = useState<string>('')
	const data = [
		{
			id:1,
			title:"109220-Naturalization",
			unread: true,
			isGroup: true,
			participants: 3,
			chats:[
				{
					id:1,
					sender:"Cameron Phillips",
					text:"Please check this out!",
					time:"2021-01-01T12:10:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				}
			]
		},
		{
			id:2,
			title:"Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
			unread: false,
			isGroup: true,
			participants: 3,
			chats:[
				{
					id:1,
					sender:"Ellen",
					text:"Hey, please read.",
					time:"2021-06-02T10:45:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				}
			]
		},
		{
			id:3,
			title:"8405-Diana SALAZAR MUNGUIA",
			unread: false,
			isGroup: true,
			participants: 3,
			chats:[{
				id:1,
				sender:"Cameron Phillips",
				text:"I understand your initial concerns and thats very valid, Elizabeth. But you ...",
				time:"2021-06-01T12:19:00.000Z",
				bubble_color: "",
				sender_color: "",
				show_action_button: false,
				reply_message: ""
			}]
		},
		{
			id:4,
			title:"FastVisa Support",
			unread: false,
			isGroup: false,
			participants: 2,
			chats:[
			{
				id:1,
				sender:"FastVisa Support",
				text:"Hey there! Welcome to your inbox.",
				time:"2021-06-01T12:19:00.000Z",
				bubble_color: "",
				sender_color: "",
				show_action_button: false,
				reply_message: ""
			},
			{
				id:2,
				sender:"You",
				text:"Hi, I need help with something can you help me ?",
				time:"2021-06-01T12:19:00.000Z",
				bubble_color: "",
				sender_color: "",
				show_action_button: false,
				reply_message: ""
			}
		]
		},
		{
			id:5,
			title:"I-589 - AMARKHIL, Obaidullah [ Affirmative Filling with ZHN]",
			unread: true,
			isGroup: true,
			participants: 3,
			chats:[
				{
					id:1,
					sender:"Mary Hilda",
					text:"Just Fill me in for his updates yea?",
					time:"2021-06-08T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				},
				{
					id:2,
					sender:"You",
					text:"No worries. It will be completed ASAP. I’ve asked him yesterday.",
					time:"2021-06-08T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				},
				{
					id:3,
					sender:"Mary Hilda",
					text:"Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
					time:"2021-06-09T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				},
				{
					id:4,
					sender:"You",
					text:"Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
					time:"2021-06-09T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				},
				{
					id:5,
					sender:"Mary Hilda",
					text:"Sure thing, Claren",
					time:"2021-06-09T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				},
				{
					id:6,
					sender:"Obaidullah Amarkhil",
					text:"Morning. I’ll try to do them. Thanks",
					time:"2021-06-09T19:32:00.000Z",
					bubble_color: "",
					sender_color: "",
					show_action_button: false,
					reply_message: ""
				}
			]
		},
	]
	const [messages, setMessages] = useState<ICard[]>([]);

	useEffect(() => {
    if (localKeyword) {
			setIsLoading(true)
      const delayDebounceFn = setTimeout(() => {
        searchData(localKeyword)
      }, 2000)
      return () => clearTimeout(delayDebounceFn)
    } else {
			setTimeout(() => {
				setIsLoading(false)
				setMessages(data)
			}, 2000);
    }
  }, [localKeyword])

	useEffect(() => {
		if(selectedMessage){
			const updated = messages.filter(element => element.id === selectedMessage.id)
			setSelectedMessage(updated[0])
		}
  }, [messages])

	const searchData = (keyword:string) => {
		const filtered = messages.filter(element => {
			const latest_person = element.chats[element.chats.length - 1].sender;
			const latest_message = element.chats[element.chats.length - 1].text;
			return element.title.toLowerCase().includes(keyword.toLocaleLowerCase()) || latest_person.toLowerCase().includes(keyword.toLocaleLowerCase()) || latest_message.toLowerCase().includes(keyword.toLocaleLowerCase())})
			setMessages(filtered);
			setIsLoading(false)
	}
	const deleteMessage = (selectedCard:ICard, chatId:number) => {
		let localCards = [...messages]
		const cardIndex = localCards.findIndex(element => element.id === selectedCard.id);
		const chatIndex = localCards[cardIndex].chats.findIndex(element => element.id === chatId);
		localCards[cardIndex].chats.splice(chatIndex,1)
		setMessages(localCards)
	}
	const submitNewChat = (newChat:string, selectedCard:ICard) => {
		if(newChat.length > 0){
			let localCards = [...messages]
			const cardIndex = localCards.findIndex(element => element.id === selectedCard.id);
			if(editing > 0){
				const chatIndex = localCards[cardIndex].chats.findIndex(element => element.id === editing);
				localCards[cardIndex].chats[chatIndex].text = newChat;
				setEditing(0)
			} else if(replying > 0){
				const chatIndex = localCards[cardIndex].chats.findIndex(element => element.id === replying);
				setReplying(0)
				const latest_chat = localCards[cardIndex].chats[localCards[cardIndex].chats.length - 1];
				const today = new Date ()
				const todayDate = today.toISOString()
				const obj:IChat = {
					id: latest_chat.id + 1,
					sender: "You",
					text: newChat,
					time: todayDate,
					bubble_color: "#EEDCFF",
					sender_color: "#9B51E0",
					show_action_button: false,
					reply_message: localCards[cardIndex].chats[chatIndex].text
				}
				localCards[cardIndex].chats.push(obj)
			} else {
				const latest_chat = localCards[cardIndex].chats[localCards[cardIndex].chats.length - 1];
				const today = new Date ()
				const todayDate = today.toISOString()
				const obj:IChat = {
					id: latest_chat.id + 1,
					sender: "You",
					text: newChat,
					time: todayDate,
					bubble_color: "#EEDCFF",
					sender_color: "#9B51E0",
					show_action_button: false,
					reply_message: ""
				}
				localCards[cardIndex].chats.push(obj)
			}
			setMessages(localCards)
		}
	}
  return (
    <>
			{selectedMessage && selectedMessage.id !== 0 ? 
				<div className='relative h-full'>
					<Detail deleteMessage={deleteMessage} setMessages={setMessages} setReplying={setReplying} submitNewChat={submitNewChat} setEditing={setEditing} message={selectedMessage} messages={messages} setSelectedMessage={setSelectedMessage} changeActiveMenu={changeActiveMenu}/>
				</div> :
				<div className='relative p-4 md:max-w-[600px] md:max-h-[500px] h-full overflow-y-auto overflow-x-hidden max-w-[100vw]'>
					<div className='sticky top-0 bg-white z-10'>
						<input className="placeholder:text-black border px-8 rounded-md border-[#828282] w-full" placeholder={"Search"} onChange={e => setLocalKeyword(e.target.value)} />
						<BiSearchAlt2 className='absolute top-[6px] right-8 text-sm'/>
					</div>
					{!isLoading && messages.length > 0 ?
					messages.map((message) => 
						<div key={message.title}>
							<Card message={message} messages={messages} setSelectedMessage={setSelectedMessage} />
						</div>
					) :
					!isLoading && messages.length === 0 ?
						<div className='flex flex-col md:min-w-[570px] justify-center items-center h-[90%]'>
							<VscSearchStop className='text-4xl'/>
							<p className='text-sm font-semibold'>Not Found</p>
						</div>
						:
						<div className='flex flex-col md:min-w-[570px] justify-center items-center h-[90%]'>
							<Image className="animate-spin" alt="Loading" src={'/assets/icons/loading-inbox.svg'} width={50} height={50} />
							<p className='text-sm font-semibold'>Loading Chats ...</p>
						</div>
					}
				</div>
			}
    </>
  )
}

export default Content;