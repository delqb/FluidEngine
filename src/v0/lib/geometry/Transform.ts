
/** 
    Released under MIT License
    Copyright (c) 2025 Del Elbanna
*/

import {Vec2} from "./Vector2.js";

export type Transform = {
    translate?: Vec2;
    rotate?: number;
    scale?: number;
}

export function createTransform({ translate = undefined, rotate = undefined, scale = undefined } = {}): Transform {
    return { translate, scale, rotate } as Transform;
}