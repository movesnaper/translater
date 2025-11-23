import { Buffer } from 'buffer'

const PlaySound  = async ({_id}) => {
    const url = 'https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Laura22k?voiceSpeed=100&'
    const base64 = Buffer.from(_id).toString('base64')
    const str = `${url}inputText=${base64}`
    const audio = new Audio(str)
    audio.type = 'audio/wav'
    const resp = audio.play()
    if (resp!== undefined) resp.then(() => {}).catch(error => {})
}

export default PlaySound