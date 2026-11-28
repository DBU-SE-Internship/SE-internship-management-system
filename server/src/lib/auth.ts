import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '../config/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      identifier: {
        type: 'string',
        required: true,
        input: true,
      },
      role: {
        type: 'string',
        required: true,
        input: true,
      },
      portalType: {
        type: 'string',
        required: true,
        input: true,
      },
      status: {
        type: 'string',
        required: true,
        defaultValue: 'PENDING_PASSWORD_CHANGE',
        input: true,
      },
      phoneNumber: {
        type: 'string',
        required: false,
        input: true,
      },
      companyId: {
        type: 'string',
        required: false,
        input: true,
      },
      createdById: {
        type: 'string',
        required: false,
        input: true,
      },
    },
  },
  trustedOrigins: [
    process.env.CLIENT_URL || 'http://localhost:3000',
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
