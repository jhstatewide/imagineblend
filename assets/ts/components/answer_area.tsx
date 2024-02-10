import { GameState } from "../gamestate";
export function AnswerArea(props: { gameState: GameState }) {

  const answer = props.gameState.answer.value;
  const isThinking = props.gameState.isThinking;

  return (
    <div className="answer-area" style={{minHeight: '3em'}}>
      {isThinking.value ? (
        <span className="thinking-animation" style={{display: 'block'}}>Thinking...</span>
      ) : (
        <span className="answer" style={{ display: 'block' }}>{answer}</span>
      )}
    </div>
  );
}