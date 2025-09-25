// PaginaCarrossel.jsx
import React from 'react'
import EmblaCarousel from '../../../components/Carrossel/EmblaCarousel'
import Header from '../../../components/Header/Header'
import carrosselStyles from './PaginaCarrossel.module.scss'

const SLIDES = [
  {
    imagem: 'https://i.pinimg.com/736x/06/0e/c2/060ec2ff471313fd6ab50cdeebf1f8a9.jpg',
    titulo: 'As danças brasileiras',
    subtitulo: 'Como e porque as danças no Brasil são tão importantes como patrimônio cultural imaterial brasileiro',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/1200x/1b/12/29/1b1229e7444c37eeb953005d4a1a1dc8.jpg',
    titulo: 'O Bumba Meu Boi',
    subtitulo: 'Patrimônio cultural imaterial brasileiro...',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/1200x/09/98/f6/0998f60520dc1806614a121b435ab52a.jpg',
    titulo: 'A literatura de cordel',
    subtitulo: 'Patrimônio cultural de expressão popular...',
    botao: 'Ver artigo completo'
  }
]

const PaginaCarrossel = () => {
  const OPTIONS = { dragFree: true, loop: true }

  return (
    <div>
    <div className={carrosselStyles.paginaCarrossel}>
     <Header 
     acessibilidadeOverride={carrosselStyles.overrideContainer} 
     overrideClass={carrosselStyles.headerOverride} />
    </div>
    <div className={carrosselStyles.carrosselFundo}>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </div>
  </div>

  )
}

export default PaginaCarrossel
