const toggle=document.querySelector('.menu-toggle');
const panel=document.querySelector('.menu-panel');
const main=document.querySelector('main');
const footer=document.querySelector('.site-footer');
function setMenu(open){toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'CLOSE':'MENU';panel.hidden=!open;document.body.classList.toggle('menu-open',open);main.inert=open;footer.inert=open;if(open)panel.querySelector('a').focus();else toggle.focus()}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(panel.hidden)return;if(event.key==='Escape')setMenu(false);if(event.key==='Tab'){const items=[toggle,...panel.querySelectorAll('a')];const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});

const stage=document.querySelector('.ring-stage');
const ring=document.querySelector('.project-ring');
const motion=document.querySelector('.motion-toggle');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let rotation=22,paused=reduce.matches,visible=true,dragging=false,lastX=0,lastTime=0,frame=0;
motion.hidden=false;
function draw(){ring.style.transform=`rotateX(-13deg) rotateY(${rotation}deg)`}
function syncMotion(){motion.querySelector('span').textContent=paused?'Resume rotation':'Pause rotation';motion.querySelector('img').src=`images/icons/${paused?'play':'pause'}.svg`;motion.setAttribute('aria-label',paused?'Resume project rotation':'Pause project rotation')}
function tick(time){frame=0;if(lastTime&&!dragging)rotation+=(time-lastTime)*.006;lastTime=time;draw();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
function schedule(){lastTime=0;if(frame)cancelAnimationFrame(frame);frame=0;if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
motion.addEventListener('click',()=>{paused=!paused;syncMotion();schedule()});
reduce.addEventListener('change',e=>{paused=e.matches;syncMotion();schedule()});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()}).observe(stage);
document.addEventListener('visibilitychange',schedule);
stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;lastX=e.clientX;stage.setPointerCapture(e.pointerId)});
stage.addEventListener('pointermove',e=>{if(!dragging)return;rotation+=(e.clientX-lastX)*.25;lastX=e.clientX;draw()});
function stopDrag(){dragging=false;lastTime=0}stage.addEventListener('pointerup',stopDrag);stage.addEventListener('pointercancel',stopDrag);
stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();rotation+=e.key==='ArrowLeft'?-15:15;draw()}if(e.code==='Space'){e.preventDefault();motion.click()}});
syncMotion();schedule();

const form=document.querySelector('.contact-form');
const status=document.querySelector('.form-status');
form.addEventListener('submit',async event=>{event.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='Sending your message…';try{if(!window.emailjs)throw new Error('Email service unavailable');emailjs.init({publicKey:'S6zdvGh3hT8IDy7AL'});await emailjs.send('service_e8g25y2','template_b50419p',{from_name:form.elements.name.value.trim(),from_email:form.elements.email.value.trim(),message:form.elements.message.value.trim(),to_email:'devendrarajsingh2005@gmail.com'});status.textContent='Message sent. Thank you for getting in touch.';form.reset()}catch{status.textContent='Your message could not be sent. Please email devendrarajsingh2005@gmail.com directly.'}finally{button.disabled=false}});
