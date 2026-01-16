"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, type: 'contact' })
            });

            const data = await response.json();
            if (data.success) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setErrorMessage(data.error || 'Something went wrong.');
                setStatus('error');
            }
        } catch (error: any) {
            setErrorMessage(error.message || 'Something went wrong.');
            setStatus('error');
        }
    };

    return (
        <div className="pb-20">
            <Hero
                title="Get In Touch"
                description="Reach out to us for partnerships, volunteering, or general inquiries."
                primaryBtnText="Message Us"
                primaryBtnHref="#form"
                image="/contact_hero.png"
            />
            <section id="form" className="px-6 max-w-7xl mx-auto pt-20">
                <SectionHeader
                    title="Get In Touch"
                    subtitle="Contact Us"
                    description="We're here to answer any questions you may have about our work or how you can get involved."
                />

                <div className="mt-16 grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primaryDark text-lg">Main Office</h4>
                                <p className="text-gray-500 mt-1">Front Street MIC Building, Monrovia, Liberia</p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primaryDark text-lg">Phone Number</h4>
                                <p className="text-gray-500 mt-1">+231 88 755 5000</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="p-4 bg-primary/5 rounded-2xl text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primaryDark text-lg">Email Address</h4>
                                <p className="text-gray-500 mt-1">contact@kouyatehfoundation.org</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-primary p-10 rounded-3xl shadow-xl">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-white py-12 animate-in fade-in zoom-in duration-500">
                                <CheckCircle2 size={80} className="mb-6 opacity-90" />
                                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">Message Sent!</h3>
                                <p className="text-white/80 max-w-md mx-auto mb-8">
                                    Thank you for reaching out. A member of our team will get back to you at info@kouyatehfoundation.org shortly.
                                </p>
                                <Button
                                    onClick={() => setStatus('idle')}
                                    className="bg-white text-primary hover:bg-gray-100 px-12"
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6 text-white">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-80">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-80">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40"
                                        placeholder="Doe"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-sm font-bold opacity-80">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-sm font-bold opacity-80">Message</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/40 h-40"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                {status === 'error' && (
                                    <div className="sm:col-span-2 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center text-red-200 text-sm">
                                        {errorMessage || 'Something went wrong. Please try again or contact us directly.'}
                                    </div>
                                )}
                                <div className="sm:col-span-2">
                                    <Button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-white text-primary hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="animate-spin" size={20} />
                                                Sending...
                                            </span>
                                        ) : "Send Message"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Real Google Map Integration */}
                <div className="mt-20 h-[450px] overflow-hidden rounded-3xl border-4 border-white shadow-xl relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15886.9!2d-10.8!3d6.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMzYuMCJOIDEwwrA0Nyc1OS45Ilc!5e0!3m2!1sen!2slr!4v1700000000000!5m2!1sen!2slr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Sheikh Kouyateh Foundation Location"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
