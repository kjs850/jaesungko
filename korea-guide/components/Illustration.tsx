import type { Scene } from '@/lib/content';

export function Illustration({scene='city',hero=false}:{scene?:Scene;hero?:boolean}) {
  return <svg className={hero?'hero-art':'place-art'} viewBox="0 0 800 500" role="img" aria-label={hero?'An original illustration of Seoul: mountains, palace roofs, the river and Namsan tower':`Stylized ${scene} illustration, not a photograph of the place`}>
    <defs><pattern id={`grain-${hero?'hero':scene}`} width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#233d39" opacity=".12"/></pattern></defs>
    <rect width="800" height="500" fill={scene==='market'?'#ead6bd':scene==='park'?'#dce3cd':scene==='museum'?'#e0dce5':'#e5e5dc'}/>
    <circle cx="610" cy="103" r="57" fill="#e7a176"/>
    <path d="M0 275 78 186 139 244 258 112 381 239 473 162 611 277 723 185 800 237V500H0Z" fill="#b7c7b8"/>
    <path d="M0 300 114 230 208 314 320 228 400 280 490 202 610 320 712 267 800 309V500H0Z" fill="#8da69b"/>
    {(hero||scene==='city'||scene==='tower')&&<g fill="#f3efe4" stroke="#385c54" strokeWidth="2">
      <path d="M87 320V214h47v106M144 325V246h40v79M201 329V189h39v140M265 340V256h61v84M572 330V232h48v98M634 352V198h40v154M691 370V260h56v110"/>
      {[95,111,152,169,209,226,275,299,582,600,642,659,702,725].map((x,i)=><path key={x} d={`M${x} ${i<4?263:280}v23m0 12v14`} stroke="#91a899" strokeWidth="5"/>)}
      <path d="m454 290 8-126h14l8 126" fill="#e9e4d5"/><path d="M451 166h34l7-17h-48z" fill="#2e554e"/><path d="M457 149v-28h23v28M469 121V61"/><path d="M433 294q38-39 76 0" fill="#3c6657"/>
    </g>}
    <path d="M-40 386Q181 285 381 362T850 338V500H-40" fill="#a9c3c6"/>
    <path d="M-40 410Q181 309 381 386T850 362" fill="none" stroke="#dee7df" strokeWidth="3"/>
    <path d="M-20 455Q155 367 340 421T820 414V500H-20" fill="#d1d5b6"/>
    <g fill="none" stroke="#eef1e7" strokeWidth="2" opacity=".8"><path d="M55 386h70m43-11h65m259 26h81m50-9h52M304 391h46"/></g>
    {(hero||scene==='palace')&&<g transform={hero?'translate(106 257) scale(.83)':'translate(210 200) scale(1.2)'}>
      <path d="M0 165h298v14H0z" fill="#999b85"/><path d="M22 84h252v81H22z" fill="#c88860"/>
      {[35,86,138,190,241].map(x=><g key={x}><path d={`M${x} 89h17v76h-17z`} fill="#813c2f"/><path d={`M${x+20} 106h25v39h-25z`} fill="#e5d6b7"/><path d={`M${x+32} 108v34`} stroke="#5c6250" strokeWidth="2"/></g>)}
      <path d="M-13 84Q31 75 65 31H226Q266 75 310 84Q235 104 147 93 55 105-13 84" fill="#294f47"/>
      <path d="M-13 84Q118 100 310 84M65 31h161" fill="none" stroke="#efdcbb" strokeWidth="4"/>
      <path d="M64 28h163L217 17H77Z" fill="#365e53"/><path d="M101 42 66 82m66-40-17 42m41-42 2 43m22-43 20 42m1-42 36 42" stroke="#6d8c74" strokeWidth="2"/>
    </g>}
    {scene==='market'&&!hero&&<g transform="translate(90 230)"><path d="M0 42h615v175H0z" fill="#e9bc83"/>{[0,205,410].map(x=><g key={x}><rect x={x+14} y="75" width="178" height="128" fill="#72574b"/><path d={`M${x} 0h205l12 63H${x-12}z`} fill="#b65336"/><path d={`M${x+35} 0h34l-5 63h-38m77-63h34l10 63h-43`} fill="#f3dcac"/><rect x={x+34} y="125" width="132" height="78" fill="#ae8b62"/>{[45,80,115,148].map(z=><circle key={z} cx={x+z} cy="124" r="15" fill="#dcb979"/>)}</g>)}</g>}
    {scene==='museum'&&!hero&&<g><path d="M98 344Q111 205 348 258 529 134 702 315L707 402H95Z" fill="#b7b9b1" stroke="#61776f" strokeWidth="2"/><path d="M98 344q257-28 604-29M150 279q244 71 520-1" fill="none" stroke="#f6f0e1" strokeWidth="3"/>{[160,215,270,325,380,435,490,545,600].map(x=><path key={x} d={`M${x} 306v91`} stroke="#7d9185"/>)}</g>}
    {(scene==='park'||hero)&&<g>{[45,84,635,706,752].map((x,i)=><g key={x} transform={`translate(${x} ${hero?375:300+i%2*65})`}><path d="M0 0v73" stroke="#5a6b47" strokeWidth="6"/><ellipse cy="-5" rx={i%2?23:36} ry="47" fill={i%2?'#708b64':'#486c58'}/></g>)}</g>}
    <path d="M0 484q210-35 387-8t413-19v43H0" fill="#72866a"/>
    <rect width="800" height="500" fill={`url(#grain-${hero?'hero':scene})`}/>
    {hero&&<g fill="#284f47" fontFamily="Georgia,serif"><text x="33" y="53" fontSize="16" letterSpacing="3">A CITY OF MANY CHAPTERS</text><text x="655" y="472" fontSize="16">서울 · SEOUL</text></g>}
  </svg>
}
