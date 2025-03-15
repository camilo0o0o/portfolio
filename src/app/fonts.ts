import { Spline_Sans_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Google font
export const splineSansMono = Spline_Sans_Mono({
    subsets: ['latin'],
    display: 'swap',
})

// Custom local font
export const mileins = localFont({
    src: [
        {
            path: '../../public/fonts/mileins_bold.otf',
            weight: '700',
            style: 'bold',
        },
        {
            path: '../../public/fonts/mileins_normal.otf',
            weight: '400',
            style: 'normal',
        }
    ],
    display: 'swap',
    variable: '--font-mileins', // CSS variable name for the font
})

