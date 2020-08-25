import got, { OptionsOfTextResponseBody } from "got";
import { ISupportedLanguage, isSupported } from "./languages";
import { GoogleTranslateParams } from "./google-translate-params";
var GoogleTranslateToken = require("google-translate-token");
var safeEval = require("safe-eval");

export type ITranslateOptions = {
  fromLanguage: ISupportedLanguage;
  toLanguage: ISupportedLanguage;
};

export type IGoogleTranslateResponse = {
  translatedWord: string;
  definitions: { [key: string]: any };
  example: Array<string>;
};

export class GoogleTranslate {
  private responseBody: Array<any> = [];
  private URL = "https://translate.google.com/translate_a/single";

  async translate(
    text: string,
    option: ITranslateOptions
  ): Promise<IGoogleTranslateResponse> {
    var e: any;

    [option.fromLanguage, option.toLanguage].forEach(function (lang) {
      if (lang && !isSupported(lang)) {
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

    const token: { name: string; value: number } = await this._generateToken(
      text
    );
    const params = new GoogleTranslateParams({
      ...option,
      token: token.value,
      searchWord: text,
    });

    const resBody = await this._fetchResult(params);
    this.responseBody = safeEval(resBody);

    return {
      translatedWord: this._getTranslatedWord(),
      definitions: this._getDefinition(),
      example: this._getExample(),
    };
  }

  private async _fetchResult(
    params: GoogleTranslateParams
  ): Promise<string | null> {
    try {
      const result: any = await got(this.URL + params.toString());
      return result.body;
    } catch (error) {
      throw error;
    }
  }

  private _getExample(): Array<string> {
    let result: Array<string> = [];
    const examples = this.responseBody?.[13]?.[0];
    examples?.forEach((d: any) => {
      result.push(d[0]);
    });
    return result;
  }

  private _getDefinition(): { [key: string]: any } {
    let result: { [key: string]: any } = {};
    const definitions = this.responseBody?.[12];
    definitions?.forEach((d: any) => {
      result[d[0]] = [d[1][0][0], d[1][0][2]];
    });
    return result;
  }

  private _getTranslatedWord(): string {
    let transaltedWord = "";

    this.responseBody?.[0]?.forEach(function (obj: any) {
      transaltedWord += obj?.[0] ?? "";
    });
    return transaltedWord;
  }

  private async _generateToken(
    searchWord: string
  ): Promise<{ name: string; value: number }> {
    return GoogleTranslateToken.get(searchWord);
  }
}
