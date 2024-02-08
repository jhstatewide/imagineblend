import { GameState } from "../gamestate";

export function AnswerArea(props: { gameState: GameState }) {

  const answer = props.gameState.answer.value;

  return (
    <div className="answer-area">
      <div className="answer">ANSWER: {answer}</div>
    </div>
  );
}