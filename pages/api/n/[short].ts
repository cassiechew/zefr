// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Url from '../../../db/db';

const base = "https://zefr.xyz/"

/**
 * generate, creates a random length-8 string for the new url to return
 * @returns {Promise<string>} The randomly generated stringto append to the base
 */
const generate = async () : Promise<string> => {
  const rand = Math.random().toString(16).substr(2, 8);
  const ok = await Url.find({short: rand}).exec()
  if (ok.length === 0) {
    return rand
  }
  return generate()
}

/**
 * handler to create the shorter url
 * @param {NextApiRequest} req 
 * @param {NextApiResponse<Api.Data>} res 
 */
const handler: Api.ApiHandler = async (req: NextApiRequest, res: NextApiResponse<Api.Data>)  => {
  if (req.method === 'GET') {

    const { short } = req.query
    let ext : string = ""
    let httpUrl : string = '';
    
    if (typeof short === 'string') {
      httpUrl = short
    } else {
      httpUrl = short[0]
    }

    /**
     * Checks for an existing entered long link from client and returns
     * the existing shortened link if it exists. Otherwise it generates
     * one
     */
    const ex = await Url.find({long: httpUrl}).exec()
    if (ex.length !== 0) {
      ext = ex[0].short
    } else {
      ext = await generate();
      console.debug(httpUrl)
      const newUrl = new Url({ short: ext, long: httpUrl });
      await newUrl.save().then(() => console.log("Inserted: " + newUrl.toString()));
    }

    res.status(200).json({ new: base + ext} )
    return
  }
  
  res.status(404).json({ new: "failed" })
}

export default handler