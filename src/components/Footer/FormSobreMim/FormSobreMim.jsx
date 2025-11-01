import styles from './FormSobreMim.module.scss';

function FormSobreMim() {
    return (
        <form className={styles.formContato}>
            <h2>Contate-me</h2>

            <div className={styles.groupInput}>
                <div className={styles.itemGroupInput}>
                    <label>Nome completo</label>
                    <input type="name" name="" id="" placeholder='Nome e sobrenome' required />
                </div>

                <div className={styles.itemGroupInput}>
                    <label>E-mail</label>
                    <input type="email" name="" id="" placeholder='Ex: nome@email.com' required />
                </div>
            </div>

            <div className={styles.itemGroupInput}>
                <label>Mensagem</label>
                <textarea name="" id="" cols="30" rows="5" placeholder='Digite sua mensagem aqui...' required />
            </div>

            <button type="submit" className={styles.btnFormContato}>Enviar</button>
        </form>
    );
};

export default FormSobreMim;