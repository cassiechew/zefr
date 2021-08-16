// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../db/db'

import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'OPTIONS'],
  })
)

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Run cors
  await cors(req, res)
  
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
