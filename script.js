 // Filters
    const filters = document.querySelectorAll('.filter');
    const projects = Array.from(document.querySelectorAll('.proj'));
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projects.forEach(p => {
        if (f === 'all' || p.dataset.type === f) p.style.display = '';
        else p.style.display = 'none';
      })
    }));

    // Modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTechs = document.getElementById('modalTechs');
    const demoBtn = document.getElementById('demoBtn');
    const codeBtn = document.getElementById('codeBtn');
    const closeModal = document.getElementById('closeModal');

    projects.forEach(p=>{
      p.addEventListener('click', ()=>{
        modal.classList.add('show');
        modalTitle.textContent = p.dataset.title;
        modalDesc.textContent = p.dataset.desc;
        modalTechs.innerHTML = '';
        p.dataset.tech.split(',').forEach(t=>{
          const el = document.createElement('span'); el.textContent = t.trim(); el.className='tech'; modalTechs.appendChild(el);
        })
        // demo and code buttons (placeholders)
        demoBtn.href = '#';
        codeBtn.href = '#';
      })
    })
    closeModal.addEventListener('click', ()=>modal.classList.remove('show'));
    modal.addEventListener('click',(e)=>{ if(e.target===modal) modal.classList.remove('show') });

    // Contact scroll
    document.getElementById('contactBtn').addEventListener('click', (e)=>{
      e.preventDefault(); document.getElementById('gh').scrollIntoView({behavior:'smooth', block:'center'});
    });

    // Download CV hook (will toggle placeholder behaviour)


    // Small animation on load
    window.addEventListener('load', ()=>{
      document.querySelectorAll('.proj').forEach((el,i)=>{ el.style.opacity=0; setTimeout(()=>el.style.opacity=1, i*80) });
    })