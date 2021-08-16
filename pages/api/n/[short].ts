// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../db/db';

const base = "https://zefr.xyz/"

type Data = {
  new: string
}

const addhttp = (url : string) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}

export default function handler(
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
    const newUrl = new db.Url({ short: rand, long: httpUrl });
    

    newUrl.save().then(() => console.log("Inserted: " + newUrl.toString()));

    console.log(`${short}`)

    res.status(200).json({ new: base + rand} )
  }
  
  // res.status(200).json({ name: 'John Doe' })
}