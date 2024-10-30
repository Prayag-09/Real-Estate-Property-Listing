import React from 'react';
import { useForm } from '@mantine/form';
import { validateString } from '../../utils/common';
import { Button, Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../hooks/useCountries';
import Map from '../Map/Map';

interface AddLocationProps {
	propertyDetails: {
		country?: string;
		city?: string;
		address?: string;
	};
	setPropertyDetails: React.Dispatch<
		React.SetStateAction<{
			country?: string;
			city?: string;
			address?: string;
		}>
	>;
	nextStep: () => void;
}

const AddLocation: React.FC<AddLocationProps> = ({
	propertyDetails,
	setPropertyDetails,
	nextStep,
}) => {
	const { getAll } = useCountries();
	const form = useForm({
		initialValues: {
			country: propertyDetails?.country || '',
			city: propertyDetails?.city || '',
			address: propertyDetails?.address || '',
		},

		validate: {
			country: (value) => validateString(value),
			city: (value) => validateString(value),
			address: (value) => validateString(value),
		},
	});

	const { country, city, address } = form.values;

	const handleSubmit = () => {
		const { hasErrors } = form.validate();
		if (!hasErrors) {
			setPropertyDetails((prev) => ({ ...prev, city, address, country }));
			nextStep();
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}>
			<div className='flex flex-col md:flex-row justify-between gap-12 mt-12'>
				{/* Left side (form inputs) */}
				<div className='flex flex-col gap-4 flex-1'>
					<Select
						className='w-full'
						withAsterisk
						label='Country'
						clearable
						searchable
						data={getAll()}
						{...form.getInputProps('country', { type: 'input' })}
					/>

					<TextInput
						className='w-full'
						withAsterisk
						label='City'
						{...form.getInputProps('city', { type: 'input' })}
					/>

					<TextInput
						className='w-full'
						withAsterisk
						label='Address'
						{...form.getInputProps('address', { type: 'input' })}
					/>
				</div>

				{/* Right side (Map component) */}
				<div className='flex-1'>
					<Map address={address} city={city} country={country} />
				</div>
			</div>

			<Group position='center' mt='xl'>
				<Button type='submit'>Next Step</Button>
			</Group>
		</form>
	);
};

export default AddLocation;
