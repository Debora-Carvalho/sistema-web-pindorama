import React, { useEffect, useState } from 'react';
import { useFormContato } from '../../../hooks/contato/useFormContato';
import PopupSucesso from '../../Popups/PopupSucesso/PopupSucesso';
import PopupErro from '../../Popups/PopupErro/PopupErro';
import styles from './FormSobreMim.module.scss';
import Carregando from '../../Carregando/Carregando';


function FormSobreMim() {
    const {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
        success,
        setSuccess
    } = useFormContato();

    const [erroPopup, setErroPopup] = useState({
        visivel: false,
        mensagem: '',
        tipo: 'padrao'
    });

    useEffect(() => {
        if (error) {
            const { mensagem, tipo } = tratamentoErro(error);
            setErroPopup({
                visivel: true,
                mensagem: mensagem,
                tipo: tipo
            });
        }
    }, [error]);

    const handleCloseSuccess = () => {
        setSuccess(false);
    };

    const handleCloseError = () => {
        setErroPopup({ visivel: false, mensagem: '', tipo: 'padrao' });
    };

    return (
        <>
            <form className={styles.formContato} onSubmit={handleSubmit}>
                <h2>Contate-me</h2>

                {loading && <Carregando />}

                <div className={styles.groupInput}>
                    <div className={styles.itemGroupInput}>
                        <label htmlFor="nome">Nome completo</label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder='Nome e sobrenome'
                            required
                            value={formData.nome}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.itemGroupInput}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Ex: nome@email.com'
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className={styles.itemGroupInput}>
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea
                        name="mensagem"
                        id="mensagem"
                        cols="30"
                        rows="5"
                        placeholder='Digite sua mensagem aqui...'
                        required
                        value={formData.mensagem}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.btnFormContato}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>

            <PopupSucesso
                aberto={success}
                mensagem="Sua mensagem foi enviada com sucesso! Logo entraremos em contato."
                textoBotao="Entendi"
                onBotaoClick={handleCloseSuccess}
            />

            <PopupErro
                aberto={erroPopup.visivel}
                mensagem={erroPopup.mensagem}
                tipo={erroPopup.tipo}
                onClose={handleCloseError}
            />
        </>
    );
};

export default FormSobreMim;