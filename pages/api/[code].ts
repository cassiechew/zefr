// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Url from '../../db/db'
import NextCors from 'nextjs-cors'

/**
 * handler to return the long url
 * @param {NextApiRequest} req 
 * @param {NextApiResponse<Api.Data>} res 
 */
const handler: Api.ApiHandler = async (req: NextApiRequest, res: NextApiResponse<Api.Data>)  => {
  // Run cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code } = req.query
  const urlq = await Url.findOne({short: `${code}`}).exec()
  console.log("Sending: " + urlq.long)
  res.send({ new: urlq.long})
}

export default handler
