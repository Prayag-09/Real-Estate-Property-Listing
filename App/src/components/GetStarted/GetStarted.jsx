import React from 'react';

const GetStarted: React.FC = () => {
	return (
		<div id='get-started' className='bg-gray-100 py-16'>
			<div className='max-w-6xl mx-auto px-4 flex justify-center'>
				<div className='flex flex-col items-center text-center gap-6 bg-blue-600 p-8 rounded-lg border-4 border-blue-400 shadow-lg'>
					<span className='text-white font-semibold text-4xl'>
						Get started with Hom
					</span>
					<span className='text-white/70 text-lg'>
						Subscribe and find super attractive price quotes from us.
						<br />
						Find your residence soon
					</span>
					<a
						href='mailto:prayagtushar2016@gmail.com'
						className='bg-blue-500 border-2 border-white text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700'>
						Get Started
					</a>
				</div>
			</div>
		</div>
	);
};

export default GetStarted;
