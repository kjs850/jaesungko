'use client';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {checklist,places} from '@/lib/content';
import {parseTrip,STORAGE_KEY,type Trip} from '@/lib/storage';
type Context = {trip:Trip;ready:boolean;togglePlace:(id:string)=>void;toggleCheck:(id:string)=>void;addPlaces:(ids:string[])=>void;reset:()=>void;notice:string};
const Ctx=createContext<Context|null>(null);
export function TripProvider({children}:{children:ReactNode}) {
 const [trip,setTrip]=useState<Trip>({version:1,saved:[],checked:[]});
 const [ready,setReady]=useState(false);const [notice,setNotice]=useState('');
 useEffect(()=>{try {setTrip(parseTrip(localStorage.getItem(STORAGE_KEY),places.map(p=>p.id),checklist.map(c=>c.id)))}catch{setNotice('Storage is unavailable. Your selections will last for this visit only.')}setReady(true)},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(STORAGE_KEY,JSON.stringify(trip))}catch{setNotice('Storage is unavailable. Your selections will last for this visit only.')}},[trip,ready]);
 const togglePlace=(id:string)=>{if(!ready)return;setTrip(t=>({...t,saved:t.saved.includes(id)?t.saved.filter(x=>x!==id):[...t.saved,id]}))};
 const toggleCheck=(id:string)=>{if(!ready)return;setTrip(t=>({...t,checked:t.checked.includes(id)?t.checked.filter(x=>x!==id):[...t.checked,id]}))};
 return <Ctx.Provider value={{trip,ready,togglePlace,toggleCheck,notice,addPlaces:ids=>{if(ready)setTrip(t=>({...t,saved:[...new Set([...t.saved,...ids])]}))},reset:()=>setTrip({version:1,saved:[],checked:[]})}}>{children}</Ctx.Provider>
}
export function useTrip(){const value=useContext(Ctx);if(!value)throw new Error('TripProvider is required');return value}
export function SaveButton({id,compact=false}:{id:string;compact?:boolean}) {const {trip,togglePlace,ready}=useTrip();const saved=trip.saved.includes(id);return <button disabled={!ready} className={compact?'save-icon':'button secondary'} aria-label={`${saved?'Remove':'Save'} ${places.find(p=>p.id===id)?.name}`} aria-pressed={saved} onClick={()=>togglePlace(id)}><span aria-hidden="true">{saved?'♥':'♡'}</span>{!compact&&(saved?' Saved to my trip':' Save to my trip')}</button>}
