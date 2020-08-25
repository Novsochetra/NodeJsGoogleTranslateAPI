"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_translate_1 = require("../lib/google-translate");
const router = express_1.default.Router();
router
    .route("/translates")
    .get(function (req, res, _next) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const googleTranslate = new google_translate_1.GoogleTranslate();
        try {
            const query = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a["q"]) !== null && _b !== void 0 ? _b : "";
            const from = (_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c["from"]) !== null && _d !== void 0 ? _d : "auto";
            const to = (_f = (_e = req.query) === null || _e === void 0 ? void 0 : _e["to"]) !== null && _f !== void 0 ? _f : "auto";
            const resp = yield googleTranslate.translate(query, {
                fromLanguage: from,
                toLanguage: to,
            });
            return res.json({ data: resp, status: res.statusCode });
        }
        catch (error) {
            console.log("ERROR: ", error);
            return res.json({ data: null, status: 500, error });
        }
    });
});
exports.default = router;
