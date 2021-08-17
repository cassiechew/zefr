// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Url from '../../../db/db';

const base = "https://zefr.xyz/"

type Data = {
  new: string
}

const addhttp = (url : string) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "https://" + url;
  }
  
  return url;
}

const generate = async () : Promise<string> => {
  const rand = Math.random().toString(16).substr(2, 8);
  const ok = await Url.find({short: rand}).exec()
  if (ok.length === 0) {
    return rand
  }
  return generate()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {

    const { short } = req.query
    let httpUrl : string = '';

    
    if (typeof short === 'string') {
      httpUrl = addhttp(short)
    } else {
      httpUrl = addhttp(short[0])
    }

    const ex = await Url.find({long: httpUrl}).exec()
    let ext : string = ""
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
