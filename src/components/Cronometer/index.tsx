import { useEffect, useState } from "react";
import { tempoParaSegundos } from "../../common/utils/time";
import { ITarefa } from "../../types/tarefas";
import Button from "../Buttons/index";
import Clock from "./Clock";
import style from "./Cronometer.module.scss";

interface Props {
  selecionado: ITarefa | undefined;
  finalizarTarefa: () => void;
}

export default function Cronometer({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);

  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      } else {
        finalizarTarefa();
      }
    }, 1000);
  }

  return (
    <div className={style.cronometer}>
      <p className={style.title}>Escolha uma matéria e inicie o cronômetro:</p>
      <div className={style.clockWrapper}>
        <Clock tempo={tempo}></Clock>
      </div>
      <Button onClick={() => regressiva(tempo)}>Iniciar!</Button>
    </div>
  );
}
