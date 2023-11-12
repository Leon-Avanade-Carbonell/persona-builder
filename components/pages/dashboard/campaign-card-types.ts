export const campaignWritingTone = [
  'formal',
  'informal',
  'persuasive',
  'informative',
  'instructional',
  'professional',
  'funny',
  'silly'
] as const

export type CampaignWritingToneType = (typeof campaignWritingTone)[number]

export const ageGroups = [
  'teenagers',
  'young adults',
  'middle age adults',
  'seniors'
] as const

export type AgeGroupType = (typeof ageGroups)[number]

export type CampaignCardType = {
  id?: string
  title: string
  writingTone: CampaignWritingToneType
  ageGroup?: AgeGroupType
}

export const defaultCampaignCard: CampaignCardType = {
  title: '',
  writingTone: 'informative'
}
