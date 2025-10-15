'use client';
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSectionCompatible() {
  const [imageError, setImageError] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleButtonClick = () => {
    // Aqui você pode adicionar a lógica para abrir o Spotify ou outra ação
    console.log('Botão EP clicado');
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className={styles.amorCircleContainer}>
              {/* Círculo AMOR */}
              <img 
                className={styles.amorCircle}
                src="/amor-circle.png" 
                alt="Círculo AMOR"
                onError={() => {
                  console.warn('Erro ao carregar amor-circle.png');
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('Imagem AMOR carregada com sucesso');
                }}
                style={{
                  display: imageError ? 'none' : 'block'
                }}
              />
              
              {/* Logo central */}
              <div className={styles.logoContainer}>
                <img 
                  className={styles.artistInitials}
                  src="/JR.png" 
                  alt="JR"
                />
                
                <motion.div variants={itemVariants}>
                  <button
                    className={styles.epButton}
                    onClick={handleButtonClick}
                  >
                    {/* Texto para Desktop */}
                    <div className={`${styles.epButtonText} ${styles.desktopText}`}>
                      OUÇA AGORA O EP
                      <br />
                      "EU SÓ QUERIA FALAR DE AMOR"
                    </div>
                    {/* Texto para Mobile */}
                    <div className={`${styles.epButtonText} ${styles.mobileText}`}>
                      OUÇA AGORA
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
