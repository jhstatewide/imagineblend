import { WordPaletteComponent } from './word_palette';
import { WordTargetComponent } from './word_target';
import { AnswerArea } from './answer_area';
import { MessageList } from './message_list';
import { CalculateButton } from './calculate_button';
import { useEffect, useState } from 'preact/hooks';
import { GameAreaProps, BroadcastMessageBuffer } from './game_area';
import { isMobile } from '../utils';
import { WordOperator } from '../api/imagineblend_api_client';


export function GameArea(props: GameAreaProps) {

    const [messages, setMessages] = useState<string[]>([]);
    const [operator, setOperator] = useState('add');
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [broadcastMessageBuffer, setBroadcastMessageBuffer] = useState(new BroadcastMessageBuffer());

    useEffect(() => {
        props.gameState.operator.value = operator === 'add' ? WordOperator.ADD : WordOperator.SUBTRACT;
    }, [operator]);

    useEffect(() => {
        // add SSE listener
        console.log("Registering SSE listener!");
        setEventSource(sseSource());
    }, []);


    function sseSource(): EventSource {
        // OK, we are using esbuild to set a global called API_HOST
        // it can be either undefined or DEFAULT_ORIGIN. if it's default origin, just return
        // new EventSource('/sse'), otherwise look at window.origin to see if we are http or https
        // then build the URL like "$protocol://$API_HOST/sse"
        if (API_HOST === undefined || API_HOST === "DEFAULT_ORIGIN") {
            console.log("Returning EventSource('/sse')");
            return new EventSource('/sse');
        } else {
            console.log("Returning EventSource with protocol and API_HOST");
            if (window.location.protocol === 'http:') {
                console.log("Returning EventSource with http");
                return new EventSource(`http://${API_HOST}/sse`);
            } else {
                console.log("Returning EventSource with https");
                return new EventSource(`https://${API_HOST}/sse`);
            }
        }
    }

    useEffect(() => {
        if (eventSource) {
            eventSource.onmessage = function (event) {
                console.log('SSE event received');
                console.log(event.data);
                broadcastMessageBuffer.addMessage(event.data);
            };
    
            eventSource.onerror = function (event) {
                console.log('SSE error');
                console.log(event);
                // now print a descriptive message
                if (event.eventPhase === EventSource.CLOSED) {
                    console.log('SSE connection closed');
                } else {
                    console.log('SSE connection error');
                }
            };
    
            eventSource.addEventListener('connected', function (event) {
                console.log('SSE connected');
                console.log(event);
            });
    
            return () => {
                console.log("Unregistering SSE listener");
                eventSource.close();
            };
        }
        
    }, [eventSource]);

    return (
        <div className="game-area">
            <div class="row">
                <div class="col-12">
                    <MessageList messages={broadcastMessageBuffer.getMessages()}></MessageList>
                </div>
            </div>
            <div class="row sticky-top" style={{ backgroundColor: 'white', paddingBottom: "1em" }}>
                <div class="col-lg-3 col-sm-3 col-xs-12 ingredient-container">
                    <WordTargetComponent word={props.gameState.word1}></WordTargetComponent>
                </div>

                <div className="col-lg-1 col-sm-1 col-xs-12 my-auto">
                    <div style={{ textAlign: 'center', display: 'block' }}>
                        <select value={operator} 
                                onChange={(e) => e.target && setOperator((e.target as HTMLInputElement).value)} 
                                style={{ fontSize: '2em', fontFamily: 'monospace', display: 'inline-block', width: '100%', textAlign: 'center' }}>
                            <option value="add">+</option>
                            <option value="subtract">-</option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-3 col-xs-12 ingredient-container">
                    <WordTargetComponent word={props.gameState.word2}></WordTargetComponent>
                </div>

                <div className="col-lg-1 col-sm-1 col-xs-12 my-auto">
                    <span style={{ fontSize: '2em', fontFamily: 'monospace', display: 'inline-block', width: '100%', textAlign: 'center' }}>=</span>
                </div>

                <div className="col-lg-3 col-sm-3 col-xs-12 my-auto">
                    <AnswerArea gameState={props.gameState}></AnswerArea>
                </div>
            </div>

            <div class="row" style={{ paddingBottom: "100px" }}>
                <div className="col-12">
                    <WordPaletteComponent words={props.gameState.words} gameState={props.gameState} />
                </div>
            </div>

            <div className={`game-area ${isMobile() ? 'fixed-bottom' : ''}`}>
                <div className="row">
                    <div className="col-12">
                        <CalculateButton gameState={props.gameState}></CalculateButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
