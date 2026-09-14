import {test} from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFile} from 'node:fs/promises';
async function loadTypeScript(path) { const source = await readFile(new URL(path, import.meta.url), 'utf8'); const js = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText; return import('data:text/javascript;base64,'+Buffer.from(js).toString('base64')); }
const {places,areas,themes,routes,checklist,mapUrl,googleMapUrl} = await loadTypeScript('../lib/content.ts');
const {parseTrip} = await loadTypeScript('../lib/storage.ts');
test('published places have valid unique identifiers, source pages and navigation links',()=>{
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 for(const p of places){assert.match(p.id,/^[a-z0-9-]+$/);assert.ok(areas.includes(p.area));assert.ok(themes.includes(p.theme));assert.ok(p.name&&p.korean&&p.address&&p.summary);assert.ok(p.page>=6&&p.page<=91);assert.equal(p.pdfPage,Math.floor(p.page/2)+2);assert.ok(new URL(mapUrl(p)).pathname.includes(encodeURIComponent(p.korean)));assert.equal(new URL(googleMapUrl(p)).searchParams.get('query'),p.name+' '+p.address);if(p.website)assert.equal(new URL(p.website).protocol,'https:');}
 for(const route of routes)for(const id of route.ids)assert.ok(places.some(p=>p.id===id));
 assert.equal(new Set(checklist.map(c=>c.id)).size,checklist.length);
});
test('saved trips recover from malformed, old, duplicated and removed data',()=>{
 const p=places.map(p=>p.id),c=checklist.map(c=>c.id);
 const empty={version:1,saved:[],checked:[]};
 for(const raw of [null,'{','null','42','{"version":2}'])assert.deepEqual(parseTrip(raw,p,c),empty);
 assert.deepEqual(parseTrip(JSON.stringify({version:1,saved:['gyeongbokgung','gyeongbokgung','removed',null],checked:['entry','removed']}),p,c),{version:1,saved:['gyeongbokgung'],checked:['entry']});
 assert.deepEqual(parseTrip(JSON.stringify({version:1,saved:'bad',checked:{}}),p,c),empty);
});
