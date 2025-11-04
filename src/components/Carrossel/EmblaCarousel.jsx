import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import styles from './Embla.module.scss';

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
    align: 'center',
    containScroll: 'keepSnaps',
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const handlePrevClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const handleNextClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const progress =
    slides.length > 1 ? (selectedIndex / (slides.length - 1)) * 100 : 0

  return (
    <div className={styles.embla}>
      {/* Fundo animado */}
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedIndex}
          src={slides[selectedIndex]?.imagem}
          className={styles.embla__bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex
            return (
              <motion.div
                key={index}
                className={`${styles.embla__slide} ${
                  isActive ? styles['slide--active'] : styles['slide--mini']
                }`}
                animate={
                  isActive
                    ? { scale: 1, zIndex: 10, opacity: 1 }
                    : { scale: 0.8, zIndex: 1, opacity: 0.6 }
                }
                transition={{ duration: 0.6 }}
              >
                <img
                  src={slide.imagem}
                  alt={slide.titulo}
                  className={styles.slide__bg}
                />
                <div className={styles.slide__content}>
                  <h2>{slide.titulo}</h2>
                  {isActive && (
                    <motion.div
                      className={styles.content__active}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p>{slide.subtitulo}</p>
                      <button className={styles.slide__btnCompleto}>
                        {slide.botao}
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Botões de controle */}
      <div className={styles.embla__controls}>
        <button className={styles.embla__button} onClick={handlePrevClick}>
          <CircleChevronLeft
            size={40}
          />
        </button>
        <button className={styles.embla__button} onClick={handleNextClick}>
          <CircleChevronRight size={40} />
        </button>
      </div>

      {/* Barra de progresso */}
      <div className={styles.embla__progress}>
        <div
          className={styles.embla__progress__bar}
          style={{ transform: `translateX(${progress}%)` }}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
