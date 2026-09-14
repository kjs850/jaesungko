'use client';
import {useState} from 'react';
import Link from 'next/link';
import {routes,places} from '@/lib/content';
import {useTrip} from './TripProvider';
export default function Routes(){const {addPlaces,ready}=useTrip();const [added,setAdded]=useState<number|null>(null);return <section className="section route-section" id="day-ideas"><div className="section-heading"><div><span className="eyebrow">03 / A LITTLE LESS PLANNING</span><h2>Let the day unfold.</h2></div><p>Three starting points, not strict schedules.<br/>Our editorial suggestions, at your own pace.</p></div><div className="route-grid">{routes.map((r,i)=><article key={r.title}><span className="route-index">DAY IDEA / 0{i+1}</span><h3>{r.title}</h3><p>{r.subtitle}</p><ol>{r.ids.map(id=><li key={id}><Link href={`/places/${id}`}>{places.find(p=>p.id===id)?.name}</Link></li>)}</ol><p className="route-note">{r.note}</p><button disabled={!ready} className="text-button" onClick={()=>{addPlaces(r.ids);setAdded(i)}}>{added===i?'Places added ✓':'Save these places +'} </button></article>)}</div><p aria-live="polite" className="sr-only">{added!==null?`${routes[added].title} places added to your trip`:''}</p></section>}
