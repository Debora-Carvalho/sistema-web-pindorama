// EmblaCarousel.jsx
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { motion } from 'framer-motion'
import styles from './Embla.module.scss'

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const onScroll = useCallback((emblaApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onScroll(emblaApi)
    onSelect(emblaApi)
    emblaApi
      .on('reInit', () => {
        onScroll(emblaApi)
        onSelect(emblaApi)
      })
      .on('scroll', onScroll)
      .on('select', onSelect)
  }, [emblaApi, onScroll, onSelect])

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <img src={slide.imagem} alt={slide.titulo} className={styles.slide__bg} />

              <div className={styles.slide__content}>
                <motion.h2
                  key={`title-${index}-${selectedIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: index === selectedIndex ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {slide.titulo}
                </motion.h2>

                <motion.p
                  key={`subtitle-${index}-${selectedIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: index === selectedIndex ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {slide.subtitulo}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.slide__button}
                >
                  {slide.botao}
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__progress}>
          <div
            className={styles.embla__progress__bar}
            style={{ transform: `translate3d(${scrollProgress}%,0,0)` }}
          />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
