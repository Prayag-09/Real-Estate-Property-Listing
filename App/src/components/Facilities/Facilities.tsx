/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext } from 'react';
import UserDetailContext from '../../context/UserDetailContext';
import useProperties from '../../hooks/useProperties';
import { toast } from 'react-toastify';
import { createResidency } from '../../utils/api';

const Facilities: React.FC<{
	prevStep: () => void;
	propertyDetails: any;
	setPropertyDetails: (details: any) => void;
	setOpened: (opened: boolean) => void;
	setActiveStep: (step: number) => void;
}> = ({
	prevStep,
	propertyDetails,
	setPropertyDetails,
	setOpened,
	setActiveStep,
}) => {
	const { user } = useAuth0();
	const {
		userDetails: { token },
	} = useContext(UserDetailContext);
	const { refetch: refetchProperties } = useProperties();

	const [bedrooms, setBedrooms] = React.useState(
		propertyDetails.facilities.bedrooms
	);
	const [parkings, setParkings] = React.useState(
		propertyDetails.facilities.parkings
	);
	const [bathrooms, setBathrooms] = React.useState(
		propertyDetails.facilities.bathrooms
	);
	const [isLoading, setIsLoading] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (bedrooms < 1 || bathrooms < 1) {
			setErrorMessage('Bedrooms and bathrooms must be at least 1');
			return;
		}

		setIsLoading(true);
		setErrorMessage('');

		try {
			await createResidency(
				{
					...propertyDetails,
					facilities: { bedrooms, parkings, bathrooms },
				},
				token
			);
			toast.success('Added Successfully', { position: 'bottom-right' });

			setPropertyDetails({
				title: '',
				description: '',
				price: 0,
				country: '',
				city: '',
				address: '',
				image: null,
				facilities: {
					bedrooms: 0,
					parkings: 0,
					bathrooms: 0,
				},
				userEmail: user?.email,
			});
			setOpened(false);
			setActiveStep(0);
			refetchProperties();
		} catch (error) {
			toast.error(
				(error as any).response?.data?.message || 'Error adding property',
				{ position: 'bottom-right' }
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='max-w-xs mx-auto my-4'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				{/* Bedrooms Input */}
				<div>
					<label className='block text-gray-700' htmlFor='bedrooms'>
						No of Bedrooms
					</label>
					<input
						type='number'
						id='bedrooms'
						min={0}
						value={bedrooms}
						onChange={(e) => setBedrooms(Number(e.target.value))}
						required
						className='border border-gray-300 rounded p-2 w-full'
					/>
				</div>

				{/* Parkings Input */}
				<div>
					<label className='block text-gray-700' htmlFor='parkings'>
						No of Parkings
					</label>
					<input
						type='number'
						id='parkings'
						min={0}
						value={parkings}
						onChange={(e) => setParkings(Number(e.target.value))}
						className='border border-gray-300 rounded p-2 w-full'
					/>
				</div>

				{/* Bathrooms Input */}
				<div>
					<label className='block text-gray-700' htmlFor='bathrooms'>
						No of Bathrooms
					</label>
					<input
						type='number'
						id='bathrooms'
						min={0}
						value={bathrooms}
						onChange={(e) => setBathrooms(Number(e.target.value))}
						required
						className='border border-gray-300 rounded p-2 w-full'
					/>
				</div>

				{/* Error Message */}
				{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

				{/* Action Buttons */}
				<div className='flex justify-center mt-4'>
					<button
						type='button'
						onClick={prevStep}
						className='bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2'>
						Back
					</button>
					<button
						type='submit'
						className={`bg-green-500 text-white rounded px-4 py-2 ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={isLoading}>
						{isLoading ? 'Submitting' : 'Add Property'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Facilities;
