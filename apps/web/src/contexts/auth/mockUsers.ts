import { hashPasswordSync } from "../../utils/password";
import type { User } from "./auth.types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "super-admin",
    password: hashPasswordSync("super-admin"),
    email: "super-admin@example.com",
    name: "Super Admin",
    rolesMask: 1, // (1 << ROLES.super_admin) = 1
    permissionsMask: 15, // (1|2|4|8) = 15
    featuresMask: 89, // (1+8+16+64) = 89
  },
  {
    id: "2",
    username: "patient",
    password: hashPasswordSync("patient"),
    email: "patient@example.com",
    name: "Patient User",
    rolesMask: 2, // ROLES.PATIENT
    permissionsMask: 2, // PERMISSIONS.READ = 2
    featuresMask: 5, // (1+4) = 5
  },
  {
    id: "3",
    username: "facility-admin",
    password: hashPasswordSync("facility-admin"),
    email: "facility-admin@example.com",
    name: "Facility Admin",
    rolesMask: 4, // ROLES.FACILITY_ADMIN
    permissionsMask: 7, // (1+2+4) = 7
    featuresMask: 546, // (2+32+512) = 546
  },
  {
    id: "4",
    username: "department-admin",
    password: hashPasswordSync("department-admin"),
    email: "department-admin@example.com",
    name: "Department Admin",
    rolesMask: 8, // ROLES.DEPARTMENT_ADMIN
    permissionsMask: 14, // (2+4+8) = 14
    featuresMask: 272, // (16+256) = 272
  },
  {
    id: "5",
    username: "org-admin",
    password: hashPasswordSync("org-admin"),
    email: "org-admin@example.com",
    name: "Org Admin",
    rolesMask: 16, // ROLES.ORG_ADMIN
    permissionsMask: 5, // (1+4) = 5
    featuresMask: 3074, // (1024+2048+2) = 3074
  },
  {
    id: "6",
    username: "doctor",
    password: hashPasswordSync("doctor"),
    email: "doctor@example.com",
    name: "Doctor User",
    rolesMask: 32, // ROLES.DOCTOR
    permissionsMask: 6, // 2+4=6
    featuresMask: 640, // (128+512) = 640
  },
];
