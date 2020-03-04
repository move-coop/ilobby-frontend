import React from 'react'
import { Grid } from 'semantic-ui-react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const TwitterEmbed = (props) => {

    return (
      // <div>
      //   {/* {props.twitter ? ( */}
      //     <div>
      //       {/* <a className="twitter-timeline" data-theme="dark" href={`https://twitter.com/${props.twitter}?ref_src=twsrc%5Etfw`}>Loading</a>  */}
      //       <a className="twitter-timeline" data-theme="dark" href={`https://twitter.com/Biaggi4NY?ref_src=twsrc%5Etfw`}>Loading</a> 
      //       <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      //     </div>
      //   {/* ) : (
      //       "THERE IS NO TWITTER!"
      //     )} */}
      // </div>

      // <div className="centerContent">
      //   <div className="selfCenter standardWidth">
      
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={`${props.twitter}`}
            theme="dark"
            noHeader
            noFooter
            options={{ height: 600, width: 600 }}
          />
      
    );

}

export default TwitterEmbed
