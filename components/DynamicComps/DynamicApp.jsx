import dynamic from 'next/dynamic';

const DynamicApp = dynamic(() => import('../general/HomePage'), {
  ssr: false
})

DynamicApp.displayName='MyApp';

export default function MyApp () { 
return(<DynamicApp />)}