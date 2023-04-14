import helper_black from '../../assets/helper_black_transparent.png';
import { Login } from '../../icons';

const Navbar = () => {
	return (
		<nav class='navbar navbar-expand-lg bg-body-tertiary'>
			<div class='container-fluid'>
				<a class='navbar-brand' href='#'>
					<img src={helper_black} alt='logo' width='120' height='80' />
				</a>
				<button
					class='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>
				<div class='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul class='navbar-nav me-auto mb-2 mb-lg-0'>
						<li class='nav-item'>
							<a class='nav-link active fs-4 mx-4' aria-current='page' href='#'>
								Orders
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link active fs-4 mx-4' aria-current='page' href='#'>
								POs
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link active fs-4 mx-4' aria-current='page' href='#'>
								Reports
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link active fs-4 mx-4' aria-current='page' href='#'>
								Suppliers
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link active fs-4 mx-4' aria-current='page' href='#'>
								Items
							</a>
						</li>
					</ul>
					<Login />
					<button class='btn btn-outline-black fs-4' type='submit'>
						Log out
					</button>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
