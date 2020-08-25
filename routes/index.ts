import translateRouter from "./translates";

export default class BaseRouter {
  constructor() {}

  all() {
    return [translateRouter];
  }
}
