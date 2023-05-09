import helper_black from '../../assets/helper_black_transparent.png';
import { Login, Logout, ImageAvatars } from '../../icons';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Link } from 'react-router-dom';
import logo_jeeps from './logo_jeeps.png';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container'>
				<Link className='nav-link active fs-5 mx-4' to='/'>
					<img src={logo_jeeps} alt='logo'/>
				</Link>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link
								className='aria-current nav-link active fs-5 mx-4'
								to='/dashboard'
							>
								Dashboard
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link active fs-5 mx-4'
								aria-current='page'
								to='/orders'
							>
								Orders
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='aria-current nav-link active fs-5 mx-4' to='/po'>
								POs
							</Link>
						</li>

						<li className='nav-item'>
							<Link
								className='aria-current nav-link active fs-5 mx-4'
								to='/suppliers'
							>
								Suppliers
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='aria-current nav-link active fs-5 mx-4'
								to='/items'
							>
								Explore
							</Link>
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
