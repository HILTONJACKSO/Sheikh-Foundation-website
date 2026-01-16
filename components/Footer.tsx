import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primaryDark text-white pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Foundation Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
                        <span className="font-bold text-xl uppercase tracking-tighter">Sheikh Kouyateh</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-light">
                        Building youth and women capacity through education, healthcare, justice, and sustainable development across Liberia & Africa.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors bg-white/5 p-2 rounded-full">
                            <Facebook size={20} />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors bg-white/5 p-2 rounded-full">
                            <Twitter size={20} />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors bg-white/5 p-2 rounded-full">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors bg-white/5 p-2 rounded-full">
                            <Linkedin size={20} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
                        <li><Link href="/works" className="hover:text-white transition-colors">Our Works</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Latest News</Link></li>
                        <li><Link href="/volunteer-donate" className="hover:text-white transition-colors">How to Help</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Focus Areas */}
                <div>
                    <h3 className="text-lg font-bold mb-6">Our Focus</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li>Education & Literacy</li>
                        <li>Healthcare Access</li>
                        <li>Women's Empowerment</li>
                        <li>Justice & Human Rights</li>
                        <li>Sustainable Development</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex gap-3">
                            <MapPin size={20} className="text-primaryLight flex-shrink-0" />
                            <span>Monrovia, Liberia</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone size={20} className="text-primaryLight flex-shrink-0" />
                            <span>+231 88 755 5000</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail size={20} className="text-primaryLight flex-shrink-0" />
                            <span>info@kouyatehfoundation.org</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Sheikh Kouyateh Foundation. All Rights Reserved. Built for Impact.</p>
            </div>
        </footer>
    );
}
