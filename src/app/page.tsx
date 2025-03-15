import Navbar from '@/components/navbar'
import Footer from '@/components/footer/footer'
import { Turtle } from 'lucide-react'
import { mileins } from '@/app/fonts'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <Turtle className="w-10 h-10 text-[#DDA300]" />
        <h1 className={`${mileins.className} text-4xl font-bold text-[#DDA300]`}>WORK IN PROGRESS...</h1>
        <img src='/images/projects/about_me_img.jpg' alt='about me' className='w-60 border-2 border-black' />
      </div>
      <Footer />
    </main>
  );
}
