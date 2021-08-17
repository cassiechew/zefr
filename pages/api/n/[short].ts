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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    
    const { short } = req.query
    const rand = Math.random().toString(16).substr(2, 8);
    let httpUrl : string = '';
    if (typeof short === 'string') {
      httpUrl = addhttp(short)
    } else {
      httpUrl = addhttp(short[0])
    }

    console.log(httpUrl)
    const newUrl = new Url({ short: rand, long: httpUrl });

    await newUrl.save().then(() => console.log("Inserted: " + newUrl.toString()));

    res.status(200).json({ new: base + rand} )
    return
  }
  
  res.status(404).json({ New: "failed" })
}
