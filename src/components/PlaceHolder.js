import React from 'react'
import { Placeholder, PlaceholderHeader, PlaceholderImage, PlaceholderLine } from 'semantic-ui-react'

const NewsPlaceholder = () => (
 

<div className="news-card">
<div className="meta">
   <div className="photo" >
   <Placeholder>
       <PlaceholderImage/>
    </Placeholder>    
       </div>
    
</div>
<div className="description"> 
        
       <div className="clear"></div>
       <small className="author"><Placeholder> <Placeholder.Line /> </Placeholder></small>
       <h1><Placeholder><PlaceholderHeader /> <PlaceholderLine />  </Placeholder></h1>
       <p><Placeholder><Placeholder.Paragraph /><PlaceholderLine /><PlaceholderLine />  </Placeholder></p>
       
       <div className="clear"></div>
       <p className="read-more">  <Placeholder><PlaceholderLine />  </Placeholder>  </p>
     
</div>
</div>
)

export default NewsPlaceholder