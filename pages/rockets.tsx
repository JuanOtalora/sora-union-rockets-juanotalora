import { Jura } from '@next/font/google'
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios';
import AsyncSelect from "react-select/async"


const jura = Jura({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-jura' })

export default function Rockets() {
    const [initialUser, setInitialUser] = useState({githubUsername : "", githubProfilepic: '', score: 0});
    const [createModal, setCreateModal] = useState(false);
    const apiEndpoint = 'https://api.github.com';
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState();

    const handleQueryInput = (e: any) => {
        const value = e.target.value;
        setQuery(value);
    };


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

    const handleSearchUsers = async (e: any) => {
        e.preventDefault();
        if (query) {
          const items = await fetchUsers();
          setUsers(items);
        } else {
          console.log("Your query is empty...");
        }
      };
    
    useEffect(() => {
        const displayUsersOnChange = async () => {
          if (query) {
            const items = await fetchUsers();
            setUsers(items);
          }
        };
        displayUsersOnChange();
    }, []);

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await fetch('https://api.github.com/users/JuanOtalora')
            const data = await res.json();
            setInitialUser({githubUsername: data.login, githubProfilepic: data.avatar_url, score: data.followers})
        }
        fetchUser();
    }, [])

    const [rockets, setRockets] = useLocalStorageState('rockets', {
        defaultValue: [
            {
            title : "My first Review!",
            rocketName : "Saturn",
            description : "This was my first review i loved the rocket!",
            user : {}
            },
        ]
    })

    

    const [rocket, setRocket] = useState({ title: '', rocketName: '', description: '', user: {}});
    function handleChange(e: any) {
        console.log("sellamaalgo", e)
        setRocket(rocket => ({
            ...rocket,
            [e.target.name]: e.target.value
        }));
        console.log(rocket)
    }

    const handleCloseCreate = () => {
        setRocket({ title: '', rocketName: '', description: '', user : {}});
        setCreateModal(false);
    }

    const handleSubmitCreate = () => {
        if(selectedUser){
            console.log("entra", selectedUser)
            setRocket(rocket => ({...rocket, user: selectedUser}))
        }
        setRockets([...rockets, rocket]);
        setRocket({ title: '', rocketName: '', description: '', user: {}});
        setCreateModal(false);
    }
    
    const fetchUse = async () => {
        const items = await fetchUsers();
        return items;
    }

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
                                            {/* <input value={query} onChange={handleQueryInput} type="text" ></input>
                                            <button onClick={handleSearchUsers} type="button" className={`${jura.variable} font-sans px-6 py-2.5 bg-r-white text-space-purp font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-space-purp hover:text-r-white hover:shadow-lg focus:bg-space-purp focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150ease-in-out`}>Submit</button> */}
                                            <AsyncSelect cacheOptions className='w-1/2' getOptionLabel={(e:any) => e.login} getOptionValue={(e) => e.login} loadOptions={fetchUse} onInputChange={(value) => setQuery(value)} onChange={(value) => setSelectedUser(value)}/>
                                            {/* {query !== '' ? (
                                            <div className='flex flex-col h-64 overflow-auto absolute top-full left-2/5 bg-r-white space-y-2 w-72'>
                                                {users ? ( users.map((user) => {
                                                    return (
                                                        <button onClick={()=> selectUser(user)} className='py-2 px-2 flex justify-center items-center h-10 border-b border-solid border-space-purp' key={user.login}>
                                                            <Image className='rounded-full' width={25} height={25} alt="user profile" src={user.avatar_url}></Image>
                                                            <h4 className={`${jura.variable} font-sans text-m text-space-purp`}>{user.login}</h4>
                                                        </button>
                                                    );
                                                })
                                                ) : (
                                                <h2>There is nothing to display...</h2>
                                            )}</div>) : null}  */}
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
                <header className='flex pl-5 pr-5 pt-10 justify-around h-[10vh] bg-regal-black'>
                    <h1 className={`${jura.variable} font-sans text-r-white text-lg lg:text-4xl hover:text-space-purp`}>SATURN</h1>
                    <div className='flex w-2/4 justify-center space-x-10'>
                        <Link href={"/"} className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Home</Link>
                        <Link href={"/rockets"}  className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Rockets</Link>
                    </div>
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
                            <div className='flex border-2 border-solid border-space-purp rounded-lg bg-regal-black/70 justify-between h-1/2 p-10'>
                                <div className='flex flex-col'>
                                    <div className='flex h-[10%] justify-end space-x-2'>
                                        <button className='flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp'>
                                            <Image width={15} height={15} src={"/edit.svg"} alt="edit icon"></Image>
                                            <p className={`${jura.variable} font-sans  text-m `}>Edit</p>
                                        </button>
                                        <button className='flex py-2 px-4  space-x-1 items-center border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp'>
                                            <Image width={15} height={15} src={"/delete.svg"} alt="delete icon"></Image>
                                            <p className={`${jura.variable} font-sans  text-m `}>Delete</p>
                                        </button>
                                    </div>
                                    <div className='flex h-[90%]'>
                                        <Image width={500} height={500} src={"/rocket.jpg"} className="w-1/2 h-full rounded-lg object-contain object-scale-down" alt='Picture of Rocket'></Image>
                                        <div className='flex flex-col w-1/2 pl-5'>
                                            <h3 className={`${jura.variable} font-sans text-space-purp text-2xl`}>My first Review</h3>
                                            <h4 className={`${jura.variable} font-sans text-r-white/70 text-lg font-light`}>DISCOVER</h4>
                                            <p className={`${jura.variable} font-sans text-r-white text-lg`}>Description:</p>
                                            <p className={`${jura.variable} font-sans text-r-white/70 text-sm font-light`}>This is my first example etc mfkmdkdmfldfmdlmfdkfmdfldmfdklmf</p>
                                            <div className='flex flex-col'>
                                                <p className={`${jura.variable} font-sans text-space-purp text-lg`}>Reviewer: </p>
                                                <div className='flex items-center'>
                                                    <Image className='rounded-full' width={50} height={50} src={"https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"} alt="profile pic"></Image>
                                                    <div className='flex flex-col pl-5'>
                                                        <h5 className={`${jura.variable} font-sans text-r-white text-m `}>Username</h5>
                                                        <h5 className={`${jura.variable} font-sans text-space-purp text-m `}>Followers: </h5>
                                                    </div>
                                                </div>
                                                <div className='flex justify-around'>
                                                    <h5 className={`${jura.variable} font-sans text-r-white text-m `}>Score</h5>
                                                    <h5 className={`${jura.variable} font-sans text-space-purp text-m `}>Visit: </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </main>
        </>
    )
}

