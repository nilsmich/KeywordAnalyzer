import * as https from 'https'

export const getSynonym = (word: string): string => {
    let data = ''
    https.get(`https://www.openthesaurus.de/synonyme/​search?q=${word}&format=application/json`, (resp) => {
        resp.on('data', (chunk) => {
            data += chunk
        })

        resp.on('end', () => {
            console.log(JSON.parse(data).explanation)
        })
    }).on('error', (err) => {
        console.log('Error: ' + err.message)

        return null
    })

    return data
}
