// Core Authentication & User Domain Types matching backend Prisma schema and Better Auth

export type Role =
  | 'DEPARTMENT_HEAD'
  | 'STUDENT'
  | 'MENTOR'
  | 'COMPANY_REP'
  | 'SUPERVISOR'
  | 'DEFENSE_COMMITTEE';

export type PortalType = 'INSIDER' | 'OUTSIDER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING_PASSWORD_CHANGE';

export interface UserProfile {
  id: string;
  identifier: string; // Student ID (e.g. UGR/1234/14), Staff ID, or Corporate ID
  name: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  portalType: PortalType;
  status: UserStatus;
  phoneNumber?: string | null;
  companyId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: UserProfile;
  expires: string;
}
