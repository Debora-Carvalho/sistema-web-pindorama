import EmblaCarousel from '../../../components/Carrossel/EmblaCarousel'
import Header from '../../../components/Header/Header'

const SLIDES = [

     {
    imagem:'https://i.pinimg.com/736x/98/56/72/985672a79b8400c71bc98d78f5e3f935.jpg',
    titulo: 'As danças brasileiras',
    subtitulo: 'Como e porque as danças no Brasil são tão importantes como patrimonio cultural imaterial brasileiro',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/1200x/1b/12/29/1b1229e7444c37eeb953005d4a1a1dc8.jpg',
    titulo: 'O Bumba Meu Boi',
    subtitulo: 'Patrimônio cultural...',
    botao: 'Ver artigo completo'
  },
  { 
    imagem:'https://i.pinimg.com/1200x/09/98/f6/0998f60520dc1806614a121b435ab52a.jpg',
    titulo: 'A literatura de cordel',
    subtitulo: 'Patrimônio cultural...',
    botao: 'Ver artigo completo'
  }
  
]

const PaginaCarrossel = () => {
  const OPTIONS = { dragFree: true, loop: true }

  return (
    <div>
      <div>
        <Header/>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default PaginaCarrossel
