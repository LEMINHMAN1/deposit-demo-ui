import { User } from "@/types/User";
import { atomWithStorage } from "jotai/utils";
import { PrimitiveAtom, atom } from "jotai";

export const userAtom = atomWithStorage<User | null>("user",null) as PrimitiveAtom<User | null>;