"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./page.module.css";
import TextScramble from "./components/TextScramble";

export default function Home() {
  useEffect(() => {
    // Adiciona a classe is-preload ao body
    document.body.classList.add("is-preload", "landing");

    // Remove a classe após o carregamento com timeout
    const removePreload = () => {
      window.setTimeout(function() {
        let body = document.getElementsByTagName("body")[0];
        body.classList.remove("is-preload");
      }, 100);
    };

    window.addEventListener("load", removePreload);

    return () => {
      document.body.classList.remove("is-preload", "landing");
      window.removeEventListener("load", removePreload);
    };
  }, []);

  const phrases = [
    "what happens when a ninja meets a bear?",
    "unleash your spirit and bear the unknown",
  ];

  return (
    <div id="page-wrapper" className={styles.pageWrapper}>
      <header id="header" className={styles.header}>
        <h1 id="logo" className={styles.logo}>
          <a href="#page-wrapper" className="scrolly">
            kuma.ninja
          </a>
        </h1>
      </header>

      <section id="banner" className={styles.banner}>
        <div className={styles.content}>
          <header>
            <h2>kuma ninja studio</h2>
            <TextScramble phrases={phrases} />
          </header>
          <span className={styles.image}>
            <Image
              src="/LOGO_KUMANINJA_fundo_branco.png"
              alt="Kuma Ninja Logo"
              width={500}
              height={500}
              priority
              style={{ objectFit: "contain" }}
            />
          </span>
        </div>
      </section>
    </div>
  );
}

