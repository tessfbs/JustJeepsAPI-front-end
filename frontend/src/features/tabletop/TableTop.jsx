import {
	DollarCircleOutlined,
	LikeOutlined,
	CalendarOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useDashboardData } from '../../hooks/useDashboardData';

const TableTop = (orderCount) => {
	console.log('orderCount', orderCount);
	const { state } = useDashboardData();
	return (
		<Row gutter={16}>
			<Col span={8}>
				<Card bordered={false}>
					<Statistic
						title='Total Orders'
						value={orderCount.orderCount}
						precision={0}
						valueStyle={{
							color: '#3f8600',
						}}
						prefix={<LikeOutlined />}
					/>
				</Card>
			</Col>
			<Col span={8}>
				<Card bordered={false}>
					<Statistic
						title='Today is AMAZING!'
						value={new Date().toLocaleString() + ''}
						// precision={2}
						valueStyle={{
							color: '#4B0082',
						}}
						prefix={<CalendarOutlined />}
					/>
				</Card>
			</Col>
			<Col span={8}>
				<Card bordered={false}>
					<Statistic
						title='Total Revenue'
						value={parseInt(state.totalSum).toLocaleString()}
						precision={2}
						valueStyle={{
							color: '#145DA0',
						}}
						prefix={<DollarCircleOutlined />}
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default TableTop;
