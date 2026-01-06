export default function Footer() {
    return (
        <footer className="py-24 bg-stone-50 border-t border-stone-200/60 px-6 text-center">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="font-black text-2xl tracking-tighter text-stone-900">CodeFreelance.</div>
                <div className="flex justify-center gap-10 text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">
                    <a href="#" className="hover:text-stone-900 transition-colors">PRIVACY</a>
                    <a href="#" className="hover:text-stone-900 transition-colors">COMMUNITY</a>
                    <a href="#" className="hover:text-stone-900 transition-colors">CONTACT</a>
                </div>
                <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em]">© 2026 Powered by Next.js & Tailwind. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
