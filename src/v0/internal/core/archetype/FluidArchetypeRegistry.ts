
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { FluidArchetype } from "./FluidArchetype.js";

export class FluidArchetypeRegistry {
    private readonly map = new Map<bigint, FluidArchetype>();

    has(bitSet: bigint): boolean {
        return this.map.has(bitSet);
    }

    get(bitSet: bigint): FluidArchetype {
        if (!this.map.has(bitSet)) {
            throw new Error(`Could not retrieve archetype with bitset '${bitSet.toString()}'. Not found.`);
        }
        return this.map.get(bitSet);
    }

    getOrCreate(bitSet: bigint): FluidArchetype {
        let archetype = this.map.get(bitSet);

        if (!archetype) {
            archetype = new FluidArchetype(bitSet);
            this.map.set(bitSet, archetype);
        }

        return archetype;
    }

    add(archetype: FluidArchetype): void {
        this.map.set(archetype.getBitSet(), archetype);
    }

    remove(bitSet: bigint): void {
        if (!this.map.delete(bitSet)) {
            throw new Error(`Could not remove archetype with bitset '${bitSet.toString()}'. Not found.`);
        }
    }
}