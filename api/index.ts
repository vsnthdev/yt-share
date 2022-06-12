/*
 *  A serverless function to render the response.
 *  Created On 12 June 2022
 */

import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse> => {
    return res.send('Hello from Serverless 👋')
}
