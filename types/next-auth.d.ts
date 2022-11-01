import { Session } from "next-auth";

// /** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    user?:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          id?: string | null | undefined;
        }
      | undefined;
  }
}
