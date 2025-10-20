import React from 'react';
import IconCactoApoio from "../../../assets/icons/icon-cacto-apoio-agenda.png";
import styles from './PoliticasDePrivacidade.module.scss';

function PoliticasDePrivacidade({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.politicasContainer}>
        <button className={styles.botaoFechar} onClick={onClose}>✕</button>

        <div className={styles.tituloPoliticas}>
          <h1>Politicas de Privacidade</h1>
          <img
            src={IconCactoApoio}
            alt="Ícone de cacto"
            className={styles.iconCactoFooter}
          />
        </div>

        <div className={styles.conteudoPoliticas}>
          <p>
            Esta Política de Privacidade descreve como o site Pindorama, focado em
            patrimônio imaterial, coleta, usa, armazena e protege as informações
            dos usuários. Ao utilizar nosso site, você concorda com os termos
            desta política.
          </p>

          <h3>1. Coleta de informações</h3>
          <p>
            Coletamos informações para melhorar a sua experiência e fornecer
            conteúdo relevante sobre patrimônio imaterial. As informações podem
            ser coletadas das seguintes formas:
          </p>
          <ul>
            <li>
              <strong>Informações fornecidas por você:</strong> quando você entra
              em contato conosco através do formulário, podemos coletar dados
              como seu nome e e-mail.
            </li>
            <li>
              <strong>Dados de navegação:</strong> coletamos informações sobre
              como você interage com nosso site, como seu endereço IP, tipo de
              navegador, páginas visitadas, tempo gasto em cada página e
              localização geográfica. Usamos essas informações para entender as
              preferências dos nossos leitores e otimizar a navegação.
            </li>
          </ul>

          <h3>2. Uso das informações</h3>
          <p>As informações coletadas são usadas para:</p>
          <ul>
            <li>Responder às suas solicitações e mensagens enviadas pelo formulário de contato.</li>
            <li>Melhorar a funcionalidade e o conteúdo do site, analisando o comportamento dos usuários.</li>
            <li>Garantir a segurança e a integridade do site.</li>
          </ul>

          <h3>3. Compartilhamento de informações</h3>
          <p>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com
            terceiros, exceto nas seguintes situações:
          </p>
          <ul>
            <li><strong>Para cumprimento legal:</strong> podemos divulgar informações se exigido por lei ou ordem judicial.</li>
          </ul>

          <h3>4. Cookies</h3>
          <p>
            Utilizamos cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a lembrar suas preferências e otimizar o desempenho do site. Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade de algumas partes do site.
          </p>

          <h3>5. Segurança</h3>
          <p>
            Tomamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, lembre-se que nenhum sistema na internet é 100% seguro.
          </p>

          <h3>6. Seus direitos</h3>
          <p>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco através do formulário.
          </p>

          <h3>7. Alterações nesta Política</h3>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a revise sempre que possível para se manter informado sobre como protegemos suas informações.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PoliticasDePrivacidade;
