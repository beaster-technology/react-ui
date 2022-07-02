import React from 'react';

import styles from './Footer.module.css';

function Navbar() {
  return (
    <footer className={styles.footer}>
      <p>
        Site criado para a disciplina{' '}
        <a
          href="https://uspdigital.usp.br/jupiterweb/obterDisciplina?sgldis=SSC0103"
          target="_blank"
          rel="noopener noreferrer"
        >
          SSC0103 - Programação Orientada a Objetos
        </a>
      </p>
      <p>Arthur Vergaças • Benício Januário • Henrique Bovo • Lucas Pacheco</p>
    </footer>
  );
}

export default Navbar;
