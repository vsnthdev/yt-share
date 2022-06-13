/*
 *  A serverless function to render the response.
 *  Created On 12 June 2022
 */

import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

// https://snaplink.dev/4d87b6bd7c?video=NhEn4H5UK9A&color=208ef3&w=1200&h=630

export default async (
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse> => {
    const { video } = req.query

    // reject for favicon.ico 🤷‍♂️
    if (video == 'favicon.ico') return res.status(204).send('')
    
    // fetch video information
    const { data: vid }: { data: string } = await axios({
        method: 'GET',
        url: `https://www.youtube.com/watch?v=${video}`
    })

    // grab all meta tags from YouTube's video page
    const meta = vid.match(/<meta[^>]+content="([^")]*)"/g) as string[]

    // get both the title and description's values
    const title = meta.find(tag => tag.startsWith('<meta name="title" '))?.split('"')[3]
    const desc = meta.find(tag => tag.startsWith('<meta name="description" '))?.split('"')[3]

    // cache it for 1 full week
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable')

    // send a specially crafted HTML redirect response
    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title} - YouTube</title>
            <meta http-equiv="refresh" content="0;url=https://www.youtube.com/watch?v=${video}" />

            <meta name="description" content="${desc}" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property="og:site_name" content="${title} - YouTube" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="${title} - YouTube" />
            <meta property="og:description" content="${desc}" />
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
