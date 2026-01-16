"use client";

import React, { useState } from 'react';
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BentoGrid from "@/components/BentoGrid";
import BentoCard from "@/components/BentoCard";
import Button from "@/components/Button";
import { X, Landmark, Smartphone, Copy, Check, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function VolunteerDonatePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const [vStatus, setVStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [vErrorMessage, setVErrorMessage] = useState<string | null>(null);
    const [vFormData, setVFormData] = useState({
        fullName: '',
        email: '',
        role: 'Education Support',
        message: ''
    });

    const handleVolunteerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setVStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...vFormData, type: 'volunteer' })
            });

            const data = await response.json();
            if (data.success) {
                setVStatus('success');
                setVFormData({ fullName: '', email: '', role: 'Education Support', message: '' });
            } else {
                setVErrorMessage(data.error || 'Submission failed.');
                setVStatus('error');
            }
        } catch (error: any) {
            setVErrorMessage(error.message || 'Submission failed.');
            setVStatus('error');
        }
    };

    return (
        <div className="pb-20">
            <Hero
                title="Support Our Mission"
                description="Whether you give time or resources, you're making a difference. Join us in building a stronger community."
                primaryBtnText="Donate Now"
                primaryBtnHref="#donate"
                image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
            />

            <section id="donate" className="px-6 max-w-7xl mx-auto mb-20 pt-20">
                <SectionHeader
                    title="Make an Impact Today"
                    subtitle="Join the Movement"
                    description="Your contribution, whether big or small, helps us continue our vital work across Liberia."
                    center
                />

                <div className="mt-16 grid lg:grid-cols-2 gap-12">
                    {/* Volunteer Form - Green Background */}
                    <div className="bg-primary p-10 rounded-[2rem] shadow-xl text-white">
                        <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">Volunteer With Us</h3>

                        {vStatus === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                                <CheckCircle2 size={70} className="mb-6 opacity-90" />
                                <h4 className="text-2xl font-bold uppercase tracking-tight mb-4">Application Received!</h4>
                                <p className="text-white/80 max-w-sm mx-auto mb-8">
                                    Thank you for your interest. We'll review your application and contact you at info@kouyatehfoundation.org soon.
                                </p>
                                <Button
                                    onClick={() => setVStatus('idle')}
                                    className="bg-white text-primary hover:bg-gray-100 px-10"
                                >
                                    Apply for Another Role
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p className="text-white/80 mb-8 leading-relaxed">
                                    Join our team of dedicated volunteers and use your skills to empower others. We have roles in education, health, and solar infrastructure.
                                </p>
                                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        required
                                        value={vFormData.fullName}
                                        onChange={(e) => setVFormData({ ...vFormData, fullName: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all"
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={vFormData.email}
                                        onChange={(e) => setVFormData({ ...vFormData, email: e.target.value })}
                                        placeholder="Email Address"
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all"
                                    />
                                    <div className="relative">
                                        <select
                                            value={vFormData.role}
                                            onChange={(e) => setVFormData({ ...vFormData, role: e.target.value })}
                                            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:bg-white/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Education Support" className="text-primaryDark">Education Support</option>
                                            <option value="Health Outreach" className="text-primaryDark">Health Outreach</option>
                                            <option value="Community Advocate" className="text-primaryDark">Community Advocate</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    <textarea
                                        required
                                        value={vFormData.message}
                                        onChange={(e) => setVFormData({ ...vFormData, message: e.target.value })}
                                        placeholder="Tell us a bit about your skills and why you want to join..."
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20 transition-all h-32"
                                    ></textarea>

                                    {vStatus === 'error' && (
                                        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-center text-red-100 text-xs text-balance">
                                            {vErrorMessage || 'Submission failed. Please try again or email us directly.'}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={vStatus === 'loading'}
                                        className="w-full bg-white text-primary hover:bg-gray-100 py-4 font-bold border-none disabled:opacity-50"
                                    >
                                        {vStatus === 'loading' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Loader2 className="animate-spin" size={20} />
                                                Submitting...
                                            </span>
                                        ) : "Submit Application"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Donation Options */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-primaryDark mb-8 uppercase tracking-tight">Simple Ways to Give</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl group hover:border-primary/30 transition-all">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Landmark size={24} />
                                    </div>
                                    <h4 className="font-bold text-xl text-primaryDark mb-3">One-time Gift</h4>
                                    <p className="text-sm text-gray-500 mb-8 line-clamp-2">Make an immediate impact with a single contribution to our active projects.</p>
                                    <Button onClick={() => setIsModalOpen(true)} className="w-full">Give Now</Button>
                                </div>
                                <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl group hover:border-primary/30 transition-all">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Smartphone size={24} />
                                    </div>
                                    <h4 className="font-bold text-xl text-primaryDark mb-3">Mobile Support</h4>
                                    <p className="text-sm text-gray-500 mb-8 line-clamp-2">The fastest way to support us using your mobile wallet locally.</p>
                                    <Button onClick={() => setIsModalOpen(true)} variant="secondary" className="w-full">Donate via Mobile</Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-primary/5 p-8 rounded-2xl border border-primary/10">
                            <h3 className="text-lg font-bold text-primaryDark mb-6 uppercase tracking-wider">Your Impact Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                                    <span className="font-bold text-primary">$50</span>
                                    <span className="text-sm text-gray-600 italic">Supplies for 5 kids</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                                    <span className="font-bold text-primary">$200</span>
                                    <span className="text-sm text-gray-600 italic">Mobile clinic for a day</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                                    <span className="font-bold text-primary">$500</span>
                                    <span className="text-sm text-gray-600 italic">Clean water borehole maintenance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Donation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-primaryDark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-primary transition-all z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-10 lg:p-14">
                            <div className="text-center mb-10">
                                <span className="inline-block py-1 px-4 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">Direct Support</span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-primaryDark uppercase tracking-tighter">Donation Details</h3>
                                <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                {/* Bank Details */}
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                                        <Landmark size={28} />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Bank Account (International)</p>
                                        <h4 className="font-bold text-primaryDark text-lg">EcoBank Liberia Limited</h4>
                                        <p className="text-gray-500 font-mono tracking-wider">Account: 6102209462</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard("6102209462", "bank")}
                                        className="p-3 bg-white hover:bg-primary hover:text-white rounded-xl shadow-sm text-gray-400 transition-all flex items-center gap-2"
                                    >
                                        {copiedField === 'bank' ? <Check size={18} /> : <Copy size={18} />}
                                        <span className="text-xs font-bold uppercase whitespace-nowrap">{copiedField === 'bank' ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>

                                {/* Mobile Money */}
                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                                        <Smartphone size={28} />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <p className="text-[10px] text-primary/60 font-bold uppercase tracking-widest mb-1">Mobile Money (local)</p>
                                        <h4 className="font-bold text-primaryDark text-lg">Lonestar Cell MTN</h4>
                                        <p className="text-gray-500 font-mono tracking-xl">Number: +231 88 755 5000</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard("+231887555000", "momo")}
                                        className="p-3 bg-white hover:bg-primary hover:text-white rounded-xl shadow-sm text-gray-400 transition-all flex items-center gap-2"
                                    >
                                        {copiedField === 'momo' ? <Check size={18} /> : <Copy size={18} />}
                                        <span className="text-xs font-bold uppercase whitespace-nowrap">{copiedField === 'momo' ? 'Copied' : 'Copy'}</span>
                                    </button>
                                </div>
                            </div>

                            <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed uppercase tracking-wider">
                                Please mention "Donation" as the reference message. <br /> We appreciate your selfless contribution.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
