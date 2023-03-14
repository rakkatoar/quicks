import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import { VscSearchStop } from 'react-icons/vsc'
import { IoChevronDownOutline, IoBookmarksOutline } from 'react-icons/io5'
import { BsThreeDots } from 'react-icons/bs'
import { WiTime4 } from 'react-icons/wi'
import { FiCalendar } from 'react-icons/fi'
import { MdOutlineModeEdit } from 'react-icons/md'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
interface ILabel {
	id: number,
  title: string,
  color: string
}
interface ICategory {
	id: number,
  title: string,
}
interface ICard {
	id: number,
  category:number,
	isDone: boolean,
	title: string,
	date: string,
	isCardOpen: boolean,
	isLabelsOpen: boolean,
	isCalendarOpen: boolean,
	isDeleteOpen: boolean,
	isEditing: boolean,
	description: string,
	labels: ILabel[],
}
export const Content = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [tasks, setTasks] = useState<ICard[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<number>(0)
  const [labels, setlabels] = useState<ILabel[]>([
    {
      id:1,
      title: "Important ASAP",
      color: "#E5F1FF"
    },
    {
      id:2,
      title: "Offline Meeting",
      color: "#FDCFA4"
    },
    {
      id:3,
      title: "Virtual Meeting",
      color: "#F9E9C3"
    },
    {
      id:4,
      title: "ASAP",
      color: "#AFEBDB"
    },
    {
      id:5,
      title: "Client Related",
      color: "#CBF1C2"
    },
    {
      id:6,
      title: "Self Task",
      color: "#CFCEF9"
    },
    {
      id:7,
      title: "Appointments",
      color: "#F9E0FD"
    },
    {
      id:8,
      title: "Court Related",
      color: "#9DD0ED"
    },
  ]);
  const [categories, setCategories] = useState<ICategory[]>([
    {
      id:1,
      title: "My Tasks"
    },
    {
      id:2,
      title: "Personal Errands"
    },
    {
      id:3,
      title: "Urgent To-Do"
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0]);
  const [allTasks, setAllTasks] = useState<ICard[]>([
		{
			id:1,
      category:1,
      isDone: false,
			title:"Close off Case #012920- RODRIGUES, Amiguel",
			date: "2023-04-01T12:10:00.000Z",
			isCardOpen: true,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
			labels:[]
		},
		{
			id:2,
      category:1,
      isDone: false,
			title:"Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
			date: "2023-04-11T12:10:00.000Z",
			isCardOpen: true,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and tasks in channels and emails should be provided as well in.",
			labels:[]
		},
		{
			id:3,
      category:1,
      isDone: false,
			title:"Set up appointment with Dr Blake",
			date: "2023-03-30T12:10:00.000Z",
			isCardOpen: true,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "",
			labels:[]
		},
		{
			id:4,
      category:1,
      isDone: true,
			title:"Contact Mr Caleb - video conference?",
			date: "2021-01-01T12:10:00.000Z",
			isCardOpen: false,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "",
			labels:[]
		},
		{
			id:5,
      category:1,
      isDone: true,
			title:"Assign 3 homework to Client A",
			date: "2021-01-01T12:10:00.000Z",
			isCardOpen: false,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "",
			labels:[]
		},
		{
			id:6,
      category:2,
      isDone: true,
			title:"Assign 3 homework to Client B",
			date: "2021-01-01T12:10:00.000Z",
			isCardOpen: false,
      isDeleteOpen: false,
      isCalendarOpen: false,
      isEditing: false,
      isLabelsOpen: false,
      description: "",
			labels:[]
		},
	]);
  const createTask = () => {
    setIsCreating(true)
    if(!isCreating){
      let localTasks = [...tasks];
      const latest_task = allTasks[allTasks.length - 1];
      const today = new Date ();
      const obj:ICard = {
        id: latest_task.id + 1,
        category:selectedCategory.id,
        isDone: false,
        title: "",
        date: today.toISOString(),
        isCardOpen: true,
        isDeleteOpen: false,
        isCalendarOpen: false,
        isEditing: false,
        isLabelsOpen: false,
        description: "",
        labels: [],
      }
      localTasks.push(obj);
      setTasks(localTasks)
    }
  }
  const deleteTask = (id:number) => {
    let localTasks = [...tasks];
    const taskIndex = localTasks.findIndex(element => element.id === id)
    localTasks.splice(taskIndex,1)
    setTasks(localTasks)
    setShowDeleteConfirmation(0)
  }
  const countRemainingDays = (date:string) => {
    const today = new Date ()
    const todayDate = moment(today);
    const deadLineDate = moment(date);
    const diff = deadLineDate.diff(todayDate, 'days')
    return diff
  }
  const editDescription = (value:string, id:number) => {
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    localAllTasks[taskIndex].description = value
    setAllTasks(localAllTasks)
  }
  const openEditDescription = (id:number) => {
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    if(localAllTasks[taskIndex]){
      localAllTasks[taskIndex].isEditing = !localAllTasks[taskIndex].isEditing
      setAllTasks(localAllTasks)
    }
  }
  const openCalendar = (id:number) => {
    let localAllTasks = [...allTasks]
    localAllTasks.forEach(element => {
      if(element.id === id){
        element.isCalendarOpen = !element.isCalendarOpen
      } else {
        element.isCalendarOpen = false
      }
    })
    setAllTasks(localAllTasks)
  }
  const openLabels = (id:number) => {
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    if(localAllTasks[taskIndex]){
      localAllTasks[taskIndex].isLabelsOpen = !localAllTasks[taskIndex].isLabelsOpen;
      setAllTasks(localAllTasks)
    }
  }
  const openCard = (id:number) => {
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    localAllTasks[taskIndex].isCardOpen = !localAllTasks[taskIndex].isCardOpen
    setAllTasks(localAllTasks)
  }
  const inputDate = (value:Date, id:number) => {
    const date = value.toISOString();
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    localAllTasks[taskIndex].date = date;
    localAllTasks[taskIndex].isCalendarOpen = false;
    setAllTasks(localAllTasks)
  }
  const inputLabels = (idLabel:number, id:number) => {
    let localAllTasks = [...allTasks];
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    const exists = localAllTasks[taskIndex].labels.findIndex(element => element.id === idLabel)
    if(exists > -1){
      localAllTasks[taskIndex].labels.splice(exists, 1);
    } else {
      const label:ILabel = labels.find(element => element.id === idLabel)!
      localAllTasks[taskIndex].labels.push(label);
    }
    localAllTasks[taskIndex].isLabelsOpen = !localAllTasks[taskIndex].isLabelsOpen
    setAllTasks(localAllTasks)
  }
  const inputTitle = (value:string, id:number) => {
    let localTasks = [...tasks];
    const taskIndex = localTasks.findIndex(element => element.id === id)
    localTasks[taskIndex].title = value;
    setTasks(localTasks)
    let localAllTasks = [...allTasks];
    localAllTasks.push(localTasks[taskIndex])
    setIsCreating(false)
    setAllTasks(localAllTasks)
  }
  const openDelete = (id:number) => {
    let localAllTasks = [...allTasks]
    localAllTasks.forEach(element => {
      if(element.id === id){
        element.isDeleteOpen = !element.isDeleteOpen
      } else {
        element.isDeleteOpen = false
      }
    })
    setAllTasks(localAllTasks)
  }
  const changeStatus = (value:boolean, id:number) => {
    let localAllTasks = [...allTasks]
    const taskIndex = localAllTasks.findIndex(element => element.id === id)
    localAllTasks[taskIndex].isDone = value
    localAllTasks[taskIndex].isCardOpen = value ? false : true
    setAllTasks(localAllTasks)
  }
  const filterTask = (category:ICategory) => {
    setIsLoading(true)
    const filtered = allTasks.filter(element => element.category === category.id)
    setTimeout(() => {
      setIsLoading(false)
      setTasks(filtered)
    }, 2000);
    setIsCreating(false)
    setSelectedCategory(category);
    setShowFilter(false)
  }
  const formatCalendar = (date:string) => {
    return new Date(date)
  }
  const formatDate = (time:string) => {
		const dateTime = moment(time);
		return dateTime.format('DD[/]MM[/]YYYY')
	}
  useEffect(() => {
    filterTask(categories[0])
  }, [])
  return (
    <>
			<div className='relative md:max-w-[600px] md:max-h-[500px] h-full overflow-y-auto overflow-x-hidden max-w-[100vw]'>
        <div className='h-full p-4 pt-0'>
          <div className='sticky top-0 bg-white z-10 flex justify-between py-4 pl-20'>
            <div className='flex justify-between border-2 rounded-lg p-2 items-center gap-2 relative cursor-pointer' onClick={() => setShowFilter(!showFilter)}>
              <p className='font-semibold text-sm'>{selectedCategory.title}</p>
              <IoChevronDownOutline />
            </div>
            <div className={`absolute font-semibold text-sm z-10 top-14 left-0 bg-white rounded-lg min-w-[250px] duration-300 ${showFilter ? 'visible opacity-100' : 'collapse opacity-0'}`}>
              {categories.map((category) =>
                selectedCategory.title !== category.title &&
                  <div key={category.title} onClick={() => filterTask(category)} className={`border-2 py-2 px-4 cursor-pointer hover:bg-slate-200 first:border-b-2 first:rounded-t-lg last:border-t-0 last:rounded-b-lg`}>
                    <p>{category.title}</p>
                  </div>
              )}
            </div>
            <div>
            </div>
            <button className='bg-[#2F80ED] py-2 px-3 rounded-lg text-white' onClick={() => createTask()}>New Task</button>
          </div>
          {!isLoading && tasks.length > 0 ?
          tasks.map((task,index) => 
            <div key={task.title+index}>
              <div className='grid grid-cols-20 gap-1 w-full border-b-2 py-4 items-start'>
                <input className='w-full col-span-1 mt-1' type={'checkbox'} checked={task.isDone} onChange={(e) => changeStatus(e.target.checked, task.id)} />
                {isCreating && task.title.length === 0 ? 
                  <input className="col-span-11 text-sm font-semibold p-2" placeholder='Type Task Title' onBlur={(e) => inputTitle(e.target.value, task.id)}/>
                :
                  <p className={`col-span-11 text-sm font-semibold ${task.isDone ? 'text-[#828282] line-through' : ''}`}>{task.title}</p>
                }
                <p className='col-span-3 whitespace-nowrap text-sm text-[#EB5757]'>{!task.isDone && countRemainingDays(task.date) > 0 ? countRemainingDays(task.date)+' Days Left' : ''}</p>
                <p className='col-span-3 text-sm'>{formatDate(task.date)}</p>
                <IoChevronDownOutline className={`col-span-1 cursor-pointer ${task.isCardOpen ? 'rotate-180' : ''}`} onClick={() => openCard(task.id)}/>
                <div className='relative'>
                  <BsThreeDots className='col-span-1 cursor-pointer' onClick={() => openDelete(task.id)} />
                  <div className={`absolute z-10 top-6 right-0 bg-white rounded-lg min-w-[120px] duration-300 ${task.isDeleteOpen ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                    <div className='rounded-lg border-2 py-2 px-4 cursor-pointer hover:bg-slate-200' onClick={() => setShowDeleteConfirmation(task.id)}>
                      <p className='text-[#EB5757]'>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`px-8 py-4 ${task.isCardOpen ? 'max-h-none block' : 'max-h-0 hidden'}`}>
                <div className='grid grid-cols-10 items-center px-2'>
                  <WiTime4 size={20} className="col-span-1 text-[#2F80ED]" />
                  <div className='col-span-9'>
                    <div className="relative min-w-[150px] cursor-pointer p-2 rounded-lg border-2 w-fit">
                      <div className='flex justify-between items-center gap-2' onClick={() => openCalendar(task.id)}>
                        <p className='text-sm'>{isCreating && task.title === '' ? 'Set Date' : formatDate(task.date)}</p>
                        <FiCalendar size={16}/>
                      </div>
                      {task.isCalendarOpen &&
                        <div className='absolute top-12 left-3/4 z-10 text-sm max-w-[215px]'>
                          <Calendar
                            minDate={new Date()}
                            onClickDay={(e:Date) => inputDate(e, task.id)}
                            value={formatCalendar(task.date)}
                          />
                        </div>
                      }
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-10 mt-4 items-center px-2'>
                  <MdOutlineModeEdit size={20} className="col-span-1 text-[#2F80ED]" onClick={() => openEditDescription(task.id)}/>
                  <div className='col-span-9 text-sm'>
                    {!task.isEditing ? 
                      <div>
                        {task.description.length > 0 ?
                          <p>{task.description}</p> :
                          <p>No Description</p>
                        }
                      </div> :
                      <textarea className='border-2 rounded-lg p-2 w-full' onChange={(e) => editDescription(e.target.value, task.id)} value={task.description} />
                    }
                  </div>
                </div>
                <div className='relative grid grid-cols-10 items-center bg-[#F9F9F9] rounded-lg p-2 pb-4 mt-4'>
                  <IoBookmarksOutline size={20} className="col-span-1 text-[#2F80ED] cursor-pointer" onClick={() => openLabels(task.id)}/>
                  <div className='col-span-9 flex gap-2 overflow-x-auto'>
                    {task.labels.map((label,index) =>
                      <p key={label.title+index} className="p-2 rounded-lg text-xs font-semibold min-w-[110px] cursor-pointer" style={{backgroundColor: label.color}}>{label.title}</p>
                    )}
                  </div>
                  {task.isLabelsOpen &&
                    <div className='absolute top-14 z-10 text-sm bg-white p-4 rounded-lg border border-black flex gap-2 flex-col'>
                      {labels.map((label,index) =>
                        <p key={label.title+index} className="p-2 rounded-lg text-xs font-semibold min-w-[200px] cursor-pointer" style={{backgroundColor: label.color}} onClick={() => inputLabels(label.id, task.id)}>{label.title}</p>
                      )}
                    </div>
                  }
                </div>
              </div>
            </div>
          ) : !isLoading && tasks.length === 0 ?
            <div className='flex flex-col md:min-w-[570px] justify-center items-center h-[90%]'>
              <VscSearchStop className='text-4xl'/>
              <p className='text-sm font-semibold'>No Data</p>
            </div>
          :
            <div className='flex flex-col md:min-w-[570px] justify-center items-center h-[90%]'>
              <Image className="animate-spin" alt="Loading" src={'/assets/icons/loading-inbox.svg'} width={50} height={50} />
              <p className='text-sm font-semibold'>Loading Task List ...</p>
            </div>
          }
        </div>
          {showDeleteConfirmation > 0 &&
            <div className='sticky flex w-full h-full items-center justify-center top-0 bottom-0 bg-base-black-transparent z-10'>
              <div className='p-4 bg-white rounded-lg'>
                <p>Delete this chat?</p>
                <div className='flex justify-between mt-2'>
                  <button className='bg-[#2F80ED] leading-3 h-10 px-4 py-2 rounded-lg text-white' onClick={() => {setShowDeleteConfirmation(0); openDelete(showDeleteConfirmation)}}>No</button>
                  <button className='border-[#EB5757] border-2 leading-3 h-10 px-4 py-2 rounded-lg text-[#EB5757]' onClick={() => {deleteTask(showDeleteConfirmation)}}>Yes</button>
                </div>
              </div>
            </div>
          }
      </div>
    </>
  )
}

export default Content;