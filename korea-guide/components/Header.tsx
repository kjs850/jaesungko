'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTrip} from './TripProvider';
export default function Header(){const path=usePathname();const {trip}=useTrip();return <header className="site-header"><Link href="/" className="brand" aria-label="Somewhere in Korea home"><span className="brand-mark">어딘가</span><span>somewhere<span className="brand-sub">IN KOREA</span></span></Link><nav aria-label="Main navigation"><Link href="/cities/seoul" aria-current={path==='/'||path==='/cities/seoul'?'page':undefined}>Explore Seoul</Link><Link href="/start" aria-current={path==='/start'?'page':undefined}>First-timer’s guide</Link><Link href="/essentials" aria-current={path==='/essentials'?'page':undefined}>The essentials</Link></nav><Link href="/my-trip" className="trip-link">My trip <span>{trip.saved.length}</span></Link></header>}
