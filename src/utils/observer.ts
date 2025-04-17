// src/utils/observer.ts
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const duration =
            element.style.getPropertyValue("--duration") || "800";
          const delay = element.style.getPropertyValue("--delay") || "0";

          element.style.animationDuration = `${duration}ms`;
          element.style.animationDelay = `${delay}ms`;
          element.classList.add("animate");

          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll<HTMLElement>("[data-animate]")
    .forEach((element) => {
      observer.observe(element);
    });
}
