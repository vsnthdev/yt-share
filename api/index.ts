/*
 *  A serverless function to render the response.
 *  Created On 12 June 2022
 */

import { VercelRequest, VercelResponse } from '@vercel/node'

export default async (
    req: VercelRequest,
    res: VercelResponse,
): Promise<VercelResponse> => {
    const { video } = req.query

    // reject for favicon.ico 🤷‍♂️
    if (video == 'favicon.ico') return res.status(204).send('')
    
    return res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
            <meta http-equiv="refresh" content="0;url=https://www.youtube.com/watch?v=${video}" />

            <meta name="description" content="" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta property="og:site_name" content="Vasanth Developer" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="YT Share" />
            <meta property="og:description" content="" />
            <meta property="og:url" content="https://img.youtube.com/vi/${video}/maxresdefault.jpg" />
            <meta property="og:image" content="" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Yt Share" />
            <meta name="twitter:url" content="https://www.youtube.com/watch?v=${video}" />
            <meta name="twitter:image" content="https://img.youtube.com/vi/${video}/maxresdefault.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
        </head>
    </html>
    `)
}
