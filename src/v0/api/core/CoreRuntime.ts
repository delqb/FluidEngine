
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { Core } from "./Core.js";

export class CoreRuntime {
    private static __instance: Core | null = null;

    static initialize(instance: Core): void {
        if (CoreRuntime.__instance) {
            throw new Error("Core is already initialized.");
        }
        CoreRuntime.__instance = instance;
    }

    static getInstance(): Core {
        if (!CoreRuntime.__instance) {
            throw new Error("Core is not initialized.");
        }
        return CoreRuntime.__instance;
    }

    static nullifyInstance(): void {
        if (!CoreRuntime.__instance) {
            throw new Error("Core is not initialized; instance is already nullified.");
        }
        CoreRuntime.__instance = null;
    }
}