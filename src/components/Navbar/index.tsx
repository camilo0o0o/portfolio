import Logo from './Logo'
import Navigation from './Navigation'
import Timezone from './Timezone'

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full px-8 py-4 flex items-center justify-between">
            <Logo />
            <Navigation />
            <Timezone />
        </header>
    )
} 