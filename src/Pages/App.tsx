import { useState } from "react";
import Cronometer from "../components/Cronometer";
import Form from "../components/Formulary/index";
import List from "../components/List/index";
import { ITarefa } from "../types/tarefas";
import style from "./App.module.scss";

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) => ({
        ...tarefa,
        selecionado: tarefa.id === tarefaSelecionada.id ? true : false,
      }))
    );
  }

  function finalizarTarefa() {
    if (selecionado) {
      setSelecionado(undefined);
      setTarefas((tarefasAnteriores) =>
        tarefasAnteriores.map((tarefa) => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true,
            };
          } else {
            return tarefa;
          }
        })
      );
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTarefas={setTarefas}></Form>
      <List tarefas={tarefas} selecionaTarefa={selecionaTarefa}></List>
      <Cronometer
        selecionado={selecionado}
        finalizarTarefa={finalizarTarefa}
      ></Cronometer>
    </div>
  );
}

export default App;
