import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

const Contact = () => {
	return (
		<div id='contact-us' className='c-wrapper'>
			<div className='paddings innerWidth flex flex-col md:flex-row justify-between items-center c-container'>
				{/* Left Side */}
				<div className='flex flex-col gap-2 c-left'>
					<span className='text-orange-500'>Contact Us</span>
					<span className='text-2xl font-bold'>We're Easy to Reach</span>
					<span className='text-gray-600'>
						We are always ready to help by providing the best services for you.
						We believe a good place to live can make your life better.
					</span>

					<div className='flex flex-col gap-4 contactModes'>
						{/* First Row */}
						<div className='flex gap-6 row'>
							<div className='flex flex-col items-center mode p-4 border border-gray-300 rounded transition-all hover:scale-105 hover:shadow-md'>
								<div className='flex items-center gap-4'>
									<div className='flex items-center justify-center icon'>
										<MdCall size={25} />
									</div>
									<div className='flex flex-col items-start detail'>
										<span className='text-lg font-semibold'>Call</span>
										<span className='text-gray-500'>021 123 145 14</span>
									</div>
								</div>
								<button className='w-full bg-lightBlue text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white'>
									Call Now
								</button>
							</div>

							<div className='flex flex-col items-center mode p-4 border border-gray-300 rounded transition-all hover:scale-105 hover:shadow-md'>
								<div className='flex items-center gap-4'>
									<div className='flex items-center justify-center icon'>
										<BsFillChatDotsFill size={25} />
									</div>
									<div className='flex flex-col items-start detail'>
										<span className='text-lg font-semibold'>Chat</span>
										<span className='text-gray-500'>021 123 145 14</span>
									</div>
								</div>
								<button className='w-full bg-lightBlue text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white'>
									Chat Now
								</button>
							</div>
						</div>

						{/* Second Row */}
						<div className='flex gap-6 row'>
							<div className='flex flex-col items-center mode p-4 border border-gray-300 rounded transition-all hover:scale-105 hover:shadow-md'>
								<div className='flex items-center gap-4'>
									<div className='flex items-center justify-center icon'>
										<BsFillChatDotsFill size={25} />
									</div>
									<div className='flex flex-col items-start detail'>
										<span className='text-lg font-semibold'>Video Call</span>
										<span className='text-gray-500'>021 123 145 14</span>
									</div>
								</div>
								<button className='w-full bg-lightBlue text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white'>
									Video Call Now
								</button>
							</div>

							<div className='flex flex-col items-center mode p-4 border border-gray-300 rounded transition-all hover:scale-105 hover:shadow-md'>
								<div className='flex items-center gap-4'>
									<div className='flex items-center justify-center icon'>
										<HiChatBubbleBottomCenter size={25} />
									</div>
									<div className='flex flex-col items-start detail'>
										<span className='text-lg font-semibold'>Message</span>
										<span className='text-gray-500'>021 123 145 14</span>
									</div>
								</div>
								<button className='w-full bg-lightBlue text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white'>
									Message Now
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className='flex justify-end c-right'>
					<div className='image-container'>
						<img
							src='./contact.jpg'
							alt='Contact Us'
							className='w-full rounded-lg shadow-md'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
