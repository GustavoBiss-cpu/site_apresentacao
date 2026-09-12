// logo — tenta logo.svg, depois logo.png; se nenhum existir, usa o traço desenhado (ou some, no rodapé)
  function handleLogoError(img, fallbackId){
    if(img.dataset.step !== 'jpg'){
      img.dataset.step = 'jpg';
      img.src = 'img/logo.jpg';
    } else {
      img.style.display = 'none';
      if(fallbackId){
        const fb = document.getElementById(fallbackId);
        if(fb) fb.style.display = 'block';
      }
    }
  }

  // reveal on scroll
  const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
  items.forEach(el=>io.observe(el));

  // top progress bar
  const progress = document.getElementById('progress');
  function updateProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  // sheet index — which section is in view
  const sections = document.querySelectorAll('section');
  const sheetIndex = document.getElementById('sheetIndex');
  const secObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const i = Array.from(sections).indexOf(e.target) + 1;
        sheetIndex.textContent = 'folha ' + String(i).padStart(2,'0') + ' / ' + sections.length;
      }
    });
  }, { threshold:0.5 });
  sections.forEach(s=>secObserver.observe(s));