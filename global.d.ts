import type { PrismaClient } from "@prisma/client";
import type { MongoClient } from "mongodb";

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
  interface Window {
    my_modal_3: any; // 👈️ turn off type checking
  }
}
