import Navbar from '@/components/Navbar/index'
import Footer from '@/components/Footer/Footer'
import Card from '@/components/projectsCards/Card'
import PhysicsGrid from '@/components/projectsCards/PhysicsGrid';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-screen">
        <PhysicsGrid backgroundColor="#f7f7f7" objectColor="#C25421"/>
      </div>
      <Footer />
    </main>
  );
}
