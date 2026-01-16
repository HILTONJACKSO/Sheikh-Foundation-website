import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    href?: string;
    children: React.ReactNode;
}

export default function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
    const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 text-center inline-block";
    const variants = {
        primary: "bg-primary text-white hover:bg-primaryLight",
        secondary: "border-2 border-primary text-primary hover:bg-primary/5",
    };

    const combinedClassName = cn(baseStyles, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
