import React from 'react';

import {Helmet} from 'react-helmet-async';

export default function UniDetail(props) {
  const uni = props.location.state;
  console.log(uni);
  
  return (
    <div>
    
      {/* Including the og: meta tags */}
      <Helmet>

        {/* Facebook meta tags */}
        <meta property="og:title" content={uni.name}/>
        <meta property="og:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Etiam massa ligula, congue in quam id, maximus pellentesque quam. 
          Donec sollicitudin lorem libero, ut congue lorem consequat et. 
          Sed egestas nibh ante, eu aliquam sem tristique ac."/>
        <meta property="og:image" content="https://i.ytimg.com/vi/A_6pZU3-QvI/maxresdefault.jpg"/>

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={uni.name} />
        <meta name="twitter:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Etiam massa ligula, congue in quam id, maximus pellentesque quam. 
          Donec sollicitudin lorem libero, ut congue lorem consequat et. 
          Sed egestas nibh ante, eu aliquam sem tristique ac." />
        <meta name="twitter:image" content="https://i.ytimg.com/vi/A_6pZU3-QvI/maxresdefault.jpg" />

      </Helmet> 
      <div>
        <h1 className="my-3">{uni.name}</h1>

        <img 
          src="https://i.ytimg.com/vi/A_6pZU3-QvI/maxresdefault.jpg"
          alt={uni.name}
          style={{width: "70%"}}
          className="my-5"/>

        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Etiam massa ligula, congue in quam id, maximus pellentesque quam. 
          Donec sollicitudin lorem libero, ut congue lorem consequat et. 
          Sed egestas nibh ante, eu aliquam sem tristique ac.</h4>

        <h2 className="my-5">Details</h2>

        <h4 className="my-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Suspendisse tempor volutpat mi ac pretium. 
          Phasellus sodales luctus mi. Duis feugiat pharetra blandit. 
          Maecenas tempor arcu nulla, ac iaculis magna gravida et. 
          Proin lacinia non neque eu convallis. Morbi non pretium mi. 
          Nulla a purus suscipit, fermentum mauris eget, euismod mauris. 
          Quisque vulputate viverra sapien, in posuere odio placerat quis. 
          Sed maximus nibh nisi, vitae mattis eros maximus sit amet.
        </h4>

        <br />

        <h4>Sed rhoncus, ligula posuere gravida porttitor, leo elit pulvinar mauris, non mollis arcu metus id ligula. 
        Sed vel malesuada ipsum. Mauris viverra velit dui, non dictum enim varius molestie. 
        Praesent dolor turpis, convallis ut venenatis at, pharetra ut magna. 
        Pellentesque sed magna in sem egestas mattis eu vel leo. 
        Aliquam vestibulum tristique purus, consectetur ornare nulla porta sed. Donec lobortis ligula eu nisi porta laoreet. 
        Suspendisse quis laoreet odio. In hac habitasse platea dictumst. Donec id tristique mauris.
        </h4>

        <br/>

        <h4 className="my-5">Phasellus scelerisque facilisis est sed tincidunt. 
          Ut viverra orci in odio tincidunt, ultrices varius tellus mollis. 
          Vivamus a enim in dui consectetur sollicitudin. 
          Sed bibendum, nisi nec porta euismod, velit orci dapibus velit, lobortis interdum purus mi vitae massa. 
          Sed suscipit nisl erat, vitae maximus eros aliquam tempus. Vestibulum interdum mauris id elit feugiat blandit. 
          Vestibulum neque nulla, sagittis vel ultrices id, hendrerit vel turpis. Integer aliquet scelerisque maximus. 
          Integer eget lacus consectetur, porta velit non, tempus dui. 
          Fusce diam urna, condimentum ac libero in, facilisis volutpat enim. 
          Interdum et malesuada fames ac ante ipsum primis in faucibus. 
          Pellentesque at enim vitae dolor aliquet lobortis. Mauris a tincidunt diam, vitae bibendum lectus. 
          Nullam congue metus eget ipsum lacinia tincidunt. In sed metus et enim mollis interdum fringilla sed justo. 
          Praesent lorem dui, commodo a arcu et, lobortis molestie lorem.
        </h4>

        <br/>
        
        {/* Row for two buttons including contact us and website of the university */}
        <div className="row my-5">

          <div className="col-md-6 d-flex justify-content-center">
            <a href="https://www.azent.com"><button className="btn btn-lg btn-info mx-5">Contact us</button></a>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <a href={uni.web_page}><button className="btn btn-lg btn-secondary mx-5">Visit the Website</button></a>
          </div>
          
        </div>

      </div>
    </div>
  )
}
