import { useState } from 'react';

const CopyText = props => {
	const [copied, setCopied] = useState(props.text);
	return (
		<div
			onClick={() => {
				navigator.clipboard.writeText(props.text);
				setCopied('copied');
			}}
		>
			{copied}
		</div>
	);
};
export default CopyText;
