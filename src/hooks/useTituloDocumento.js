// hook que altera o título da página

import { useEffect } from 'react';

export default function useTituloDocumento(title) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}
