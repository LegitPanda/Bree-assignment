import { Show } from "solid-js";

export const Checkmark = (props) => {
	return (
		<>
			<Show when={props.value === true}>
				<span class="checkmark">✅</span>
			</Show>
			<Show when={props.value === false}>
				<span class="checkmark">❌</span>
			</Show>
		</>
	);
};