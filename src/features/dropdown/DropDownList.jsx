import { Select } from 'antd';
import { useState } from 'react';

const DropDownList = () => {
	const [selectedValue, setSelectedValue] = useState('Meyer');
	const handleChange = value => {
		setSelectedValue(value);
	};
	return (
		<Select
			defaultValue='Meyer'
			style={{
				width: 120,
			}}
			onChange={value => handleChange(value)}
			options={[
				{
					value: 'Meyer',
					label: 'Meyer',
				},
				{
					value: 'Keyston',
					label: 'Keyston',
				},
				{
					value: 'Omix',
					label: 'Omix',
				},
				{
					value: 'Quadratec',
					label: 'Quadratec',
				},
			]}
		/>
	);
};
export default DropDownList;
