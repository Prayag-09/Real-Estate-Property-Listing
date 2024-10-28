import { PrismaClient, User } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createUser = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body as { email: string };

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			res.status(400).json({ message: 'User already exists' });
			return;
		}

		const newUser: User = await prisma.user.create({ data: { email } });

		res.status(201).json({
			message: 'User registered successfully',
			user: { id: newUser.id, email: newUser.email },
		});
	}
);

// Book a visit
export const bookVisit = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email, date } = req.body as { email: string; date: Date };
		const { id } = req.params as { id: string };

		const user = await prisma.user.findUnique({
			where: { email },
			select: { bookedVisits: true },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const isAlreadyBooked = user.bookedVisits?.some(
			(visit: any) => visit.id === id
		);
		if (isAlreadyBooked) {
			res
				.status(400)
				.json({ message: 'The property has already been booked!' });
			return;
		}

		await prisma.user.update({
			where: { email },
			data: { bookedVisits: { push: { id, date } } }, // Ensure this aligns with your schema
		});

		res.status(201).json({ message: 'Visit booked successfully' });
	}
);

// Get all bookings
export const getBookings = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body as { email: string };

		const bookings = await prisma.user.findUnique({
			where: { email },
			select: { bookedVisits: true },
		});

		if (!bookings || bookings.bookedVisits.length === 0) {
			res.status(404).json({ message: 'No bookings found for this user' });
			return;
		}

		res.status(200).json(bookings);
	}
);

export const cancelBookings = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body as { email: string };
		const { id } = req.params as { id: string };

		const user = await prisma.user.findUnique({
			where: { email },
			select: { bookedVisits: true },
		});

		if (!user || !user.bookedVisits) {
			res.status(404).json({ message: 'User or bookings not found' });
			return;
		}

		const updatedVisits = user.bookedVisits.filter(
			(visit: any) => visit.id !== id
		);

		const sanitizedVisits = updatedVisits.filter((visit) => visit !== null);

		await prisma.user.update({
			where: { email },
			data: { bookedVisits: sanitizedVisits },
		});

		res.status(200).json({ message: 'Booking cancelled successfully' });
	}
);

// Add plot to fav
export const addFav = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body as { email: string };
		const { rid } = req.params as { rid: string };

		const user = await prisma.user.findUnique({
			where: { email },
			select: { favResidenciesID: true },
		});

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		if (user.favResidenciesID.includes(rid)) {
			const updatedUser = await prisma.user.update({
				where: { email },
				data: {
					favResidenciesID: {
						set: user.favResidenciesID.filter((id) => id !== rid),
					},
				},
			});
			res
				.status(200)
				.json({ message: 'Removed from favorites', user: updatedUser });
		} else {
			const updatedUser = await prisma.user.update({
				where: { email },
				data: {
					favResidenciesID: { push: rid }, // Ensure this aligns with your schema
				},
			});
			res
				.status(200)
				.json({ message: 'Added to favorites', user: updatedUser });
		}
	}
);

// Get all fav
export const getFav = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email } = req.body as { email: string };

		const liked = await prisma.user.findUnique({
			where: { email },
			select: { favResidenciesID: true },
		});

		if (!liked || liked.favResidenciesID.length === 0) {
			res.status(404).json({ message: 'User not found or no favorites' });
			return;
		}

		res.status(200).json(liked);
	}
);
