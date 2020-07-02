import {IKeywordSuggestion} from './components/types'

export const copyToClipboard = (newClip: string) => {
  navigator.clipboard.writeText(newClip).then(() => {
    console.log('coppied to clipboard')
  }, () => {
    console.log('copy to clipboard failed for ', newClip)
  })
}

export const toText = (textObj: IKeywordSuggestion[]) => {
  return textObj.map(t => t.keyword).join(' ')
}
