// typings/common/main.d.ts

declare namespace Api {
    interface Data {
      new: string
    }

    interface ApiHandler {
      (req: NextApiRequest, res: NextApiResponse<Data>)
    }
}
