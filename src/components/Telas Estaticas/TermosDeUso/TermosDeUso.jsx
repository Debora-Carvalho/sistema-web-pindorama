import IconCactoApoio from "../../../assets/icons/icon-cacto-apoio-agenda.png";
import styles from './TermosDeUso.module.scss';

function TermosDeUso({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.termosContainer}>
        <button className={styles.botaoFechar} onClick={onClose}>✕</button>

        <div className={styles.tituloTermos}>
          <h1>Termos de Uso</h1>
          <img
            src={IconCactoApoio}
            alt="Ícone de cacto"
            className={styles.iconCactoFooter}
          />
        </div>

        <div className={styles.conteudoTermos}>
          <p>
            Estes Termos de Uso regem o acesso e a utilização do nosso site, que tem como objetivo difundir o patrimônio imaterial por meio de artigos, mapas interativos e informações sobre eventos culturais. Ao acessar ou usar nosso site, você concorda em cumprir estes termos.
          </p>

          <h3>1. Propriedade Intelectual</h3>
          <p>
            Todo o conteúdo do site, incluindo textos, artigos, imagens, mapas interativos, logotipos e design, é de propriedade do Pindorama e de seus autores, e é protegido por leis de direitos autorais e propriedade intelectual.
          </p>
          <ul>
            <li>
              Você pode acessar e visualizar o conteúdo para uso pessoal e não comercial.
            </li>
            <li>
              A reprodução, distribuição ou modificação de qualquer conteúdo sem autorização prévia por escrito é estritamente proibida.
            </li>
            <li>
              É permitido compartilhar os artigos e o conteúdo do site através das redes sociais, desde que a fonte seja citada.
            </li>
          </ul>

          <h3>2. Limitação de Responsabilidade</h3>
          <p>O conteúdo do site, incluindo os artigos e o mapa interativo, é fornecido "como está" e tem fins informativos.</p>
          <ul>
            <li>RNão nos responsabilizamos por perdas ou danos decorrentes do uso do nosso site.</li>
            <li>As informações sobre eventos culturais são fornecidas com base em dados de terceiros, e não garantimos sua veracidade ou ocorrência. Recomendamos que você confirme os detalhes com os organizadores dos eventos.</li>
          </ul>

          <h3>3. Links para Terceiros</h3>
          <p>
            Nosso site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua conveniência. Não somos responsáveis pelo conteúdo ou pelas políticas de privacidade desses sites.
          </p>

          <h3>4. Encerramento do Acesso</h3>
          <p>
            Podemos, a nosso critério, suspender ou encerrar seu acesso ao site a qualquer momento, por qualquer motivo, especialmente se você violar estes Termos de Uso.
          </p>

          <h3>5. Alterações nos Termos</h3>
          <p>
            Estes Termos de Uso podem ser alterados a qualquer momento. As alterações entrarão em vigor assim que forem publicadas no site. Seu uso contínuo do site após a publicação das alterações constitui sua aceitação dos novos termos.
          </p>

          <h3>6. Contato</h3>
          <p>
            Se tiver alguma dúvida sobre estes termos ou desejar entrar em contato, use o formulário disponível no site.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermosDeUso