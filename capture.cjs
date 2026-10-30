const {chromium}=require('/Users/anubhav/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:'/private/tmp/eventyay-6725-media/recordings',size:{width:1440,height:1000}}});
 const page=await context.newPage();const results=[];
 await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8825/')?r.continue():r.abort());
 for(const name of ['start','dashboard'])for(const width of [1440,390])for(const lang of ['en','ar']){
  await page.setViewportSize({width,height:1000});
  await page.goto(`http://127.0.0.1:8825/${name}-${lang}.html`,{waitUntil:'networkidle'});
  await page.waitForTimeout(700);
  const direction=await page.locator('html').getAttribute('dir');if(lang==='ar'&&direction!=='rtl')throw Error('Missing RTL');
  if(!await page.getByText('Open Source Community Summit',{exact:true}).count())throw Error('Missing upcoming event');
  await page.screenshot({path:`/private/tmp/eventyay-6725-media/${name}-${lang}-${width}.png`,fullPage:true});
  await page.waitForTimeout(1200);
  await page.mouse.wheel(0,width===390?600:350);await page.waitForTimeout(1400);
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(400);
  await page.locator('#language-dropdown > summary').click();await page.waitForTimeout(1000);
  const menu=await page.locator('#language-dropdown > .dropdown-content').boundingBox();
  if(menu&&(menu.x< -1||menu.x+menu.width>width+1))throw Error('Language dropdown overflow '+JSON.stringify({name,width,lang,menu}));
  await page.locator('#language-dropdown > summary').click();
  await page.locator('#sidebar-toggle').click();await page.waitForTimeout(900);
  if(name==='start'){
   const drawer=await page.locator('.startpage-sidebar').boundingBox();
   if(!drawer || (lang==='ar'?Math.abs(drawer.x+drawer.width-width)>1:Math.abs(drawer.x)>1))throw Error('Incorrect drawer edge '+JSON.stringify({lang,width,drawer}));
  }
  await page.screenshot({path:`/private/tmp/eventyay-6725-media/${name}-${lang}-${width}-drawer.png`});
  await page.locator('#sidebar-toggle').click();await page.waitForTimeout(500);
  if(name==='start'){
   const drawer=await page.locator('.startpage-sidebar').boundingBox();
   if(drawer && (lang==='ar'?drawer.x<width-1:drawer.x+drawer.width>1))throw Error('Drawer did not close');
  }
  results.push({name,width,lang,direction,menu});
 }
 fs.writeFileSync('/private/tmp/eventyay-6725-media/checks.json',JSON.stringify(results,null,2));
 const video=page.video();await context.close();await video.saveAs('/private/tmp/eventyay-6725-media/startpage-ltr-rtl.webm');await browser.close();console.log('8 captures completed');
})();
