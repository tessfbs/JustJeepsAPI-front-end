import helper_black from '../../assets/helper_black_transparent.png';
import { Login, Logout, ImageAvatars } from '../../icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='#'>
					<img src={helper_black} alt='logo' width='120' height='80' />
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<a
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								href='#'
							>
								Orders
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								href='#'
							>
								POs
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								href='#'
							>
								Reports
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								href='#'
							>
								Suppliers
							</a>
						</li>
						<li className='nav-item'>
							<a
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								href='#'
							>
								Items
							</a>
						</li>
					</ul>
					<div className='nav-right'>
						<span>
							<ImageAvatars />
						</span>
						<span>
							<button className='btn btn-outline-dark' type='submit'>
								<Logout />
							</button>
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
