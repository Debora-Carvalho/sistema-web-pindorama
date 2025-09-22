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
            <div className={styles.calendarioInicialDataHora}>
                {new Intl.DateTimeFormat('pt-BR', {
                weekday: 'short',
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
                    '& .Mui-selected': {
                    backgroundColor: 'var(--background-secondary)', 
                    color: '#fff',
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: 'var(--background-secondary)',
                    },
                    '& .MuiPickersYear-yearButton.Mui-selected': {
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