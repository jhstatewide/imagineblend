import { render } from "preact";

interface MyComponentProps {
    name: string;
}

function MyComponent(props: MyComponentProps) {
    return <h1>Hello, {props.name}!</h1>;
}

export function renderMyComponent() {
    let targetElement = document.querySelector("#word-palette");
    render(<MyComponent name="World" />, targetElement!);
}

console.log("IT SHOULD AVE BEEN LOADED!");