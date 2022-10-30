import dynamic from 'next/dynamic'

const DynamicApp = dynamic(() => import('../general/HomePage'), {
  ssr: false
})

export default () => <DynamicApp />