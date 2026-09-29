"use client";

import { useEffect } from "react";

export function RevealController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    // Without JavaScript, every section remains visible.
    for (const element of document.querySelectorAll("[data-reveal]")) {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    }

    const showAll = () => {
      if (reducedMotion.matches) {
        document.querySelectorAll(".reveal-pending").forEach((element) => element.classList.remove("reveal-pending"));
        observer.disconnect();
      }
    };
    reducedMotion.addEventListener("change", showAll);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", showAll);
      document.querySelectorAll(".reveal-pending").forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, []);

  return null;
}
