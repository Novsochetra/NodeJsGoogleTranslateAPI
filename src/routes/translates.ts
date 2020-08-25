import { NextFunction, Request, Response } from "express";

import express from "express";
import { GoogleTranslate } from "../lib/google-translate";

const router = express.Router();

router
  .route("/translates")
  .get(async function (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response<any>> {
    const googleTranslate = new GoogleTranslate();
    try {
      const query: any = req.query?.["q"] ?? "";
      const from: any = req.query?.["from"] ?? "auto";
      const to: any = req.query?.["to"] ?? "auto";

      const resp = await googleTranslate.translate(query, {
        fromLanguage: from,
        toLanguage: to,
      });

      return res.json({ data: resp, status: res.statusCode });
    } catch (error) {
      console.log("ERROR: ", error);
      return res.json({ data: null, status: 500, error });
    }
  });

export default router;
