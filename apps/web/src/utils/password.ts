import { sha256 } from "js-sha256";

export const hashPasswordSync = (password: string): string => sha256(password);
