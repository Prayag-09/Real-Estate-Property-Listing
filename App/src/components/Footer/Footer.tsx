import React from 'react';

const Footer: React.FC = () => {
	return (
		<div className='border-t border-gray-300'>
			<div className='flex justify-between items-start p-4 md:flex-col md:items-center md:justify-center'>
				{/* Left Side */}
				<div className='flex flex-col items-start gap-4'>
					<img src='./logo2.png' alt='Logo' width={120} />
					<span className='text-gray-600'>
						Our vision is to make all people <br />
						the best place to live for them.
					</span>
				</div>

				{/* Right Side */}
				<div className='flex flex-col items-start'>
					<span className='text-xl font-semibold'>Information</span>
					<span className='text-gray-600'>145 New York, FL 5467, USA</span>
					<div className='flex gap-6 mt-6 font-medium'>
						<span>Property</span>
						<span>Services</span>
						<span>Product</span>
						<span>About Us</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
