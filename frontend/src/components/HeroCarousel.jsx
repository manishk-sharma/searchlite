import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api'
import './HeroCarousel.css'

const defaultSlides = [
  {
    imageUrl: '/images/carousel/research.png',
    title: 'Market Research & Data Analytics',
    subtitle: 'Empowering decisions through precision intelligence and predictive modeling.',
    linkUrl: '/services/content-analysis'
  },
  {
    imageUrl: '/images/carousel/consumer.png',
    title: 'Consumer Insights',
    subtitle: 'Decoding human behavior to unlock your brand\'s hidden potential.',
    linkUrl: '/services/ux-research'
  },
  {
    imageUrl: '/images/carousel/global.png',
    title: 'Global Strategic Outreach',
    subtitle: 'Bridging data across borders to drive universal growth and connectivity.',
    linkUrl: '/services/rural-outreach-programme'
  },
  {
    imageUrl: '/images/carousel/strategy.png',
    title: 'Strategic Project Planning',
    subtitle: 'Architecting resilient success from initial concept to final execution.',
    linkUrl: '/services/project-management'
  }
]

export default function HeroCarousel() {
  const [slides, setSlides] = useState(defaultSlides)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await api.request('/portal?type=carousel')
        if (data && data.length > 0) {
          // Sort by order
          setSlides(data.sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
      } catch (err) {
        console.error("Failed to fetch carousel slides:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [current, slides])

  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 }
      }
    })
  }

  if (isLoading) {
    return <div className="hero-carousel"><div className="hero-carousel__overlay" style={{background: '#111'}} /></div>
  }

  return (
    <div className="hero-carousel">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="hero-carousel__slide"
          style={{ backgroundImage: `url(${slides[current].imageUrl || '/images/carousel/research.png'})` }}
        >
          <div className="hero-carousel__overlay" />
          <div className="container">
            <motion.div 
              className="hero-carousel__content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="hero-carousel__title">
                {slides[current].title.split(' ').map((word, i, arr) => (
                   i >= arr.length - 2 ? <span key={i} className="gradient-text">{word} </span> : word + ' '
                ))}
              </h1>
              <p className="hero-carousel__subtitle">{slides[current].subtitle}</p>
              <div className="hero-carousel__btns">
                <Link to={slides[current].linkUrl || '/services'} className="hero__btn hero__btn--primary">
                  {slides[current].content || 'Explore Services'} <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="hero__btn hero__btn--outline">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="hero-carousel__nav">
          <button onClick={prevSlide} className="hero-carousel__arrow" aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
          <div className="hero-carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                className={`hero-carousel__dot ${i === current ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="hero-carousel__arrow" aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
