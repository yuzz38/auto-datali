const burger=document.querySelector('.burger'),nav=document.querySelector('.nav');burger.addEventListener('click',()=>{const open=burger.getAttribute('aria-expanded')!=='true';burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('open',open)});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Открыть меню')}});document.querySelectorAll('.video-wrap').forEach(w=>{const v=w.querySelector('video'),b=w.querySelector('.play');b.addEventListener('click',async()=>{if(v.paused){document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()});try{await v.play()}catch(e){b.setAttribute('aria-label','Не удалось воспроизвести видео')}}else v.pause()});v.addEventListener('play',()=>{w.classList.add('playing');b.textContent='Ⅱ';b.setAttribute('aria-label','Поставить видео на паузу')});v.addEventListener('pause',()=>{w.classList.remove('playing');b.textContent='▶';b.setAttribute('aria-label','Воспроизвести видео')})});let count='1',type='Универсальный';const order=document.querySelector('#box-order');function updateOrder(){const text=`Здравствуйте! Хочу заказать сюрприз-бокс. Ложечек: ${count}. Наполнение: ${type}. Подскажите стоимость и доставку.`;order.href='https://wa.me/79229822223?text='+encodeURIComponent(text)}document.querySelectorAll('.spoon-options button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.spoon-options button').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});b.classList.add('selected');b.setAttribute('aria-pressed','true');count=b.dataset.count;document.querySelector('#gift-count').textContent=b.dataset.gifts;document.querySelector('#box-price').textContent=count==='1'?'3 000 ₽ / 1 ЛОЖЕЧКА':'СТОИМОСТЬ УТОЧНЯЙТЕ';updateOrder()}));document.querySelectorAll('.type-options button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.type-options button').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});b.classList.add('selected');b.setAttribute('aria-pressed','true');type=b.dataset.type;updateOrder()}));updateOrder();

const reviewsTrack = document.querySelector('.reviews-track');
const reviewPrev = document.querySelector('.review-prev');
const reviewNext = document.querySelector('.review-next');
if (reviewsTrack && reviewPrev && reviewNext) {
  const updateReviewControls = () => {
    reviewPrev.disabled = reviewsTrack.scrollLeft <= 1;
    reviewNext.disabled = reviewsTrack.scrollLeft + reviewsTrack.clientWidth >= reviewsTrack.scrollWidth - 1;
  };
  const moveReview = direction => {
    const card = reviewsTrack.querySelector('.review-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(reviewsTrack).columnGap) || 0;
    reviewsTrack.scrollBy({left: direction * (card.getBoundingClientRect().width + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  };
  reviewPrev.addEventListener('click', () => moveReview(-1));
  reviewNext.addEventListener('click', () => moveReview(1));
  reviewsTrack.addEventListener('scroll', updateReviewControls, {passive: true});
  window.addEventListener('resize', updateReviewControls);
  updateReviewControls();
}
