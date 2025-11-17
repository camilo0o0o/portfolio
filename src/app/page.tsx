import Logo from '@/components/Logo/Logo'
import HalftoneImage from '@/components/HalftoneImage/HalftoneImage'
import FloatingTitleImage from '@/components/FloatingTitleImage/FloatingTitleImage'
import ChatButton from '@/components/ChatButton/ChatButton'
import GrainCard from '@/components/GrainCard/GrainCard'

export default function Home() {
  const mainImage = {
    src: "/images/projects/selfie.jpeg",
    alt: "Selfie"
  }

  return (
    <GrainCard 
      backgroundColor="#ECE7DA"
      className="min-h-screen"
    >
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-center items-center h-10">
          <Logo />
        </header>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          <FloatingTitleImage
            title="ME, MYSELF AND I"
            imageComponent={<HalftoneImage src={mainImage.src} alt={mainImage.alt} width={200} />}
            imageWidth={200}
            imageHeight={250}
          />
        </div>

        {/* Footer */}
        <footer className="flex justify-center items-center h-10">
          <ChatButton />
        </footer>
      </main>
    </GrainCard>
  );
}
