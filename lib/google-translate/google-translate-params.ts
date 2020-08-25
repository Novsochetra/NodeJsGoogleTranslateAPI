import { ISupportedLanguage } from "./languages";
import { Utf8AsciiBinaryEncoding } from "crypto";

export class GoogleTranslateParams {
  private client: string;
  private sl: ISupportedLanguage;
  private tl: ISupportedLanguage;
  private hl: ISupportedLanguage;
  private dt: Array<string>;
  private ie: Utf8AsciiBinaryEncoding;
  private oe: Utf8AsciiBinaryEncoding;
  private otf: number;
  private ssel: number;
  private tsel: number;
  private kc: number;
  private tk: number;
  private q: string;

  constructor({
    fromLanguage,
    toLanguage,
    token,
    searchWord,
  }: {
    fromLanguage: ISupportedLanguage;
    toLanguage: ISupportedLanguage;
    token: number;
    searchWord: string;
  }) {
    this.client = "gtx";
    this.sl = fromLanguage;
    this.tl = toLanguage;
    this.hl = toLanguage;
    this.dt = [
      "at",
      "bd",
      "ex",
      "ld",
      "md",
      "qca",
      "rw",
      "rm",
      "sos",
      "ss",
      "t",
    ];
    this.ie = "utf8";
    this.oe = "utf8";
    this.otf = 0;
    this.ssel = 0;
    this.tsel = 0;
    this.kc = 7;
    this.tk = token;
    this.q = searchWord;
  }

  toString() {
    return `?client=${this.client}&sl=${this.sl}&tl=${this.tl}&hl=${this.hl}& dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&ie=${this.ie}&oe=${this.oe}&otf=${this.otf}&ssel=${this.ssel}&tsel=${this.tsel}&kc=${this.kc}&tk=${this.tk}&q=${this.q}`;
  }
}
