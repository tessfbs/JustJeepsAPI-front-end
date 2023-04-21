import { useState } from 'react';

const ValueFromChild = props => {
	const [text, setText] = useState(text);

	const onPressButton = async content => {
		await setText(content);
		getTextFromDrawer(text);
	};

	return (
		<View>
			<Button type='dashed' size={small} onPress={() => onPressButton(text)}>
				{text}
			</Button>
		</View>
	);
};
export default ValueFromChild;
