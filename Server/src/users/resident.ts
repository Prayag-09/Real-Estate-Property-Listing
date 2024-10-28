import { PrismaClient, Prisma } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Function to create a residency
export const createResidency = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const {
			title,
			description,
			price,
			address,
			country,
			city,
			facilities,
			image,
			userEmail,
		} = req.body.data;

		try {
			const residency = await prisma.residency.create({
				data: {
					title,
					description,
					price,
					address,
					country,
					city,
					facilities,
					image,
					owner: { connect: { email: userEmail } },
				},
			});
			res
				.status(201)
				.json({ message: 'Residency created successfully', residency });
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					res
						.status(400)
						.json({ message: 'A residency with this address already exists.' });
					return;
				}
			} else if (err instanceof Error) {
				console.error(err.message);
				res
					.status(500)
					.json({ message: 'An unknown error occurred.', error: err.message });
				return;
			}
			res
				.status(500)
				.json({
					message: 'An unknown error occurred. Please try again later.',
				});
		}
	}
);

// Function to get all the documents/residencies
export const getAllResidencies = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		try {
			const residencies = await prisma.residency.findMany({
				orderBy: {
					createdAt: 'desc',
				},
			});
			res.status(200).json(residencies);
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({
					message: 'An error occurred while retrieving residencies.',
					error: err instanceof Error ? err.message : 'Unknown error',
				});
		}
	}
);

// Function to get a specific document/residency
export const getResidency = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const residency = await prisma.residency.findUnique({
				where: { id },
			});
			if (!residency) {
				res.status(404).json({ message: 'Residency not found' });
				return;
			}
			res.status(200).json(residency);
		} catch (err) {
			console.error(err);
			res
				.status(500)
				.json({
					message: 'An error occurred while retrieving the residency.',
					error: err instanceof Error ? err.message : 'Unknown error',
				});
		}
	}
);
