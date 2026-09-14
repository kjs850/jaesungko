'use client';
import {useState} from 'react';
export default function PlaceActions({text}:{text:string}){const [copied,setCopied]=useState(false);const [error,setError]=useState(false);return <><button className="text-button" onClick={async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);setError(false)}catch{setError(true)}}}>{copied?'Copied ✓':'Copy Korean name ↗'}</button><span role="status">{error?'Select and copy the Korean name shown above.':''}</span></>}
