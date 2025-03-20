import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer/Footer'
import Card from '@/components/projectsCards/Card'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <Card 
          imageSrc="/images/projects/about_me_img.jpg"
          imageAlt="about me"
          topRightText="1995"
          bottomLeftText="ME, MYSELF AND I"  
          hoverColor="primary"
        />
      </div>
      <Footer />
    </main>
  );
}
