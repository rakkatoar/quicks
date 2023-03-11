import { BiSearchAlt2 } from 'react-icons/bi'
import { BsPerson, BsDot } from 'react-icons/bs'
import React, { useState, useEffect } from 'react';
import Card from './Card';
export const Content = () => {
	const [localKeyword, setLocalKeyword] = useState<string>('')
	const data = [
		{
			title:"109220-Naturalization",
			unread: true,
			date: "January 1,2021 19:10",
			latest_person:"Cameron Phillips",
			latest_message:"Please check this out!",
			isGroup: true
		},
		{
			title:"Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
			unread: false,
			date: "02/06/2021 10:45",
			latest_person:"Ellen",
			latest_message:"Hey, please read.",
			isGroup: true
		},
		{
			title:"8405-Diana SALAZAR MUNGUIA",
			unread: false,
			date: "01/06/2021 12:19",
			latest_person:"Cameron Phillips",
			latest_message:"I understand your initial concerns and thats very valid, Elizabeth. But you ...",
			isGroup: true
		},
		{
			title:"FastVisa Support",
			unread: false,
			date: "01/06/2021 12:19",
			latest_person:"FastVisa Support",
			latest_message:"Hey there! Welcome to your inbox.",
			isGroup: false
		},
	]
	const [messages, setMessages] = useState(data);

	useEffect(() => {
    if (localKeyword) {
      const delayDebounceFn = setTimeout(() => {
        searchData(localKeyword)
      }, 800)
      return () => clearTimeout(delayDebounceFn)
    } else {
			setMessages(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localKeyword])

	const searchData = (keyword:string) => {
		const filtered = data.filter(element => element.title.toLowerCase().includes(keyword.toLocaleLowerCase()) || element.latest_person.toLowerCase().includes(keyword.toLocaleLowerCase()) || element.latest_message.toLowerCase().includes(keyword.toLocaleLowerCase()))
		setMessages(filtered);
	}
  return (
    <>
			<div className='relative'>
				<input className="placeholder:text-black border px-8 rounded-md border-[#828282] w-full" placeholder={"Search"} onChange={e => setLocalKeyword(e.target.value)} />
				<BiSearchAlt2 className='absolute top-[6px] right-8 text-sm'/>
				{messages.map(message => 
					<div key={message.title}>
						<Card message={message} />
					</div>
				)}
			</div>
    </>
  )
}

export default Content;