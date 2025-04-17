interface CounterOptions {
  start?: number;
  end: number;
  duration?: number;
  element: HTMLElement;
  suffix?: string;
}

export function animateNumberCounter(options: CounterOptions) {
  const { start = 0, end, duration = 2000, element, suffix = "" } = options;
  const range = end - start;
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + range * progress);

    element.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else if (suffix) {
      element.textContent = end.toLocaleString() + suffix;
    }
  };

  requestAnimationFrame(updateCounter);
}

export function initNumberCounters() {
  const counterElements =
    document.querySelectorAll<HTMLElement>("[data-counter]");

  counterElements.forEach((element) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = element.dataset.target
              ? parseInt(element.dataset.target)
              : 0;
            const suffix = element.dataset.suffix || "";
            const duration = element.dataset.duration
              ? parseInt(element.dataset.duration)
              : 2000;

            animateNumberCounter({
              end: target,
              duration,
              element,
              suffix,
            });

            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
  });
}
