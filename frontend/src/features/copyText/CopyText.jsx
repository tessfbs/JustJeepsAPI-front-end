import { useState } from 'react';

const CopyText = props => {
	const [copied, setCopied] = useState(props.text);
	return (
		<div
			// className='font-medium mr-4 text-green-700 cursor-pointer'
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
