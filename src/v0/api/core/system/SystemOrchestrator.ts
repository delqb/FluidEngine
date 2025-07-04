
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeIndex } from "../node/NodeIndex.js";
import { ECSSystemPhase } from "./SystemPhase.js";

export interface ECSSystemOrchestrator {
    hasPhase(phase: ECSSystemPhase): boolean;
    addPhase(phase: ECSSystemPhase, phaseOrder: number): void;
    pushPhase(phase: ECSSystemPhase): void;
    pushPhases(...phases: ECSSystemPhase[]): void
    removePhase(phase: ECSSystemPhase): void;
    getPhases(): Iterable<ECSSystemPhase>;
    update(nodeIndex: ECSNodeIndex): void;
}