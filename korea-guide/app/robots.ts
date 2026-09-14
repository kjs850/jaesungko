import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',disallow:process.env.VERCEL_ENV==='preview'?'/':'/my-trip'}}}
