import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('active');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    const scan = () => {
      document.querySelectorAll('.reveal:not(.active), .reveal-left:not(.active), .reveal-right:not(.active)')
        .forEach(el => obs.observe(el));
    };

    scan();

    const mutObs = new MutationObserver(() => scan());
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
    };
  }, []);
}

export function useSectionInView() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.18 });

    const els = document.querySelectorAll('.section-wrap, #contact');
    els.forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);
}

