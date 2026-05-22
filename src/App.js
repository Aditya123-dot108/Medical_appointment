import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5000';

/* ─── DATA ─── */
const doctors = [
  { name:'Dr. Sharma', specialty:'General Physician', rating:4.9, patients:1200, exp:15, fee:500, available:true, color:'#FF6B6B', icon:'🩺', lang:['English','Hindi','Kannada'], bio:'15+ years in general medicine and preventive care.' },
  { name:'Dr. Patel',  specialty:'Cardiologist',      rating:4.8, patients:980,  exp:18, fee:800, available:true, color:'#4ECDC4', icon:'❤️', lang:['English','Gujarati'],         bio:'Award-winning cardiologist specializing in heart disease prevention.' },
  { name:'Dr. Khan',   specialty:'Dermatologist',     rating:4.7, patients:1450, exp:12, fee:600, available:false,color:'#45B7D1', icon:'🔬', lang:['English','Urdu','Hindi'],       bio:'Expert in skin disorders, cosmetic dermatology and laser treatments.' },
  { name:'Dr. Reddy',  specialty:'Orthopedic',        rating:4.9, patients:870,  exp:20, fee:900, available:true, color:'#96CEB4', icon:'🦴', lang:['English','Telugu'],             bio:'Specialist in joint replacement surgery and sports injuries.' },
  { name:'Dr. Mehta',  specialty:'Neurologist',       rating:4.6, patients:760,  exp:14, fee:1000,available:true, color:'#FFEAA7', icon:'🧠', lang:['English','Hindi'],             bio:'Expert in neurological disorders and stroke rehabilitation.' },
  { name:'Dr. Singh',  specialty:'Pediatrician',      rating:4.9, patients:2100, exp:16, fee:500, available:true, color:'#DDA0DD', icon:'👶', lang:['English','Punjabi','Hindi'],    bio:'Dedicated child healthcare with focus on development.' },
];

const symptoms = ['Fever','Headache','Chest Pain','Back Pain','Skin Rash','Cough','Fatigue','Joint Pain','Nausea','Dizziness','Shortness of Breath','Sore Throat'];
const timeSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const languages = ['English','हिंदी','ಕನ್ನಡ','தமிழ்','Español','Français','العربية','中文'];
const healthTips = [
  { tip:'Drink 8 glasses of water daily to stay hydrated', icon:'💧', color:'#45B7D1' },
  { tip:'Walk at least 30 minutes every day for heart health', icon:'🚶', color:'#96CEB4' },
  { tip:'Sleep 7–8 hours every night for better immunity', icon:'😴', color:'#DDA0DD' },
  { tip:'Eat 5 portions of fruits and vegetables daily', icon:'🥗', color:'#4ECDC4' },
  { tip:'Regular health checkups can detect disease early', icon:'🏥', color:'#FF6B6B' },
];
const testimonials = [
  { name:'Aditya K.', city:'Bengaluru', text:'MediBook saved my time! Booked a cardiologist in 2 minutes!', rating:5, av:'AK' },
  { name:'Priya M.',  city:'Mumbai',    text:'The doctor profiles are so detailed. Found the right specialist easily!', rating:5, av:'PM' },
  { name:'Rahul S.',  city:'Delhi',     text:'Best medical app I have ever used. Simple, fast and reliable!', rating:5, av:'RS' },
  { name:'Sarah J.',  city:'London',    text:'Used this while travelling in India. Incredibly smooth experience!', rating:5, av:'SJ' },
];
const emergencyNums = [
  {flag:'🇮🇳',country:'India',num:'112 / 108'},
  {flag:'🇺🇸',country:'USA',num:'911'},
  {flag:'🇬🇧',country:'UK',num:'999'},
  {flag:'🇪🇺',country:'Europe',num:'112'},
  {flag:'🇦🇺',country:'Australia',num:'000'},
  {flag:'🇨🇦',country:'Canada',num:'911'},
];

