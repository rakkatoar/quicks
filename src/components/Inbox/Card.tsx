import { BsPerson, BsDot } from 'react-icons/bs'
interface ICard {
	title: string,
	unread: boolean,
	date: string,
	latest_person: string,
	latest_message: string,
	isGroup: boolean,
}
interface IMessage {
	message: ICard
}
export const Card = (props: IMessage) => {
	const { message } = props;
  return (
    <>
			<div className='flex md:gap-4 border-b py-4 md:pr-4 relative flex-col md:flex-row'>
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
						<p className='md:gap-4 inline-flex flex-col md:flex-row'><span className='text-[#2F80ED] font-semibold text-sm md:text-base !leading-5'>{message.title}</span> <span className='whitespace-nowrap text-xs'>{message.date}</span></p>
						{message.isGroup &&
							<p className='text-xs font-semibold'>{message.latest_person}</p>
						}
						<p className='text-sm truncate text-[#4F4F4F] max-w-full md:max-w-[80%]'>{message.latest_message}</p>
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