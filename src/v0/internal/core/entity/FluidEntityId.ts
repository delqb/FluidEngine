
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import { ECSEntityId } from "../../../api/core/entity/EntityId.js";



export class FluidEntityId implements ECSEntityId {
    private symbol: symbol;

    constructor(
        private stringId: string
    ) {
        this.symbol = Symbol(this.stringId);
    }

    getSymbol(): symbol {
        return this.symbol;
    }

    equals(other: ECSEntityId): boolean {
        return other instanceof FluidEntityId ?
            other.symbol === this.symbol :
            other.toString() === this.toString();
    }

    toString(): string {
        return this.stringId;
    }
}