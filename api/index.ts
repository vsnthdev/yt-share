/*
 *  A serverless function to render the response.
 *  Created On 12 June 2022
 */

import { VercelRequest, VercelResponse } from '@vercel/node'
import ogs from 'open-graph-scraper'

// https://snaplink.dev/4d87b6bd7c?video=NhEn4H5UK9A&color=208ef3&w=1200&h=630

export default async (
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse> => {
    const { video } = req.query

    // reject for favicon.ico 🤷‍♂️
    if (video == 'favicon.ico') return res.status(204).send('')
    
    // fetch video information
    const data = await ogs({
        url: `https://www.youtube.com/watch?v=${video}`,
        onlyGetOpenGraphInfo: true,
        peekSize: 2048
    }) as any

    const title = data.result.ogTitle
    const description = data.result.ogDescription

    console.clear()
    // console.log(data.result)

    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title} - YouTube</title>
            <meta http-equiv="refresh" content="0;url=https://www.youtube.com/watch?v=${video}" />

            <meta name="description" content="${description}" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property="og:site_name" content="${title} - YouTube" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="${title} - YouTube" />
            <meta property="og:description" content="${description}" />
            <meta property="og:url" content="https://www.youtube.com/watch?v=${video}" />
            <meta property="og:image" content="https://img.snaplink.dev/4d87b6bd7c/?video=${video}&color=208ef3&w=1200&h=630" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${title} - YouTube" />
            <meta name="twitter:url" content="https://www.youtube.com/watch?v=${video}" />
            <meta name="twitter:image" content="https://img.snaplink.dev/4d87b6bd7c/?video=${video}&color=208ef3&w=1200&h=630" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
        </head>
    </html>
    `)
}
