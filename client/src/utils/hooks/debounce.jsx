import { useState, useEffect } from "react"
export default function active_debounce(textoBusq, retraso = 1000) {
    const [debounceValor, setDebounceValor] = useState(textoBusq);
    useEffect(() => {
        const actTexto = setTimeout(() => {
            //console.debug('Recibiendo', textoBusq)
            setDebounceValor(textoBusq);//Actualizar valor
        }, retraso);
        return () => {
            clearTimeout(actTexto);
        };
    }, [textoBusq, retraso]);//Recibir el texto del usuario y el tiempo de espera

    return debounceValor;//Enviar el último valor
};