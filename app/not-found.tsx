"use client";

import Link from "next/link";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full text-center">
                <ScrollReveal direction="up" distance={40}>
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary animate-pulse">
                            <FileQuestion size={48} />
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold text-primaryDark uppercase tracking-tighter mb-4">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight mb-6">
                        Page Not Found
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                        We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" href="/" className="px-10 py-4 text-base font-bold shadow-xl shadow-primary/20">
                            Return Home
                        </Button>
                        <Button variant="secondary" href="/works" className="px-10 py-4 text-base font-bold">
                            View Our Works
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
