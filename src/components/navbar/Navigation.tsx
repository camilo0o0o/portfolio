'use client'
import { useState, useEffect } from 'react'
import { splineSansMono } from '@/app/fonts'

type NavButtonProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
    activeColorVar?: string;
    hoverColorVar?: string;
}

const navButtons = [
    { label: 'UX/UI DESIGN', colorVar: 'var(--color-primary)', hoverColorVar: 'var(--color-primary-hover)' },
    { label: '3D & MOTION', colorVar: 'var(--color-secondary)', hoverColorVar: 'var(--color-secondary-hover)' },
    { label: 'CODING', colorVar: 'var(--color-tertiary)', hoverColorVar: 'var(--color-tertiary-hover)' },
    { label: 'ANALOG EXPLORATIONS', colorVar: 'var(--color-quaternary)', hoverColorVar: 'var(--color-quaternary-hover)' }
] as const

function NavButton({ label, isActive, onClick, activeColorVar = 'var(--color-default-grey)', hoverColorVar = 'var(--color-grey-hover)' }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-xs transition-all cursor-pointer nav-button ${splineSansMono.className}`}
            style={{ 
                color: isActive ? activeColorVar : 'var(--color-default-grey)',
                fontWeight: isActive ? 'bold' : '100',
                '--hover-color': isActive ? activeColorVar : hoverColorVar
            } as React.CSSProperties}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.color = hoverColorVar;
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-default-grey)';
                }
            }}
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
                    hoverColorVar={button.hoverColorVar}
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