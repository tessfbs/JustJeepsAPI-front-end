import { Button, Drawer, Radio, Space } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DrawerSupplier = () => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('top');
	const [searchTermSku, setSearchTermSku] = useState('');
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<Drawer
			title='Find your best solution'
			placement={left}
			width={500}
			onClose={onClose}
			open={open}
			extra={
				<Space>
					<CloseOutlined onClick={onClose} />

					<Button type='primary' onClick={onClose}>
						OK
					</Button>
				</Space>
			}
		>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Drawer>
	);
};
export default DrawerSupplier;
