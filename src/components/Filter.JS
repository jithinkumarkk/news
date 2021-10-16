import React from 'react';
import { Select } from 'semantic-ui-react';
const NewsFilterOptions = [
    { key: 'relevancy', value: 'relevancy', text: 'relevancy' },
    { key: 'popularity', value: 'popularity', text: 'popularity' },
    { key: 'publishedAt', value: 'publishedAt', text: 'publishedAt' },
    { key: 'relevancy', value: 'relevancy', text: 'relevancy' }, 
]
const SelectFilter = () => (
    <Select placeholder='Filter' options={NewsFilterOptions} />
  )
  
  export default SelectFilter