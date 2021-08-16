// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../db/db'

import NextCors from 'cors'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Run cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({name: ''});
  }
  if (req.method === 'GET') {
    
    const { code } = req.query

    const urlq = await db.Url.findOne({short: `${code}`}).exec()
    console.log("Q: " + JSON.stringify(req.query))
    console.log("C: " + (`${code}`))
    console.log("U: " +urlq)
    res.writeHead(307, {
      Location: "https://google.com",
    })
    return res.end()
  }
  
  res.status(404)
}
