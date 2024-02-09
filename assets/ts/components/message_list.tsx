import { Signal } from "@preact/signals";

export function MessageList(props: {messages: Signal<string[]>}) {
    return (
        <div>
            {props.messages.value.map((message) => {
                return (
                    <div>
                        {message}
                    </div>
                );
            })}
        </div>
    );
}