import * as React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import styles from './Calendario.module.scss';

function Calendario() {
    const [data, setData] = React.useState(new Date());

    return (
        <div className={styles.containerCalendarioInicial}>
            <div className={styles.calendarioInicialTopo}>
                <p className={styles.calendarioInicialMes}>
                    {new Intl.DateTimeFormat('pt-BR', {
                        month: 'long',
                    }).format(new Date())}
                </p>
                <div className={styles.calendarioInicialDataHora}>
                    {new Intl.DateTimeFormat('pt-BR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).format(new Date())}
                </div>
            </div>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DateCalendar
                    value={data}
                    onChange={(novaData) => setData(novaData)}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        minWidth: 260,
                        margin: '0 auto',

                        // fontes adaptáveis
                        '& .MuiTypography-root, & .MuiPickersDay-root, & .MuiPickersYear-yearButton': {
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem' },
                        },

                        // dia selecionado
                        '& .MuiPickersDay-root.Mui-selected, & .MuiPickersYear-yearButton.Mui-selected': {
                            backgroundColor: 'var(--background-secondary)',
                            color: '#fff',
                        },
                    }}
                />

            </LocalizationProvider>
        </div>
    );
};

export default Calendario;