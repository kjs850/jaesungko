import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3100';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
await mkdir('test-results',{recursive:true});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.getByRole('button',{name:'Save Gyeongbokgung Palace',exact:true}).waitFor();
 await page.screenshot({path:'test-results/desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Heritage',exact:false}).click();assert.equal(await page.locator('.place-card').count(),4);
 await page.getByLabel('Neighborhood',{exact:true}).selectOption('Seongsu & east');assert.equal(await page.locator('.place-card').count(),0);
 await page.getByRole('button',{name:'Clear filters'}).click();assert.equal(await page.locator('.place-card').count(),6);
 await page.getByRole('textbox',{name:'Search places'}).fill('광장');assert.equal(await page.locator('.place-card').count(),1);
 await page.getByRole('textbox',{name:'Search places'}).fill('');
 await page.getByRole('button',{name:'Save Gyeongbokgung Palace',exact:true}).click();
 await page.getByRole('link',{name:'My trip 1',exact:true}).click();
 await page.getByLabel('Check your entry requirements',{exact:true}).check();await page.reload();
 await page.getByRole('button',{name:'Remove Gyeongbokgung Palace',exact:true}).waitFor();assert.equal(await page.getByLabel('Check your entry requirements',{exact:true}).isChecked(),true);
 await page.pdf({path:'test-results/my-trip.pdf',format:'A4',printBackground:true});
 await page.getByRole('button',{name:'Remove Gyeongbokgung Palace',exact:true}).click();await page.getByText('Every trip starts somewhere.').waitFor();
 await page.getByRole('button',{name:'Start over / clear my trip'}).click();await page.getByRole('button',{name:'Keep my trip'}).click();assert.equal(await page.getByLabel('Check your entry requirements',{exact:true}).isChecked(),true);
 await page.getByRole('button',{name:'Start over / clear my trip'}).click();await page.getByRole('button',{name:'Yes, clear my trip'}).click();assert.equal(await page.getByLabel('Check your entry requirements',{exact:true}).isChecked(),false);
 await page.goto(base+'/places/bukchon');await page.getByRole('heading',{name:'Bukchon Hanok Village',exact:true}).waitFor();
 assert.ok((await page.getByRole('link',{name:'Open the original guide'}).getAttribute('href')).endsWith('#page=23'));
 await page.screenshot({path:'test-results/detail.png',fullPage:true});
 for(const path of ['/start','/essentials','/sources','/cities/seoul']){const response=await page.goto(base+path);assert.equal(response.status(),200);}
 const response=await page.goto(base+'/places/not-real');assert.equal(response.status(),404);
 await page.goto(base);await page.getByRole('button',{name:'Save these places +',exact:true}).first().click();await page.getByRole('link',{name:'My trip 3',exact:true}).waitFor();
 await page.evaluate(()=>localStorage.setItem('seoul-field-guide:trip:v1','corrupt'));await page.reload();await page.getByRole('link',{name:'My trip 0',exact:true}).waitFor();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:1});const mp=await mobile.newPage();mp.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/places/gyeongbokgung','/my-trip','/start','/essentials','/sources']){await mp.goto(base+path);assert.equal(await mp.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`overflow: ${path}`);}
 await mp.goto(base);await mp.getByRole('button',{name:'Save Gyeongbokgung Palace',exact:true}).click();await mp.getByRole('link',{name:'My trip 1',exact:true}).click();await mp.getByRole('button',{name:'Remove Gyeongbokgung Palace',exact:true}).waitFor();
 await mp.screenshot({path:'test-results/mobile-trip.png',fullPage:true});await mp.goto(base);await mp.screenshot({path:'test-results/mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: filters, search, saved places, persistence, checklist, reset, source links, routes, 404, malformed storage, mobile layout and print.');
}finally{await browser.close();}
