import { Container, Modal, Stepper } from '@mantine/core';
import React, { useState } from 'react';
import AddLocation from '../AddLocation/AddLocation';
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from '../UploadImage/UploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';

interface PropertyDetails {
	title: string;
	description: string;
	price: number;
	country: string;
	city: string;
	address: string;
	image: File | null;
	facilities: {
		bedrooms: number;
		parkings: number;
		bathrooms: number;
	};
	userEmail?: string;
}

interface AddPropertyModalProps {
	opened: boolean;
	setOpened: (opened: boolean) => void;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
	opened,
	setOpened,
}) => {
	const [active, setActive] = useState<number>(0);
	const { user } = useAuth0();

	const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>({
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

	const nextStep = () => {
		setActive((current) => (current < 4 ? current + 1 : current));
	};

	const prevStep = () => {
		setActive((current) => (current > 0 ? current - 1 : current));
	};

	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			closeOnClickOutside
			size={'90rem'}>
			<Container h={'40rem'} w={'100%'}>
				<Stepper
					active={active}
					onStepClick={setActive}
					breakpoint='sm'
					allowNextStepsSelect={false}>
					<Stepper.Step label='Location' description='Address'>
						<AddLocation
							nextStep={nextStep}
							propertyDetails={propertyDetails}
							setPropertyDetails={setPropertyDetails}
						/>
					</Stepper.Step>
					<Stepper.Step label='Images' description='Upload'>
						<UploadImage
							prevStep={prevStep}
							nextStep={nextStep}
							propertyDetails={propertyDetails}
							setPropertyDetails={setPropertyDetails}
						/>
					</Stepper.Step>
					<Stepper.Step label='Basics' description='Details'>
						<BasicDetails
							prevStep={prevStep}
							nextStep={nextStep}
							propertyDetails={propertyDetails}
							setPropertyDetails={setPropertyDetails}
						/>
					</Stepper.Step>
					<Stepper.Step>
						<Facilities
							prevStep={prevStep}
							propertyDetails={propertyDetails}
							setPropertyDetails={setPropertyDetails}
							setOpened={setOpened}
							setActiveStep={setActive}
						/>
					</Stepper.Step>
					<Stepper.Completed>
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>
			</Container>
		</Modal>
	);
};

export default AddPropertyModal;
