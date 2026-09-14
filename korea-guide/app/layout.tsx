import type {Metadata} from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import {TripProvider} from '@/components/TripProvider';
import './globals.css';
export const metadata:Metadata={title:{default:'Somewhere in Korea — Your first Seoul',template:'%s · Somewhere in Korea'},description:'A considered first-timer’s field guide to Seoul. Get your bearings, find your places, and build a little trip of your own.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><TripProvider><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<footer><Link href="/" className="footer-brand">somewhere in Korea.</Link><p>A little context. A little confidence. A city to make your own.</p><div><Link href="/sources">Sources & editorial notes</Link><span>Seoul edition · 01</span></div><small>Independent guide. Based on the Seoul Tourism Organization’s 2025 guide; not affiliated with STO. Illustrations are original, not venue photographs.</small></footer></TripProvider></body></html>}
