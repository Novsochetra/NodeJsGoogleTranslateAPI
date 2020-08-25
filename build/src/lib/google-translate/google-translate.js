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
exports.GoogleTranslate = void 0;
const got_1 = __importDefault(require("got"));
const languages_1 = require("./languages");
const google_translate_params_1 = require("./google-translate-params");
var GoogleTranslateToken = require("google-translate-token");
var safeEval = require("safe-eval");
class GoogleTranslate {
    constructor() {
        this.responseBody = [];
        this.URL = "https://translate.google.com/translate_a/single";
    }
    translate(text, option) {
        return __awaiter(this, void 0, void 0, function* () {
            var e;
            [option.fromLanguage, option.toLanguage].forEach(function (lang) {
                if (lang && !languages_1.isSupported(lang)) {
                    e = new Error();
                    e.code = 400;
                    e.message = `The language ${lang} is not supported`;
                }
            });
            if (e) {
                return new Promise(function (resolve, reject) {
                    reject(e);
                });
            }
            const token = yield this._generateToken(text);
            const params = new google_translate_params_1.GoogleTranslateParams(Object.assign(Object.assign({}, option), { token: token.value, searchWord: text }));
            const resBody = yield this._fetchResult(params);
            this.responseBody = safeEval(resBody);
            return {
                translatedWord: this._getTranslatedWord(),
                definitions: this._getDefinition(),
                example: this._getExample(),
            };
        });
    }
    _fetchResult(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield got_1.default(this.URL + params.toString());
                return result.body;
            }
            catch (error) {
                throw error;
            }
        });
    }
    _getExample() {
        var _a, _b;
        let result = [];
        const examples = (_b = (_a = this.responseBody) === null || _a === void 0 ? void 0 : _a[13]) === null || _b === void 0 ? void 0 : _b[0];
        examples === null || examples === void 0 ? void 0 : examples.forEach((d) => {
            result.push(d[0]);
        });
        return result;
    }
    _getDefinition() {
        var _a;
        let result = {};
        const definitions = (_a = this.responseBody) === null || _a === void 0 ? void 0 : _a[12];
        definitions === null || definitions === void 0 ? void 0 : definitions.forEach((d) => {
            result[d[0]] = [d[1][0][0], d[1][0][2]];
        });
        return result;
    }
    _getTranslatedWord() {
        var _a, _b;
        let transaltedWord = "";
        (_b = (_a = this.responseBody) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.forEach(function (obj) {
            var _a;
            transaltedWord += (_a = obj === null || obj === void 0 ? void 0 : obj[0]) !== null && _a !== void 0 ? _a : "";
        });
        return transaltedWord;
    }
    _generateToken(searchWord) {
        return __awaiter(this, void 0, void 0, function* () {
            return GoogleTranslateToken.get(searchWord);
        });
    }
}
exports.GoogleTranslate = GoogleTranslate;
