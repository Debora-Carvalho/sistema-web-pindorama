// Em: TodosArtigos.jsx
import React from 'react';
import ArtigoCard from '../../components/CardArtigo/CardArtigo.jsx';


const mockArtigos = [ /* Seus dados COMPLETOS de artigos */ ];

export default function TodosArtigos() {
  return (
    <div className={styles.pagina}>
      <h1>Todos os Artigos</h1>
      <div className={styles.gridArtigos}>
        {mockArtigos.map(artigo => (
          <ArtigoCard 
            key={artigo.id}
            id={artigo.id}
            imagem={artigo.imagem}
            titulo={artigo.titulo}
            url={`/artigo/${artigo.id}`}
          />
        ))}
      </div>
    </div>
  );
}