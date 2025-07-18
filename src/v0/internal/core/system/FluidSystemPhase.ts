
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSNodeIndex } from "../../../api/core/node/NodeIndex.js";
import { ECSNodeSchema } from "../../../api/core/node/schema/NodeSchema.js";
import { ECSSystem } from "../../../api/core/system/System.js";
import { ECSSystemPhase } from "../../../api/core/system/SystemPhase.js";
import { OrderedList } from "../../../api/core/util/OrderedList.js";
import { OrderedArrayList } from "../../../lib/structures/OrderedArrayList.js";


export class FluidSystemPhase implements ECSSystemPhase {
    private readonly systemList: OrderedList<ECSSystem<ECSNodeSchema>> = new OrderedArrayList();
    constructor(
        private readonly name: string,
        readonly preUpdate?: () => void,
        readonly postUpdate?: () => void
    ) { }

    getName(): string {
        return this.name;
    }

    hasSystem<S extends ECSNodeSchema>(system: ECSSystem<S>): boolean {
        return this.systemList.has(system);
    }

    addSystem<S extends ECSNodeSchema>(system: ECSSystem<S>, inPhaseOrder: number): void {
        if (this.systemList.has(system)) {
            throw new Error(`Failed to add system '${system.getSystemMeta().systemName}' to phase '${this.name}': system has already been added.`);
        }
        this.systemList.insert(system, inPhaseOrder);
    }

    pushSystem(system: ECSSystem<ECSNodeSchema>): void {
        this.addSystem(system, this.systemList.getSize());
    }

    pushSystems(...systems: ECSSystem<ECSNodeSchema>[]): void {
        systems.forEach(system => this.pushSystem(system));
    }

    removeSystem<S extends ECSNodeSchema>(system: ECSSystem<S>): void {
        if (!this.systemList.has(system)) {
            throw new Error(`Failed to remove system '${system.getSystemMeta().systemName}' from phase '${this.name}': system was not found.`);
        }
        this.systemList.remove(system);
    }

    getSystems(): Iterable<ECSSystem<ECSNodeSchema>> {
        return this.systemList.getAll();
    }

    update(nodeIndex: ECSNodeIndex): void {
        try {
            this.preUpdate?.();
        } catch (error) {
            console.error(`Failed to complete phase '${this.getName()}' pre-update:\n${error}`);
        }

        for (const system of this.systemList.getAll()) {
            try {
                system.updateNodes(nodeIndex.getNodesWithSchema(system.getSystemMeta().nodeSchemaMeta));
            }
            catch (error) {
                console.error(`Failed to complete system '${system.getSystemMeta().systemName}' update:\n${error}`);
            }
        }

        try {
            this.postUpdate?.();
        } catch (error) {
            console.error(`Failed to complete phase '${this.getName()}' post-update:\n${error}`);
        }
    }

}