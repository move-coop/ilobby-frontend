import React from 'react'

const TwitterEmbed = (props) => {

    return (
      <div>
        {props.twitter ? (
          <div>
            <a className="twitter-timeline" data-theme="dark" href={`https://twitter.com/${props.twitter}?ref_src=twsrc%5Etfw`}>Loading</a> 
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          </div>
        ) : (
            "THERE IS NO TWITTER!"
          )}
      </div>

      
    );

}

export default TwitterEmbed
