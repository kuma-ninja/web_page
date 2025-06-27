"use client";

import { useEffect, useRef } from 'react';

interface TextScrambleProps {
  phrases: string[];
  className?: string;
}

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

class TextScrambleClass {
  private el: HTMLElement;
  private chars: string;
  private queue: QueueItem[] = [];
  private frame: number = 0;
  private frameRequest?: number;
  private resolve?: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
    this.frame = 0;
    this.update();
    return promise;
  }

  private update(): void {
    let output = "";
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve?.();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  destroy(): void {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }
}

export default function TextScramble({ phrases, className = "" }: TextScrambleProps) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const fxRef = useRef<TextScrambleClass | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;
    const fx = new TextScrambleClass(el);
    fxRef.current = fx;

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();

    // Cleanup function
    return () => {
      fxRef.current?.destroy();
    };
  }, [phrases]);

  return <p ref={elementRef} className={`shuffle ${className}`}></p>;
} 