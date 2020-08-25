"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const translates_1 = __importDefault(require("./translates"));
class BaseRouter {
    constructor() { }
    all() {
        return [translates_1.default];
    }
}
exports.default = BaseRouter;
