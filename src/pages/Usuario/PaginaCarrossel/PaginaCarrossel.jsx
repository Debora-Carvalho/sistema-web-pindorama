import EmblaCarousel from '../../../components/Carrossel/EmblaCarousel'
import Header from '../../../components/Header/Header'
import carrosselStyles from './PaginaCarrossel.module.scss'

const SLIDES = [
  {
    imagem: 'https://ogimg.infoglobo.com.br/in/25329277-158-a5b/FT1086A/35825446_BVExclusivoRio-de-Janeiro-RJ-28-04-2010-Festa-de-Sao-Joao-em-Campina-Grande-uma-das-mai.jpg',
    titulo: 'As danças brasileiras',
    subtitulo: 'Como e porque as danças no Brasil são tão importantes como patrimônio cultural imaterial brasileiro',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/1200x/1b/12/29/1b1229e7444c37eeb953005d4a1a1dc8.jpg',
    titulo: 'O Bumba Meu Boi',
    subtitulo: 'Patrimônio cultural imaterial brasileiro muito popular no norte do pais que carrega uma grande bagagem que vale a pena descobrir',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/1200x/09/98/f6/0998f60520dc1806614a121b435ab52a.jpg',
    titulo: 'A literatura de cordel',
    subtitulo: 'Patrimônio cultural de expressão popular que teve sua origem no nordeste',
    botao: 'Ver artigo completo'
  },
  {
    imagem: 'https://i.pinimg.com/736x/b7/27/74/b7277420338185c39ad9784c52145c26.jpg',
    titulo: 'A cultura indigena',
    subtitulo: 'A importância de preservar as tradições indígenas para manter as tradições',
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
