
(function(){
  'use strict';
  const key='nomad-pages-language';
  function choose(){
    try {
      const q=new URLSearchParams(window.location.search).get('lang');
      if(q==='en'||q==='ru') return q;
      const saved=localStorage.getItem(key);
      if(saved==='en'||saved==='ru') return saved;
    } catch(_e) {}
    return 'en';
  }
  let language=choose();
  document.documentElement.lang=language;
  function apply(lang,save){
    if(lang!=='en'&&lang!=='ru') return;
    language=lang;
    document.documentElement.lang=lang;
    if(save){
      try{localStorage.setItem(key,lang);}catch(_e){}
      try{const u=new URL(window.location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);}catch(_e){}
    }
    const title=document.querySelector('meta[name="page-title-'+lang+'"]');
    if(title) document.title=title.content;
    const description=document.querySelector('meta[name="page-description-'+lang+'"]');
    if(description) document.querySelector('meta[name=description]').content=description.content;
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===lang)));
    document.querySelectorAll('a[data-local]').forEach(a=>{
      const raw=a.getAttribute('data-local');
      const chunks=raw.split('#');
      a.href=chunks[0]+'?lang='+lang+(chunks[1]?'#'+chunks[1]:'');
    });
    document.querySelectorAll('[data-alt-en]').forEach(image=>image.alt=image.getAttribute('data-alt-'+lang));
    document.querySelectorAll('[data-mail-en]').forEach(a=>a.setAttribute('href',a.getAttribute('data-mail-'+lang)));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    apply(language,false);
    document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.language,true)));
  });
})();
