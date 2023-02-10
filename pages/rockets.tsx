import { Jura } from '@next/font/google'
import Link from 'next/link';
import Image from 'next/image'

const jura = Jura({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-jura' })

export default function Rockets() {
    return (
        <>
            <main>
                <header className='flex pl-5 pr-5 pt-10 justify-around h-[10vh]'>
                    <h1 className={`${jura.variable} font-sans text-r-white text-lg lg:text-4xl hover:text-space-purp`}>SATURN</h1>
                    <div className='flex w-2/4 justify-center space-x-10'>
                        <Link href={"/"} className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Home</Link>
                        <Link href={"/rockets"}  className={`${jura.variable} font-sans text-r-white/75 hover:text-space-purp lg:text-2xl font-light`}>Rockets</Link>
                    </div>
                    <button className='border-solid border border-space-purp/80 rounded-2xl text-space-purp/80 hover:text-space-purp hover:border-space-purp lg:text-1xl '>
                        <Link href={"/rockets"} className={`${jura.variable} font-sans py-10 px-5 lg:py-20`}>Review Rockets</Link>
                    </button> 
                </header>
                <div className='flex flex-col bg-[url(/night-sky.jpg)] h-[90vh] w-full pl-20 pr-20 py-5 bg-cover'>
                    <div className='grid grid-cols-2 gap-4 h-full'>
                        <div className='flex border-2 border-solid border-space-purp rounded-lg bg-regal-black/70 justify-between h-1/2 p-10'>
                            <Image width={500} height={500} src={"/rocket.jpg"} className="w-1/2 h-full rounded-lg object-contain object-scale-down" alt='Picture of Rocket'></Image>
                            <div className='flex flex-col w-1/2 pl-5'>
                                <h3 className={`${jura.variable} font-sans text-space-purp text-2xl`}>My first Review</h3>
                                <h4 className={`${jura.variable} font-sans text-r-white/70 text-lg font-light`}>DISCOVER</h4>
                                <p className={`${jura.variable} font-sans text-r-white text-lg`}>Description:</p>
                                <p className={`${jura.variable} font-sans text-r-white/70 text-m font-light`}>This is my first example etc mfkmdkdmfldfmdlmfdkfmdfldmfdklmf</p>
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
            </main>
        </>
    )
}

