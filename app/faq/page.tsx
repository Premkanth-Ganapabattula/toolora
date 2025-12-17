
export default function FAQ(){
 const schema={
  '@context':'https://schema.org',
  '@type':'FAQPage',
  'mainEntity':[{
    '@type':'Question',
    'name':'Is Toolora free?',
    'acceptedAnswer':{'@type':'Answer','text':'Yes, all tools are free.'}
  }]
 };
 return (
  <div style={{padding:20,maxWidth:800,margin:'auto'}}>
   <h2>FAQ</h2>
   <p><strong>Is Toolora free?</strong> Yes.</p>
   <script type="application/ld+json"
    dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  </div>
 );
}
