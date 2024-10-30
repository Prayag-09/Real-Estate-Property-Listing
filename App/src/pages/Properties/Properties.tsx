import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Properties.css';
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

interface Property {
	id: string;
	title: string;
	city: string;
	country: string;
}

const Properties: React.FC = () => {
	const { data, isError, isLoading } = useProperties();
	const [filter, setFilter] = useState<string>('');

	if (isError) {
		return (
			<div className='wrapper'>
				<span>Error while fetching data</span>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='wrapper flexCenter' style={{ height: '60vh' }}>
				<PuffLoader
					height='80'
					width='80'
					radius={1}
					color='#4066ff'
					aria-label='puff-loading'
				/>
			</div>
		);
	}

	return (
		<div className='wrapper'>
			<div className='flexColCenter paddings innerWidth properties-container'>
				<SearchBar filter={filter} setFilter={setFilter} />

				<div className='paddings flexCenter properties'>
					{data
						?.filter(
							(property: Property) =>
								property.title.toLowerCase().includes(filter.toLowerCase()) ||
								property.city.toLowerCase().includes(filter.toLowerCase()) ||
								property.country.toLowerCase().includes(filter.toLowerCase())
						)
						.map((card: Property, i: number) => (
							<PropertyCard card={card} key={i} />
						))}
				</div>
			</div>
		</div>
	);
};

export default Properties;
