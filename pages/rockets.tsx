import { Jura } from '@next/font/google'
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios';
import Select from 'react-select';

const jura = Jura({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-jura' })

export default function Rockets() {
    const [createModal, setCreateModal] = useState(false);
    const apiEndpoint = 'https://api.github.com';
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState();
    const [usersEx, setUsersEx] = useState();
    const [editing, setEditing] = useState(false);
    const [rocket, setRocket] = useState({ title: '', rocketName: '', description: '', user: {}});
    const [editingIndex, setEditingIndex] = useState(-1);

    const fetchUsers = async () => {
        try {
          const { data } = await axios.get(apiEndpoint + "/search/users?q=" + query, {
            params: {
              page: 1,
              per_page: 20,
            },
          });
          return data?.items;
        } catch (error) {
          console.error(error);
          return null;
        }
    };

    const [rockets, setRockets] = useLocalStorageState('rockets', {
        defaultValue: [
            {
            title : "My first Review!",
            rocketName : "Saturn",
            description : "This was my first review i loved the rocket!",
            user : {login: "JuanOtalora", score: 3, avatar_url: "https://avatars.githubusercontent.com/u/16787258?v=4", html_url: "https://github.com/JuanOtalora"}
            },
        ]
    })

    function handleChange(e: any) {
        setRocket(rocket => ({
            ...rocket,
            [e.target.name]: e.target.value
        }));
    }

    const handleCloseCreate = () => {
        setRocket({ title: '', rocketName: '', description: '', user : {}});
        setCreateModal(false);
        setUsersEx(undefined);
        setQuery("");
    }

    const handleSubmitCreate = () => {
        rocket["user"] = selectedUser || {};
        //@ts-ignore
        setRockets([...rockets, rocket]);
        setRocket({ title: '', rocketName: '', description: '', user: {}});
        setCreateModal(false);
        setUsersEx(undefined);
        setQuery("");
    }

    useEffect(() =>{
        const fetchUse = async () => {
            const items = await fetchUsers();
            setUsersEx(items);
        }
        if(query.length > 0) fetchUse();

    }, [query])

    const handleDelete = (index: number) => {
        const newRockets = rockets.filter((_, i) => i !== index); 
        setRockets(newRockets);
    
    };

    const setEditingRocket = (index: number) =>{
        setRocket(rockets[index]);
        setEditing(true);
        setEditingIndex(index)
    }

    const closeEditingRocket = ()=>{
        setEditing(false);
        setEditingIndex(-1);
        setRocket({ title: '', rocketName: '', description: '', user : {}});
        setQuery("");
        setUsersEx(undefined);
    }

    const handleEdit = () => {
        rocket["user"] = selectedUser || {};
        const newRocketsArray = [...rockets];
        //@ts-ignore
        newRocketsArray[editingIndex] = rocket;
        setRockets(newRocketsArray);
        setEditing(false);
        setEditingIndex(-1);
        setRocket({ title: '', rocketName: '', description: '', user : {}});
        setQuery("");
        setUsersEx(undefined);
      };

    return (
        <>
            <main>
                {createModal ? 
                <>
                <div className="absolute inset-0 bg-gray-900 opacity-90" />
                    <div className="flex justify-center items-center fade fixed top-50 left-50  w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="relative w-auto pointer-events-none w-2/5 h-3/5">
                            <div className="justify-around h-full border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-space-purp bg-clip-padding rounded-md outline-none text-current">
                                <div className="flex flex-shrink-0 items-center justify-center p-4 border-b border-r-white rounded-t-md">
                                    <h5 className={`${jura.variable} font-sans text-3xl font-bold leading-normal text-r-white`} id="exampleModalLabel">Rocket Review</h5>
                                </div>
                                <div className="flex flex-col relative p-4 space-y-5">
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Title: </label>
                                            <input name="title" type="title" className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></input>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Rocket Name: </label>
                                            <input name="rocketName" type="rocketName" className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></input>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Description: </label>
                                            <textarea name="description" value={rocket.description} className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></textarea>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>User: </label>
                                            <Select  className={`${jura.variable} font-sans w-1/2 text-space-purp`} getOptionLabel={(e:any) => e.login} getOptionValue={(e) => e.login} options={usersEx} onInputChange={(value) => setQuery(value)} onChange={(value) => setSelectedUser(value)}/>
                                            
                                    </div>
                                </div>
                                <div className="flex space-x-5 flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-r-white rounded-b-md">
                                    <button onClick={handleCloseCreate} type="button" className={`${jura.variable} font-sans px-6 py-2.5 bg-r-white text-space-purp font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-space-purp hover:text-r-white hover:shadow-lg focus:bg-space-purp focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150ease-in-out`}>Close</button>
                                    <button onClick={handleSubmitCreate} type="button" className={`${jura.variable} font-sans px-6 py-2.5 bg-r-white text-space-purp font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-space-purp hover:text-r-white hover:shadow-lg focus:bg-space-purp focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150ease-in-out`}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <></>}
                {editing ? 
                <>
                <div className="absolute inset-0 bg-gray-900 opacity-90" />
                    <div className="flex justify-center items-center fade fixed top-50 left-50  w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="relative w-auto pointer-events-none w-2/5 h-3/5">
                            <div className="justify-around h-full border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-space-purp bg-clip-padding rounded-md outline-none text-current">
                                <div className="flex flex-shrink-0 items-center justify-center p-4 border-b border-r-white rounded-t-md">
                                    <h5 className={`${jura.variable} font-sans text-3xl font-bold leading-normal text-r-white`} id="exampleModalLabel">Rocket Review</h5>
                                </div>
                                <div className="flex flex-col relative p-4 space-y-5">
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Title: </label>
                                            <input value={rocket.title} name="title" type="title" className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></input>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Rocket Name: </label>
                                            <input value={rocket.rocketName} name="rocketName" type="rocketName" className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></input>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>Description: </label>
                                            <textarea name="description" value={rocket.description} className={`${jura.variable} font-sans bg-r-white appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-space-pink`}  onChange={handleChange}></textarea>
                                    </div>
                                    <div className='flex justify-between'>
                                            <label className={`${jura.variable} font-sans text-r-white/70 text-lg font-md`}>User: </label>
                                            <Select  className={`${jura.variable} font-sans w-1/2 text-space-purp`} getOptionLabel={(e:any) => e.login} getOptionValue={(e) => e.login} options={usersEx} onInputChange={(value) => setQuery(value)} onChange={(value) => setSelectedUser(value)}/>
                                           
                                    </div>
                                </div>
                                <div className="flex space-x-5 flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-r-white rounded-b-md">
                                    <button onClick={closeEditingRocket} type="button" className={`${jura.variable} font-sans px-6 py-2.5 bg-r-white text-space-purp font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-space-purp hover:text-r-white hover:shadow-lg focus:bg-space-purp focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150ease-in-out`}>Close</button>
                                    <button onClick={handleEdit} type="button" className={`${jura.variable} font-sans px-6 py-2.5 bg-r-white text-space-purp font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-space-purp hover:text-r-white hover:shadow-lg focus:bg-space-purp focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150ease-in-out`}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <></>}
                <header className='flex pl-5 pr-5 pt-10 justify-around h-[10vh] bg-regal-black'>
                    <h1 className={`${jura.variable} font-sans text-r-white text-lg lg:text-4xl hover:text-space-purp`}>SATURN</h1>
                    <div className='flex w-2/4 justify-center space-x-10'>
                        <Link href={"/"} className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Home</Link>
                        <Link href={"/rockets"}  className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Rockets</Link>
                    </div>
                    <div></div>
                </header>
                <div className='flex flex-col bg-[url(/night-sky.jpg)] h-[90vh] w-full pl-20 pr-20 py-5 bg-cover space-y-4'>
                    <div className='flex justify-between'>
                        <h2 className={`${jura.variable} font-sans text-2xl text-r-white`}>ROCKET REVIEW: </h2>
                        <button onClick={() => setCreateModal(true)} className='flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp rounded-2xl text-space-purp transition duration-150 ease-in-out'>
                            <Image width={25} height={25} src={"/create.svg"} alt="create icon"></Image>
                            <p className={`${jura.variable} font-sans text-lg `}>Create a new Rocket</p>
                        </button>
                    </div>
                    <div className='grid grid-cols-2 gap-4 h-full'>
                        {rockets.map((rocket, i)=> {
                            return(
                            <div key={i} className='flex border-2 border-solid border-space-purp rounded-lg bg-regal-black/70 justify-between h- p-10'>
                            <div className='flex flex-col w-full'>
                                <div className='flex h-[10%] justify-end space-x-2'>
                                    <button onClick={()=> setEditingRocket(i)} className='flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp'>
                                        <Image width={15} height={15} src={"/edit.svg"} alt="edit icon"></Image>
                                        <p className={`${jura.variable} font-sans  text-m `}>Edit</p>
                                    </button>
                                    <button onClick={handleDelete.bind(undefined, i)} className='flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp'>
                                        <Image  width={15} height={15} src={"/delete.svg"} alt="delete icon"></Image>
                                        <p className={`${jura.variable} font-sans  text-m `}>Delete</p>
                                    </button>
                                </div>
                                <div className='flex h-[90%]'>
                                    <Image width={500} height={500} src={"/rocket.jpg"} className="w-1/2 h-full rounded-lg object-contain object-scale-down" alt='Picture of Rocket'></Image>
                                    <div className='flex flex-col w-1/2 pl-5 justify-center'>
                                        <h3 className={`${jura.variable} font-sans text-space-purp text-2xl`}>{rocket.title}</h3>
                                        <h4 className={`${jura.variable} font-sans text-r-white/70 text-lg font-light`}>{rocket.rocketName}</h4>
                                        <p className={`${jura.variable} font-sans text-r-white text-lg`}>Description:</p>
                                        <p className={`${jura.variable} font-sans text-r-white/70 text-sm font-light`}>{rocket.description}</p>
                                        <div className='flex flex-col'>
                                            <p className={`${jura.variable} font-sans text-space-purp text-lg`}>Reviewer: </p>
                                            <div className='flex items-center'>
                                                <Image className='rounded-full' width={50} height={50} src={rocket.user.avatar_url} alt="profile pic"></Image>
                                                <div className='flex flex-col pl-5'>
                                                    <h5 className={`${jura.variable} font-sans text-r-white text-m `}>{rocket.user.login}</h5>
                                                    <div className='flex justify-between'>
                                                        <h5 className={`${jura.variable} font-sans text-space-purp text-m `}>Score: </h5>
                                                        <h5 className={`${jura.variable} font-sans text-r-white text-m `}>{rocket.user.score}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-around py-2'>
                                                <a rel="noreferrer"  target="_blank" href={rocket.user.html_url} className='justify-center w-full flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp'>
                                                    <p className={`${jura.variable} font-sans  text-m `}>Visit</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )})}  
                    </div>
                </div>
            </main>
        </>
    )
}

