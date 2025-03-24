import Navbar from '@/components/Navbar/index'
import Footer from '@/components/Footer/Footer'
import PhysicsGrid from '@/components/projectsCards/PhysicsGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="w-full h-screen">
        <PhysicsGrid/>
      </div>
      <Footer />
    </main>
  );
}
