export const tratamentoErro = (erro) => {
  const mensagem = typeof erro === 'string' ? erro : erro?.message || 'Ocorreu um erro. Tente novamente.';

  let tipo = 'padrao';

  if (mensagem.toLowerCase().includes('senha')) tipo = 'senha';
  else if (mensagem.toLowerCase().includes('session') || mensagem.toLowerCase().includes('sessão')) tipo = 'sessao';
  else if (mensagem.toLowerCase().includes('network')) tipo = 'rede';

  return { mensagem, tipo };
};
