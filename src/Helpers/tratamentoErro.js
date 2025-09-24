export const tratamentoErro = (erro) => {
  const mensagem = typeof erro === 'string' ? erro : erro?.message || 'Ocorreu um erro. Tente novamente.';

  let tipo = 'padrao';

  if (mensagem.toLowerCase().includes('senha')) tipo = 'senha';
  else if (mensagem.toLowerCase().includes('session') || mensagem.toLowerCase().includes('sessão')) tipo = 'sessao';
  else if (mensagem.toLowerCase().includes('network')) tipo = 'rede';
  else if (mensagem.toLowerCase().includes('título')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('conteúdo')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('imagem')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('tag')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('local')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('todos os campos')) tipo = 'campo';
  else if (mensagem.toLowerCase().includes('data')) tipo = 'campo';

  return { mensagem, tipo };
};
