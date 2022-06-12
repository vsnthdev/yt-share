/*
 *  A serverless function to render the response.
 *  Created On 12 June 2022
 */

import { VercelRequest, VercelResponse } from '@vercel/node'
import { youtube } from 'scrape-youtube'

// https://snaplink.dev/4d87b6bd7c?video=NhEn4H5UK9A&color=208ef3&w=1200&h=630

export default async (
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse> => {
    const { video } = req.query

    // reject for favicon.ico 🤷‍♂️
    if (video == 'favicon.ico') return res.status(204).send('')
    
    // fetch video information
    const data = (await youtube.search(video as string)).videos[0]

    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${data.title} - YouTube</title>
            <meta http-equiv="refresh" content="0;url=https://www.youtube.com/watch?v=${video}" />

            <meta name="description" content="${data.description}" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property="og:site_name" content="${data.title} - YouTube" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="${data.title} - YouTube" />
            <meta property="og:description" content="${data.description}" />
            <meta property="og:url" content="https://www.youtube.com/watch?v=${video}" />
            <meta property="og:image" content="https://img.snaplink.dev/4d87b6bd7c/?video=${video}&color=208ef3&w=1200&h=630" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${data.title} - YouTube" />
            <meta name="twitter:url" content="https://www.youtube.com/watch?v=${video}" />
            <meta name="twitter:image" content="https://img.snaplink.dev/4d87b6bd7c/?video=${video}&color=208ef3&w=1200&h=630" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
        </head>
    </html>
    `)
}