/* ─── STYLES ─── */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&family=Fraunces:wght@700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Plus Jakarta Sans',sans-serif;}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.2);opacity:.7}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes pop{0%{transform:scale(.5);opacity:0}80%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes slideR{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
@keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
.app{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:linear-gradient(-45deg,#0f0c29,#1a0533,#0c1445,#0a1628);background-size:400% 400%;animation:gradShift 18s ease infinite;padding:16px;}
.glass{background:rgba(255,255,255,.07);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.13);border-radius:24px;}
.glass-w{background:rgba(255,255,255,.97);border-radius:24px;}
.fade{animation:fadeUp .55s ease forwards;}
.float{animation:float 4s ease-in-out infinite;}
.pdot{animation:pulse 2s ease-in-out infinite;}
.hbeat{animation:heartbeat 2.5s ease-in-out infinite;}
input,select,textarea{font-family:'Plus Jakarta Sans',sans-serif!important;transition:all .3s!important;}
input:focus,select:focus,textarea:focus{outline:none!important;border-color:#FF6B6B!important;box-shadow:0 0 0 4px rgba(255,107,107,.15)!important;}
.tab-btn{transition:all .3s cubic-bezier(.34,1.56,.64,1);}
.tab-btn:hover{transform:translateY(-3px);}
.doc-card{transition:all .35s cubic-bezier(.34,1.56,.64,1);}
.doc-card:hover{transform:translateY(-7px) scale(1.02);}
.btn-p{transition:all .3s ease;}
.btn-p:hover{transform:translateY(-3px);filter:brightness(1.1);}
.btn-p:active{transform:scale(.97);}
.ac{transition:all .3s ease;}
.ac:hover{transform:translateX(4px);}
.tip-c{transition:all .3s ease;}
.tip-c:hover{transform:scale(1.02);}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-thumb{background:rgba(255,107,107,.4);border-radius:3px;}
`;

/* ─── BMI COMPONENT ─── */
function BMICalc() {
  const [h,setH]=useState('');
  const [w,setW]=useState('');
  const bmi=h&&w?(w/((h/100)**2)).toFixed(1):null;
  const cat=b=>b<18.5?{l:'Underweight 🔵',c:'#45B7D1'}:b<25?{l:'Normal ✅',c:'#96CEB4'}:b<30?{l:'Overweight 🟡',c:'#FFEAA7'}:{l:'Obese 🔴',c:'#FF6B6B'};
  const res=bmi?cat(parseFloat(bmi)):null;
  const inp={width:'100%',padding:'12px 15px',border:'2px solid #e8e8e8',borderRadius:'12px',fontSize:'0.95rem',background:'#fafafa'};
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'14px'}}>
        <div>
          <label style={{display:'block',fontWeight:700,color:'#555',marginBottom:'7px',fontSize:'0.85rem'}}>📏 Height (cm)</label>
          <input type="number" placeholder="e.g. 170" value={h} onChange={e=>setH(e.target.value)} style={inp}/>
        </div>
        <div>
          <label style={{display:'block',fontWeight:700,color:'#555',marginBottom:'7px',fontSize:'0.85rem'}}>⚖️ Weight (kg)</label>
          <input type="number" placeholder="e.g. 65" value={w} onChange={e=>setW(e.target.value)} style={inp}/>
        </div>
      </div>
      {bmi&&(
        <div style={{background:'white',borderRadius:'16px',padding:'20px',textAlign:'center',border:`2px solid ${res.c}44`,animation:'pop .4s ease'}}>
          <div style={{fontSize:'3rem',fontWeight:900,color:res.c,lineHeight:1}}>{bmi}</div>
          <div style={{fontSize:'0.82rem',color:'#888',marginTop:'4px'}}>Your BMI Score</div>
          <div style={{marginTop:'10px',padding:'6px 20px',background:`${res.c}20`,color:res.c,borderRadius:'50px',display:'inline-block',fontWeight:800,fontSize:'0.85rem'}}>{res.l}</div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [tab,setTab]=useState('home');
  const [apts,setApts]=useState([]);
  const [form,setForm]=useState({patientName:'',doctorName:'',date:'',time:'',problem:'',phone:'',age:'',gender:'',emergency:false});
  const [selDoc,setSelDoc]=useState(null);
  const [selSymps,setSelSymps]=useState([]);
  const [selSlot,setSelSlot]=useState('');
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const [search,setSearch]=useState('');
  const [ok,setOk]=useState(false);
  const [connecting,setConnecting]=useState(true);
  const [tipIdx,setTipIdx]=useState(0);
  const [activeLang,setActiveLang]=useState('English');
  const [showEmer,setShowEmer]=useState(false);
  const [clock,setClock]=useState(new Date());
  const [docFilter,setDocFilter]=useState('all');

  useEffect(()=>{const s=document.createElement('style');s.textContent=STYLE;document.head.appendChild(s);return()=>document.head.removeChild(s);},[]);
  useEffect(()=>{const t=setInterval(()=>setClock(new Date()),1000);return()=>clearInterval(t);},[]);
  useEffect(()=>{const t=setInterval(()=>setTipIdx(i=>(i+1)%healthTips.length),4000);return()=>clearInterval(t);},[]);
  useEffect(()=>{fetch(`${API}/test`).then(r=>r.json()).then(()=>{setOk(true);setConnecting(false);fetchAll();}).catch(()=>{setConnecting(false);setOk(false);});},[]);

  const fetchAll=async()=>{try{const r=await fetch(`${API}/api/appointments`);setApts(await r.json());}catch(e){}};
  const fc=e=>setForm({...form,[e.target.name]:e.target.value});
  const toggleSymp=s=>{const u=selSymps.includes(s)?selSymps.filter(x=>x!==s):[...selSymps,s];setSelSymps(u);setForm({...form,problem:u.join(', ')});};
  const pickDoc=d=>{setSelDoc(d);setForm({...form,doctorName:`${d.name} - ${d.specialty}`});};
  const pickSlot=s=>{setSelSlot(s);setForm({...form,time:s});};

  const submit=async()=>{
    if(!form.patientName||!form.doctorName||!form.date||!form.time||!form.problem){alert('Please fill all required fields!');return;}
    setLoading(true);
    try{
      const r=await fetch(`${API}/api/appointments`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      if(r.ok){
        setSuccess(true);fetchAll();
        setTimeout(()=>{setSuccess(false);setTab('appointments');setForm({patientName:'',doctorName:'',date:'',time:'',problem:'',phone:'',age:'',gender:'',emergency:false});setSelDoc(null);setSelSymps([]);setSelSlot('');},3000);
      }
    }catch(e){alert('Connection error!');}
    setLoading(false);
  };

  const cancelApt=async id=>{if(window.confirm('Cancel this appointment?')){await fetch(`${API}/api/appointments/${id}`,{method:'DELETE'});fetchAll();}};

  const today=new Date().toISOString().split('T')[0];
  const filtered=apts.filter(a=>a.patientName?.toLowerCase().includes(search.toLowerCase())||a.doctorName?.toLowerCase().includes(search.toLowerCase()));
  const todayApts=apts.filter(a=>a.date===today).length;
  const availDocs=doctors.filter(d=>d.available).length;

  const label={display:'block',fontWeight:700,color:'#333',marginBottom:'8px',fontSize:'0.87rem'};
  const inp={width:'100%',padding:'13px 16px',border:'2px solid #e8e8e8',borderRadius:'14px',fontSize:'0.95rem',background:'#fafafa',color:'#1a1a2e'};

  /* LOADING */
  if(connecting) return(
    <div className="app" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <div style={{textAlign:'center',color:'white'}}>
        <div style={{fontSize:'5rem',animation:'spin 2s linear infinite',display:'inline-block'}}>⚕️</div>
        <h2 style={{fontFamily:"'Fraunces',serif",marginTop:'20px',fontSize:'2rem'}}>Launching MediBook...</h2>
        <p style={{opacity:.6,marginTop:'8px',letterSpacing:'1px'}}>Connecting to global servers</p>
      </div>
    </div>
  );

  /* NO BACKEND */
  if(!ok) return(
    <div className="app" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <div className="glass" style={{padding:'50px',textAlign:'center',maxWidth:'440px',color:'white'}}>
        <div style={{fontSize:'4rem',marginBottom:'20px'}}>🔌</div>
        <h2 style={{fontFamily:"'Fraunces',serif",marginBottom:'12px',fontSize:'1.9rem'}}>Backend Offline</h2>
        <p style={{opacity:.7,marginBottom:'25px',lineHeight:1.8}}>Start your backend server first, then retry.</p>
        <div style={{background:'rgba(0,0,0,.4)',borderRadius:'14px',padding:'18px',textAlign:'left',fontFamily:'monospace',fontSize:'0.85rem',marginBottom:'25px',lineHeight:2.2}}>
          <div style={{color:'#4ECDC4'}}>$ cd .../backend</div>
          <div style={{color:'#FF6B6B'}}>$ npm run dev</div>
          <div style={{color:'rgba(255,255,255,.4)'}}>✅ Server running on :5000</div>
        </div>
        <button onClick={()=>window.location.reload()} className="btn-p" style={{padding:'14px 40px',background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'white',border:'none',borderRadius:'50px',fontSize:'1rem',fontWeight:800,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>🔄 Retry</button>
      </div>
    </div>
  );

  const tabs=[{id:'home',icon:'🏠',l:'Home'},{id:'book',icon:'📅',l:'Book'},{id:'appointments',icon:'📋',l:'Appointments'},{id:'doctors',icon:'👨‍⚕️',l:'Doctors'},{id:'health',icon:'💚',l:'Health Hub'}];

  return(
    <div className="app">
      <div style={{maxWidth:'960px',margin:'0 auto'}}>

        {/* EMERGENCY BANNER */}
        {showEmer&&(
          <div style={{background:'linear-gradient(135deg,#FF6B6B,#c0392b)',borderRadius:'20px',padding:'18px 24px',marginBottom:'18px',display:'flex',alignItems:'center',justifyContent:'space-between',animation:'pop .4s ease',flexWrap:'wrap',gap:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px',color:'white'}}>
              <span className="hbeat" style={{fontSize:'2rem'}}>🚨</span>
              <div>
                <div style={{fontWeight:800,fontSize:'1.05rem'}}>Medical Emergency? Call Now!</div>
                <div style={{opacity:.85,fontSize:'0.85rem'}}>National Emergency: 112 · Ambulance: 108 · Available 24/7</div>
              </div>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <a href="tel:108" style={{padding:'10px 22px',background:'white',color:'#FF6B6B',borderRadius:'50px',fontWeight:800,textDecoration:'none',fontSize:'0.88rem'}}>📞 Call 108</a>
              <button onClick={()=>setShowEmer(false)} style={{padding:'10px 15px',background:'rgba(255,255,255,.15)',color:'white',border:'none',borderRadius:'50px',cursor:'pointer',fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>✕</button>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="fade" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'14px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div className="hbeat" style={{fontSize:'2.8rem'}}>🏥</div>
            <div>
              <h1 style={{fontFamily:"'Fraunces',serif",fontSize:'2.2rem',fontWeight:900,background:'linear-gradient(135deg,#FF6B6B,#4ECDC4,#45B7D1)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1}}>MediBook</h1>
              <p style={{color:'rgba(255,255,255,.4)',fontSize:'0.75rem',letterSpacing:'2px',textTransform:'uppercase',marginTop:'2px'}}>Global Health Platform</p>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
            <div style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'50px',padding:'7px 15px',color:'rgba(255,255,255,.65)',fontSize:'0.8rem'}}>🕐 {clock.toLocaleTimeString()}</div>
            <div style={{background:'rgba(78,205,196,.15)',border:'1px solid rgba(78,205,196,.3)',borderRadius:'50px',padding:'7px 15px',color:'#4ECDC4',fontSize:'0.8rem',display:'flex',alignItems:'center',gap:'6px'}}>
              <span className="pdot" style={{width:'7px',height:'7px',background:'#4ECDC4',borderRadius:'50%',display:'inline-block'}}></span>
              {availDocs} Online
            </div>
            <button onClick={()=>setShowEmer(true)} style={{padding:'8px 18px',background:'linear-gradient(135deg,#FF6B6B,#c0392b)',color:'white',border:'none',borderRadius:'50px',fontWeight:800,cursor:'pointer',fontSize:'0.8rem',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>🚨 Emergency</button>
          </div>
        </div>

        {/* STATS */}
        <div className="fade" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'18px'}}>
          {[
            {icon:'📊',val:apts.length,lbl:'Total Booked',col:'#FF6B6B'},
            {icon:'📅',val:todayApts,lbl:"Today's",col:'#4ECDC4'},
            {icon:'👨‍⚕️',val:availDocs,lbl:'Doctors Live',col:'#45B7D1'},
            {icon:'🌍',val:'24/7',lbl:'Global Support',col:'#DDA0DD'},
          ].map((s,i)=>(
            <div key={i} className="glass" style={{padding:'18px',textAlign:'center'}}>
              <div style={{fontSize:'1.6rem',marginBottom:'5px'}}>{s.icon}</div>
              <div style={{fontSize:'1.8rem',fontWeight:800,color:s.col,lineHeight:1}}>{s.val}</div>
              <div style={{color:'rgba(255,255,255,.45)',fontSize:'0.7rem',marginTop:'4px',fontWeight:600}}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* LANGUAGE BAR */}
        <div className="glass fade" style={{padding:'12px 18px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
          <span style={{color:'rgba(255,255,255,.4)',fontSize:'0.75rem',fontWeight:700,letterSpacing:'1px',flexShrink:0}}>🌐 LANGUAGE:</span>
          <div style={{display:'flex',gap:'7px',flexWrap:'wrap'}}>
            {languages.map(l=>(
              <button key={l} onClick={()=>setActiveLang(l)} style={{padding:'5px 13px',border:'none',borderRadius:'50px',fontSize:'0.78rem',fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",background:activeLang===l?'linear-gradient(135deg,#FF6B6B,#FF8E53)':'rgba(255,255,255,.08)',color:activeLang===l?'white':'rgba(255,255,255,.55)',transition:'all .2s'}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* HEALTH TIP TICKER */}
        <div className="glass fade" style={{padding:'12px 20px',marginBottom:'18px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'1.4rem',flexShrink:0}}>{healthTips[tipIdx].icon}</span>
          <div style={{flex:1}}>
            <span style={{color:'rgba(255,255,255,.4)',fontSize:'0.73rem',fontWeight:700}}>💡 HEALTH TIP: </span>
            <span style={{color:'rgba(255,255,255,.82)',fontSize:'0.86rem',fontWeight:500}}>{healthTips[tipIdx].tip}</span>
          </div>
          <div style={{display:'flex',gap:'4px',flexShrink:0}}>
            {healthTips.map((_,i)=><div key={i} style={{width:i===tipIdx?'16px':'6px',height:'6px',borderRadius:'3px',background:i===tipIdx?healthTips[tipIdx].color:'rgba(255,255,255,.2)',transition:'all .3s'}}></div>)}
          </div>
        </div>

        {/* NAV TABS */}
        <div className="glass" style={{display:'flex',padding:'7px',marginBottom:'22px',gap:'5px'}}>
          {tabs.map(t=>(
            <button key={t.id} className="tab-btn" onClick={()=>setTab(t.id)} style={{flex:1,padding:'12px 5px',border:'none',borderRadius:'16px',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:'0.78rem',background:tab===t.id?'linear-gradient(135deg,#FF6B6B,#FF8E53)':'transparent',color:tab===t.id?'white':'rgba(255,255,255,.5)',boxShadow:tab===t.id?'0 6px 20px rgba(255,107,107,.35)':'none'}}>
              <div style={{fontSize:'1rem',marginBottom:'2px'}}>{t.icon}</div>
              {t.l}
            </button>
          ))}
        </div>

        {/* ══════ HOME ══════ */}
        {tab==='home'&&(
          <div className="fade">
            {/* HERO */}
            <div style={{background:'linear-gradient(135deg,rgba(255,107,107,.22),rgba(78,205,196,.22))',border:'1px solid rgba(255,255,255,.14)',borderRadius:'28px',padding:'42px 38px',marginBottom:'18px',color:'white',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:'-40px',right:'-40px',fontSize:'11rem',opacity:.05}}>🏥</div>
              <div style={{maxWidth:'560px',position:'relative'}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'rgba(78,205,196,.18)',border:'1px solid rgba(78,205,196,.32)',borderRadius:'50px',padding:'5px 15px',marginBottom:'16px',fontSize:'0.78rem',color:'#4ECDC4',fontWeight:700}}>
                  <span className="pdot" style={{width:'7px',height:'7px',background:'#4ECDC4',borderRadius:'50%',display:'inline-block'}}></span>
                  Trusted by 50,000+ patients worldwide
                </div>
                <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'2.7rem',fontWeight:900,lineHeight:1.1,marginBottom:'14px'}}>
                  Your Health,<br/>
                  <span style={{background:'linear-gradient(135deg,#FF6B6B,#FFEAA7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Our Priority.</span>
                </h2>
                <p style={{opacity:.8,fontSize:'0.97rem',lineHeight:1.8,marginBottom:'26px'}}>Book appointments with world-class specialists in seconds. Available in 8 languages, across all time zones, 24/7.</p>
                <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                  <button onClick={()=>setTab('book')} className="btn-p" style={{padding:'14px 32px',background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'white',border:'none',borderRadius:'50px',fontSize:'0.97rem',fontWeight:800,cursor:'pointer',boxShadow:'0 10px 30px rgba(255,107,107,.4)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📅 Book Now — Free</button>
                  <button onClick={()=>setTab('doctors')} style={{padding:'14px 32px',background:'rgba(255,255,255,.1)',color:'white',border:'1px solid rgba(255,255,255,.22)',borderRadius:'50px',fontSize:'0.97rem',fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>👨‍⚕️ Our Doctors</button>
                </div>
              </div>
            </div>

            {/* FEATURES */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'13px',marginBottom:'18px'}}>
              {[
                {icon:'⚡',title:'60-Second Booking',desc:'Fastest appointment booking in the world',col:'#FF6B6B'},
                {icon:'🌍',title:'8 Languages',desc:'Book in your native language globally',col:'#4ECDC4'},
                {icon:'🔒',title:'100% Secure',desc:'HIPAA-compliant data encryption',col:'#45B7D1'},
                {icon:'📱',title:'Mobile First',desc:'Optimized for all devices worldwide',col:'#96CEB4'},
                {icon:'🤖',title:'Smart Matching',desc:'AI-powered doctor recommendations',col:'#DDA0DD'},
                {icon:'📊',title:'Live Analytics',desc:'Real-time stats & health insights',col:'#FFEAA7'},
              ].map((f,i)=>(
                <div key={i} className="glass" style={{padding:'22px'}}>
                  <div style={{fontSize:'1.9rem',marginBottom:'9px'}}>{f.icon}</div>
                  <div style={{color:f.col,fontWeight:800,fontSize:'0.88rem',marginBottom:'5px'}}>{f.title}</div>
                  <div style={{color:'rgba(255,255,255,.52)',fontSize:'0.78rem',lineHeight:1.65}}>{f.desc}</div>
                </div>
              ))}
            </div>

            {/* TESTIMONIALS */}
            <div className="glass" style={{padding:'26px',marginBottom:'18px'}}>
              <h3 style={{color:'white',fontFamily:"'Fraunces',serif",fontSize:'1.25rem',fontWeight:900,marginBottom:'18px'}}>⭐ What Patients Say</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'}}>
                {testimonials.map((t,i)=>(
                  <div key={i} style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.09)',borderRadius:'18px',padding:'18px'}}>
                    <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'10px'}}>
                      <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#FF6B6B,#4ECDC4)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'0.82rem',color:'white',flexShrink:0}}>{t.av}</div>
                      <div>
                        <div style={{color:'white',fontWeight:700,fontSize:'0.87rem'}}>{t.name}</div>
                        <div style={{color:'rgba(255,255,255,.42)',fontSize:'0.75rem'}}>📍 {t.city}</div>
                      </div>
                      <div style={{marginLeft:'auto',fontSize:'0.8rem'}}>{'⭐'.repeat(t.rating)}</div>
                    </div>
                    <p style={{color:'rgba(255,255,255,.68)',fontSize:'0.83rem',lineHeight:1.7,fontStyle:'italic'}}>"{t.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK DOCTOR STRIP */}
            <div className="glass" style={{padding:'26px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
                <h3 style={{color:'white',fontFamily:"'Fraunces',serif",fontSize:'1.2rem',fontWeight:900}}>🏆 Top Specialists</h3>
                <button onClick={()=>setTab('doctors')} style={{color:'#4ECDC4',background:'none',border:'none',cursor:'pointer',fontWeight:700,fontSize:'0.83rem',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>View All →</button>
              </div>
              <div style={{display:'flex',gap:'11px',overflowX:'auto',paddingBottom:'6px'}}>
                {doctors.map((d,i)=>(
                  <div key={i} className="doc-card glass" onClick={()=>{pickDoc(d);setTab('book');}} style={{minWidth:'148px',padding:'18px',textAlign:'center',border:`1px solid ${d.color}30`,cursor:'pointer',flexShrink:0}}>
                    <div style={{fontSize:'2.3rem',marginBottom:'7px'}}>{d.icon}</div>
                    <div style={{color:'white',fontWeight:700,fontSize:'0.82rem',marginBottom:'2px'}}>{d.name}</div>
                    <div style={{color:d.color,fontSize:'0.72rem',fontWeight:700,marginBottom:'7px'}}>{d.specialty}</div>
                    <div style={{fontSize:'0.75rem',color:'#FFEAA7'}}>⭐ {d.rating}</div>
                    <div style={{marginTop:'5px',fontSize:'0.7rem',color:d.available?'#96CEB4':'#FF6B6B',fontWeight:700}}>{d.available?'● Available':'● Busy'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ BOOK ══════ */}
        {tab==='book'&&(
          <div className="fade">
            {success?(
              <div style={{textAlign:'center',padding:'60px 20px',animation:'pop .5s ease'}}>
                <div className="float" style={{fontSize:'6rem',marginBottom:'18px'}}>🎉</div>
                <h2 style={{fontFamily:"'Fraunces',serif",color:'white',fontSize:'2.2rem',marginBottom:'10px'}}>Appointment Confirmed!</h2>
                <p style={{color:'rgba(255,255,255,.7)',fontSize:'0.97rem',marginBottom:'6px'}}>Your appointment has been booked successfully.</p>
                <p style={{color:'#4ECDC4',fontSize:'0.88rem'}}>Redirecting to your appointments...</p>
              </div>
            ):(
              <div className="glass-w" style={{padding:'36px'}}>
                <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'1.55rem',fontWeight:900,color:'#1a1a2e',marginBottom:'6px'}}>📅 Book Appointment</h2>
                <p style={{color:'#888',marginBottom:'26px',fontSize:'0.9rem'}}>Fill your details to schedule a consultation</p>

                {/* DOCTOR GRID */}
                <div style={{marginBottom:'26px'}}>
                  <label style={label}>🩺 Choose Your Doctor *</label>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
                    {doctors.map((d,i)=>(
                      <div key={i} className="doc-card" onClick={()=>d.available&&pickDoc(d)} style={{border:`2px solid ${selDoc?.name===d.name?d.color:'#ebebeb'}`,borderRadius:'18px',padding:'15px',textAlign:'center',background:selDoc?.name===d.name?`${d.color}12`:'white',opacity:d.available?1:.45,cursor:d.available?'pointer':'not-allowed',position:'relative'}}>
                        {selDoc?.name===d.name&&<div style={{position:'absolute',top:'9px',right:'9px',background:d.color,color:'white',borderRadius:'50%',width:'20px',height:'20px',fontSize:'0.68rem',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800}}>✓</div>}
                        <div style={{fontSize:'2rem',marginBottom:'5px'}}>{d.icon}</div>
                        <div style={{fontWeight:800,fontSize:'0.8rem',color:'#1a1a2e',marginBottom:'2px'}}>{d.name}</div>
                        <div style={{fontSize:'0.7rem',color:d.color,fontWeight:700,marginBottom:'4px'}}>{d.specialty}</div>
                        <div style={{fontSize:'0.7rem',color:'#888'}}>⭐{d.rating} · ₹{d.fee}</div>
                        {!d.available&&<div style={{fontSize:'0.66rem',color:'#FF6B6B',marginTop:'3px',fontWeight:700}}>Unavailable</div>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PATIENT DETAILS */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'13px',marginBottom:'16px'}}>
                  {[{n:'patientName',ph:'Enter your full name',lbl:'👤 Full Name *'},{n:'phone',ph:'+91 or country code',lbl:'📞 Phone Number'}].map(f=>(
                    <div key={f.n}>
                      <label style={label}>{f.lbl}</label>
                      <input name={f.n} placeholder={f.ph} value={form[f.n]} onChange={fc} style={inp}/>
                    </div>
                  ))}
                  <div>
                    <label style={label}>🎂 Age</label>
                    <input name="age" placeholder="Your age" value={form.age} onChange={fc} type="number" style={inp}/>
                  </div>
                  <div>
                    <label style={label}>⚧ Gender</label>
                    <select name="gender" value={form.gender} onChange={fc} style={inp}>
                      <option value="">Select gender</option>
                      <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* DATE */}
                <div style={{marginBottom:'16px'}}>
                  <label style={label}>📅 Appointment Date *</label>
                  <input name="date" type="date" value={form.date} onChange={fc} min={today} style={inp}/>
                </div>

                {/* TIME SLOTS */}
                <div style={{marginBottom:'18px'}}>
                  <label style={label}>⏰ Select Time Slot *</label>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'7px'}}>
                    {timeSlots.map(s=>(
                      <button key={s} onClick={()=>pickSlot(s)} style={{padding:'9px 15px',border:`2px solid ${selSlot===s?'#FF6B6B':'#e8e8e8'}`,borderRadius:'10px',background:selSlot===s?'linear-gradient(135deg,#FF6B6B,#FF8E53)':'white',color:selSlot===s?'white':'#555',fontWeight:700,fontSize:'0.8rem',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:selSlot===s?'0 4px 14px rgba(255,107,107,.3)':'none',transition:'all .2s'}}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SYMPTOMS */}
                <div style={{marginBottom:'18px'}}>
                  <label style={label}>💊 Symptoms * (tap to choose)</label>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'7px',marginBottom:'11px'}}>
                    {symptoms.map(s=>(
                      <div key={s} onClick={()=>toggleSymp(s)} style={{padding:'7px 15px',borderRadius:'50px',fontSize:'0.8rem',fontWeight:700,cursor:'pointer',background:selSymps.includes(s)?'linear-gradient(135deg,#FF6B6B,#FF8E53)':'#f2f2f2',color:selSymps.includes(s)?'white':'#666',border:`2px solid ${selSymps.includes(s)?'transparent':'#e8e8e8'}`,boxShadow:selSymps.includes(s)?'0 4px 12px rgba(255,107,107,.28)':'none',transition:'all .2s'}}>
                        {s}
                      </div>
                    ))}
                  </div>
                  <input name="problem" placeholder="Or describe your symptoms in detail..." value={form.problem} onChange={fc} style={inp}/>
                </div>

                {/* EMERGENCY TOGGLE */}
                <div style={{display:'flex',alignItems:'center',gap:'11px',marginBottom:'22px',padding:'15px',background:'#fff5f5',borderRadius:'14px',border:'1px solid #ffd5d5'}}>
                  <input type="checkbox" id="emer" checked={form.emergency} onChange={e=>setForm({...form,emergency:e.target.checked})} style={{width:'18px',height:'18px',cursor:'pointer',accentColor:'#FF6B6B'}}/>
                  <label htmlFor="emer" style={{color:'#c0392b',fontWeight:700,fontSize:'0.88rem',cursor:'pointer'}}>🚨 This is an emergency / urgent appointment needed</label>
                </div>

                {/* SUBMIT */}
                <button className="btn-p" onClick={submit} disabled={loading} style={{width:'100%',padding:'17px',border:'none',borderRadius:'16px',fontSize:'1.05rem',fontWeight:800,cursor:loading?'not-allowed':'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",background:loading?'#ccc':'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'white',boxShadow:loading?'none':'0 10px 35px rgba(255,107,107,.4)',letterSpacing:'.3px'}}>
                  {loading?'⏳ Booking your appointment...':'✅ Confirm Appointment — Free of Charge'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════ APPOINTMENTS ══════ */}
        {tab==='appointments'&&(
          <div className="fade">
            <div className="glass-w" style={{padding:'34px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'22px',flexWrap:'wrap',gap:'13px'}}>
                <div>
                  <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'1.55rem',fontWeight:900,color:'#1a1a2e',marginBottom:'4px'}}>📋 My Appointments</h2>
                  <p style={{color:'#888',fontSize:'0.87rem'}}>{filtered.length} appointment(s) found</p>
                </div>
                <input placeholder="🔍 Search patient or doctor..." value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,width:'255px',padding:'11px 17px',borderRadius:'50px'}}/>
              </div>

              {filtered.length===0?(
                <div style={{textAlign:'center',padding:'55px 20px'}}>
                  <div className="float" style={{fontSize:'5rem',marginBottom:'18px'}}>📭</div>
                  <h3 style={{color:'#333',fontWeight:800,marginBottom:'10px',fontFamily:"'Fraunces',serif"}}>No Appointments Yet</h3>
                  <p style={{color:'#888',marginBottom:'24px'}}>Book your first appointment and take control of your health!</p>
                  <button onClick={()=>setTab('book')} style={{padding:'13px 32px',background:'linear-gradient(135deg,#FF6B6B,#FF8E53)',color:'white',border:'none',borderRadius:'50px',fontWeight:800,cursor:'pointer',fontSize:'0.97rem',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>📅 Book Now</button>
                </div>
              ):(
                <div style={{display:'flex',flexDirection:'column',gap:'13px'}}>
                  {filtered.map((a,i)=>{
                    const doc=doctors.find(d=>a.doctorName?.includes(d.name));
                    const col=doc?.color||'#FF6B6B';
                    return(
                      <div key={a._id} className="ac" style={{border:`2px solid ${col}22`,borderRadius:'22px',padding:'22px',background:`linear-gradient(135deg,${col}06,transparent)`,position:'relative',animation:'slideR .4s ease',animationDelay:`${i*.06}s`,animationFillMode:'both'}}>
                        {a.emergency&&<div style={{position:'absolute',top:'11px',left:'11px',background:'#FF6B6B',color:'white',padding:'3px 10px',borderRadius:'50px',fontSize:'0.7rem',fontWeight:800}}>🚨 URGENT</div>}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'10px',marginTop:a.emergency?'12px':'0'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'13px'}}>
                            <div style={{width:'52px',height:'52px',background:`${col}16`,border:`2px solid ${col}32`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.7rem',flexShrink:0}}>{doc?.icon||'🩺'}</div>
                            <div>
                              <div style={{display:'flex',gap:'6px',marginBottom:'4px',flexWrap:'wrap'}}>
                                <span style={{background:'linear-gradient(135deg,#00b09b,#96c93d)',color:'white',padding:'3px 11px',borderRadius:'50px',fontSize:'0.7rem',fontWeight:800}}>✅ Confirmed</span>
                                <span style={{background:`${col}16`,color:col,padding:'3px 11px',borderRadius:'50px',fontSize:'0.7rem',fontWeight:800}}>#{String(i+1).padStart(3,'0')}</span>
                              </div>
                              <h3 style={{color:'#1a1a2e',fontWeight:800,fontSize:'0.97rem',marginBottom:'2px'}}>👤 {a.patientName}</h3>
                              <p style={{color:col,fontWeight:700,fontSize:'0.83rem'}}>🩺 {a.doctorName}</p>
                            </div>
                          </div>
                          <button onClick={()=>cancelApt(a._id)} style={{padding:'9px 19px',background:'#FF6B6B',color:'white',border:'none',borderRadius:'12px',fontWeight:800,cursor:'pointer',fontSize:'0.8rem',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'all .3s'}}>✕ Cancel</button>
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'9px',marginTop:'16px'}}>
                          {[{icon:'📅',lbl:'Date',val:a.date},{icon:'⏰',lbl:'Time',val:a.time},{icon:'💊',lbl:'Problem',val:a.problem},{icon:'📞',lbl:'Phone',val:a.phone||'—'}].map((d,j)=>(
                            <div key={j} style={{background:'rgba(0,0,0,.04)',borderRadius:'11px',padding:'11px'}}>
                              <div style={{color:'#aaa',fontSize:'0.7rem',fontWeight:700,marginBottom:'3px'}}>{d.icon} {d.lbl}</div>
                              <div style={{color:'#333',fontWeight:700,fontSize:'0.82rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.val}</div>
                            </div>
                          ))}
                        </div>
                        {(a.age||a.gender)&&<div style={{marginTop:'10px',color:'#999',fontSize:'0.8rem'}}>🎂 Age: {a.age||'—'} · ⚧ {a.gender||'—'}</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════ DOCTORS ══════ */}
        {tab==='doctors'&&(
          <div className="fade">
            <div className="glass-w" style={{padding:'34px'}}>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'1.55rem',fontWeight:900,color:'#1a1a2e',marginBottom:'6px'}}>👨‍⚕️ Our Specialists</h2>
              <p style={{color:'#888',marginBottom:'22px',fontSize:'0.9rem'}}>World-class medical professionals at your service</p>
              <div style={{display:'flex',gap:'7px',marginBottom:'22px',flexWrap:'wrap'}}>
                {['all','available','General','Cardio','Derma','Ortho','Neuro','Pediatric'].map(f=>(
                  <button key={f} onClick={()=>setDocFilter(f)} style={{padding:'7px 15px',border:'none',borderRadius:'50px',fontSize:'0.78rem',fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",background:docFilter===f?'linear-gradient(135deg,#FF6B6B,#FF8E53)':'#f0f0f0',color:docFilter===f?'white':'#555',transition:'all .2s'}}>
                    {f.charAt(0).toUpperCase()+f.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
                {doctors.filter(d=>docFilter==='all'||(docFilter==='available'&&d.available)||d.specialty.toLowerCase().includes(docFilter.toLowerCase())).map((d,i)=>(
                  <div key={i} className="doc-card" style={{border:`2px solid ${d.color}22`,borderRadius:'22px',padding:'24px',background:`linear-gradient(135deg,${d.color}07,transparent)`}}>
                    <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'16px'}}>
                      <div style={{width:'62px',height:'62px',background:`${d.color}16`,border:`2px solid ${d.color}32`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',flexShrink:0}}>{d.icon}</div>
                      <div style={{flex:1}}>
                        <h3 style={{color:'#1a1a2e',fontWeight:800,fontSize:'1rem',marginBottom:'2px'}}>{d.name}</h3>
                        <p style={{color:d.color,fontWeight:700,fontSize:'0.83rem',marginBottom:'5px'}}>{d.specialty}</p>
                        <p style={{color:'#777',fontSize:'0.78rem',lineHeight:1.65}}>{d.bio}</p>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'9px',marginBottom:'13px'}}>
                      {[{lbl:'Rating',val:`⭐ ${d.rating}`,col:'#FFEAA7'},{lbl:'Patients',val:d.patients.toLocaleString(),col:d.color},{lbl:'Experience',val:`${d.exp} yrs`,col:'#96CEB4'}].map((s,j)=>(
                        <div key={j} style={{background:'rgba(0,0,0,.04)',borderRadius:'11px',padding:'10px',textAlign:'center'}}>
                          <div style={{color:s.col,fontWeight:800,fontSize:'0.95rem'}}>{s.val}</div>
                          <div style={{color:'#aaa',fontSize:'0.7rem',marginTop:'2px'}}>{s.lbl}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:'13px'}}>
                      <div style={{color:'#888',fontSize:'0.75rem',fontWeight:700,marginBottom:'6px'}}>🌐 Languages:</div>
                      <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                        {d.lang.map(l=><span key={l} style={{padding:'3px 10px',background:`${d.color}14`,color:d.color,borderRadius:'50px',fontSize:'0.72rem',fontWeight:700}}>{l}</span>)}
                      </div>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <span style={{background:d.available?'#d4edda':'#f8d7da',color:d.available?'#155724':'#721c24',padding:'4px 13px',borderRadius:'50px',fontSize:'0.75rem',fontWeight:800}}>{d.available?'✅ Available':'❌ Unavailable'}</span>
                        <span style={{color:'#888',fontSize:'0.78rem'}}>₹{d.fee}</span>
                      </div>
                      {d.available&&<button className="btn-p" onClick={()=>{pickDoc(d);setTab('book');}} style={{padding:'10px 20px',background:`linear-gradient(135deg,${d.color},${d.color}bb)`,color:'white',border:'none',borderRadius:'11px',fontWeight:800,cursor:'pointer',fontSize:'0.82rem',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Book →</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ HEALTH HUB ══════ */}
        {tab==='health'&&(
          <div className="fade">
            <div className="glass-w" style={{padding:'34px'}}>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:'1.55rem',fontWeight:900,color:'#1a1a2e',marginBottom:'6px'}}>💚 Health & Wellness Hub</h2>
              <p style={{color:'#888',marginBottom:'26px',fontSize:'0.9rem'}}>Tools, tips and resources for a healthier life</p>

              {/* BMI */}
              <div style={{background:'linear-gradient(135deg,#FF6B6B10,#4ECDC410)',border:'2px solid #FF6B6B20',borderRadius:'22px',padding:'26px',marginBottom:'20px'}}>
                <h3 style={{color:'#1a1a2e',fontWeight:800,marginBottom:'5px',fontSize:'1.05rem'}}>⚖️ BMI Calculator</h3>
                <p style={{color:'#888',fontSize:'0.83rem',marginBottom:'18px'}}>Calculate your Body Mass Index instantly</p>
                <BMICalc/>
              </div>

              {/* TIPS */}
              <h3 style={{color:'#1a1a2e',fontWeight:800,marginBottom:'13px',fontSize:'1.02rem'}}>💡 Daily Health Tips</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
                {healthTips.map((t,i)=>(
                  <div key={i} className="tip-c" style={{display:'flex',alignItems:'center',gap:'15px',padding:'17px',background:'#f9f9f9',borderRadius:'16px',border:`2px solid ${t.color}20`}}>
                    <div style={{fontSize:'1.9rem',flexShrink:0}}>{t.icon}</div>
                    <div style={{color:'#1a1a2e',fontWeight:600,fontSize:'0.9rem',flex:1}}>{t.tip}</div>
                    <div style={{width:'7px',height:'38px',background:`linear-gradient(180deg,${t.color},${t.color}44)`,borderRadius:'4px',flexShrink:0}}></div>
                  </div>
                ))}
              </div>

              {/* WELLNESS CHECKLIST */}
              <div style={{background:'linear-gradient(135deg,#4ECDC415,#45B7D115)',border:'2px solid #4ECDC422',borderRadius:'22px',padding:'26px',marginBottom:'20px'}}>
                <h3 style={{color:'#1a1a2e',fontWeight:800,marginBottom:'16px',fontSize:'1.02rem'}}>✅ Daily Wellness Checklist</h3>
                {['Drank 8 glasses of water','Exercised for 30 mins','Ate fruits & vegetables','Got 7-8 hours of sleep','Took prescribed medications','Practiced mindfulness/meditation'].map((item,i)=>(
                  <label key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'11px 0',borderBottom:i<5?'1px solid rgba(0,0,0,.06)':'none',cursor:'pointer'}}>
                    <input type="checkbox" style={{width:'18px',height:'18px',accentColor:'#4ECDC4',cursor:'pointer'}}/>
                    <span style={{color:'#444',fontWeight:600,fontSize:'0.9rem'}}>{item}</span>
                  </label>
                ))}
              </div>

              {/* EMERGENCY NUMBERS */}
              <div style={{background:'linear-gradient(135deg,#FF6B6B,#c0392b)',borderRadius:'22px',padding:'26px',color:'white'}}>
                <h3 style={{fontFamily:"'Fraunces',serif",fontSize:'1.2rem',fontWeight:900,marginBottom:'16px'}}>🚨 Global Emergency Numbers</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'9px'}}>
                  {emergencyNums.map((e,i)=>(
                    <div key={i} style={{background:'rgba(255,255,255,.15)',borderRadius:'13px',padding:'13px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{fontSize:'0.85rem',fontWeight:600}}>{e.flag} {e.country}</span>
                      <span style={{fontWeight:900,fontSize:'1rem'}}>{e.num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{textAlign:'center',color:'rgba(255,255,255,.3)',marginTop:'32px',paddingBottom:'20px',fontSize:'0.78rem',lineHeight:2.2}}>
          <p style={{fontFamily:"'Fraunces',serif",fontSize:'1rem',color:'rgba(255,255,255,.45)',marginBottom:'4px'}}>🏥 MediBook Global</p>
          <p>Built with ❤️ using MERN Stack · Available Worldwide · 8 Languages</p>
          <p>© 2026 MediBook · Trusted by 50,000+ patients · HIPAA Compliant</p>
        </div>

      </div>
    </div>
  );
}