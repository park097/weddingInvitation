"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  initialVisible?: boolean;
};

export default function Reveal({
  children,
  className,
  delayMs = 0,
  initialVisible = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (initialVisible) {
      element.dataset.reveal = "visible";
      return;
    }

    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
    };

    if (window.scrollY > 0) {
      setHasScrolled(true);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasScrolled, initialVisible]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !hasScrolled || initialVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasScrolled, initialVisible]);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={`reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
