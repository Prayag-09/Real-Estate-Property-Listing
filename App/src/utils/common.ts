export const getMenuStyles = (menuOpened: unknown) => {
	if (document.documentElement.clientWidth <= 800) {
		return { right: !menuOpened && '-100%' };
	}
};

export const sliderSettings = {
	slidesPerView: 1,
	spaceBetween: 50,
	breakpoints: {
		480: {
			slidesPerView: 1,
		},
		600: {
			slidesPerView: 2,
		},
		750: {
			slidesPerView: 3,
		},
		1100: {
			slidesPerView: 4,
		},
	},
};

export const updateFavourites = (id: string, favourites: string[]) => {
	if (favourites.includes(id)) {
		return favourites.filter((resId: string) => resId !== id);
	} else {
		return [...favourites, id];
	}
};

export const checkFavourites = (id: string, favourites: string | unknown[]) => {
	return favourites?.includes(id) ? '#fa3e5f' : 'white';
};

export const validateString = (value: string) => {
	return value?.length < 3 || value === null
		? 'Must have atleast 3 characters'
		: null;
};
