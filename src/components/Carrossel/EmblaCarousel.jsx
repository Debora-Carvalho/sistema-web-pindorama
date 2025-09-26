import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton } from './EmblaCarouselArrowButtons' // Removi o 'usePrevNextButtons' que não era usado
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Embla.module.scss'

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
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const handlePrevClick = useCallback(() => {
    if (!emblaApi) return
    const prevIndex = (selectedIndex - 1 + slides.length) % slides.length
    emblaApi.scrollTo(prevIndex)
    setSelectedIndex(prevIndex)
  }, [emblaApi, selectedIndex, slides.length])

  const handleNextClick = useCallback(() => {
    if (!emblaApi) return
    const nextIndex = (selectedIndex + 1) % slides.length
    emblaApi.scrollTo(nextIndex)
    setSelectedIndex(nextIndex)
  }, [emblaApi, selectedIndex, slides.length])

  const progress = slides.length > 1 ? (selectedIndex / (slides.length - 1)) * 100 : 0

  return (
    <div className={styles.embla}>
      <AnimatePresence>
        <motion.img
          key={selectedIndex}
          className={styles.embla__bg}
          src={slides.length > 0 ? slides[selectedIndex].imagem : ''} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => {
            const position = (index - selectedIndex + slides.length) % slides.length
            const isActive = position === 0

            return (
              <div
                className={`${styles.embla__slide} ${isActive ? styles['slide--active'] : styles['slide--mini']}`}
                key={index}
                style={{ '--position': position }}
              >
                <img src={slide.imagem} alt={slide.titulo} className={styles.slide__bg} />
                <div className={styles.slide__content}>
                  <h2>{slide.titulo}</h2>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={styles.content__active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p>{slide.subtitulo}</p>
                        <button className={styles.slide__btnCompleto}>{slide.botao}</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={handlePrevClick} />
          <NextButton onClick={handleNextClick} />
        </div>

        <div className={styles.embla__progress}>
          <div
            className={styles.embla__progress__bar}
            style={{ transform: `translateX(${progress}%)` }}
          />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel