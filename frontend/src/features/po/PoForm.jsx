import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import PoTableTest from './PoTableTest';
import keystone from '../../assets/keystone.png';
import meyer from '../../assets/meyer.png';
import omix from '../../assets/omix.png';
import quadratec from '../../assets/quadratec.png';
const { Header, Sider, Content } = Layout;

export const PoForm = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [currentNav, setCurrentNav] = useState('nav1');

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const handleNavClick = e => {
		setCurrentNav(e.key);
	};

	return (
		<Layout>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{ backgroundColor: '#2938c3' }}
			>
				<div className='logo' />
				<Menu
					mode='inline'
					defaultSelectedKeys={['1']}
					style={{
						backgroundColor: '#2938c3',
						color: '#D4F1F4',
						height: '15px',
						marginTop: '80px',
					}}
					items={[
						{
							key: 'nav1',
							icon: <img src={keystone} alt='keystone' width='100px' />,
						},
						{
							key: 'nav2',
							icon: <img src={meyer} alt='meyer' width='100px' />,
						},
						{
							key: 'nav3',
							icon: <img src={omix} alt='omix' width='100px' />,
						},
						{
							key: 'nav4',
							icon: <img src={quadratec} alt='quadratec' width='100px' />,
						},
					]}
					onSelect={handleNavClick}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>{' '}
					PURCHASE ORDERS DETAILS
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 700,
						background: colorBgContainer,
					}}
				>
					{currentNav === 'nav1' ? (
						<div>
							<PoTableTest vendorId='1' for Keystone />
						</div>
					) : currentNav === 'nav2' ? (
						<div>
							<PoTableTest vendorId='2' for Meyer />
						</div>
					) : currentNav === 'nav3' ? (
						<div>
							<PoTableTest vendorId='3' for Omix />
						</div>
					) : null}
				</Content>
			</Layout>
		</Layout>
	);
};
