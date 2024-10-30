export interface UserDetails {
	token: string;
	userEmail?: string;
}

export interface UserDetailContextType {
	userDetails: UserDetails;
}

import { createContext } from 'react';

const UserDetailContext = createContext<UserDetailContextType | undefined>(
	undefined
);

export default UserDetailContext;
