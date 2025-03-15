'use client'
import { useState, useEffect } from 'react'
import { splineSansMono } from '@/app/fonts'

type NavButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
    activeColorVar?: string;
}

const navButtons = [
    { label: 'UX/UI DESIGN', colorVar: 'var(--color-primary)' },
    { label: '3D & MOTION', colorVar: 'var(--color-secondary)' },
    { label: 'CODING', colorVar: 'var(--color-tertiary)' },
    { label: 'ANALOG EXPLORATIONS', colorVar: 'var(--color-quaternary)' }
] as const

function NavButton({ label, isActive, onClick, activeColorVar = 'var(--color-text-default)' }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{ 
                color: isActive ? activeColorVar : 'var(--color-text-default)',
                fontWeight: isActive ? 'bold' : '100'
            }}
            className={`${splineSansMono.className} text-xs transition-colors cursor-pointer`}
        >
            {label}
        </button>
    )
}

type NavigationProps = {
    onCategoryChange?: (categories: string[]) => void;
}

export default function Navigation({ onCategoryChange }: NavigationProps) {
    const [activeButtons, setActiveButtons] = useState<string[]>([])

    const toggleButton = (label: string) => {
        setActiveButtons(prev => 
            prev.includes(label) 
                ? prev.filter(button => button !== label) 
                : [...prev, label]
        )
    }

    // Notify parent component when active categories change
    useEffect(() => {
        if (onCategoryChange) {
            onCategoryChange(activeButtons);
        }
    }, [activeButtons, onCategoryChange]);

    const renderNavButtons = () => {
        return navButtons.map((button) => (
            <li key={button.label}>
                <NavButton
                    label={button.label}
                    isActive={activeButtons.includes(button.label)}
                    onClick={() => toggleButton(button.label)}
                    activeColorVar={button.colorVar}
                />
            </li>
        ))
    }

    return (
        <nav>
            <ul className="flex gap-8">
                {renderNavButtons()}
            </ul>
        </nav>
    )
}