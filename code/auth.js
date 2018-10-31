const OAuth = require('oauth-1.0a');
var oauthSignature = require('oauth-signature');

 export const oauth = (props) => OAuth({
  
  consumer: { key:props.CONSUMER_KEY, secret: props.CONSUMER_SECRET}, // React native Progress keys
  
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
   
      var initialSeparator = base_string.indexOf('&');
      var basePath = decodeURIComponent( base_string.substring(initialSeparator+1, base_string.indexOf('&', 5)))
      var search = decodeURIComponent(base_string.substring(base_string.indexOf('&', 5)+1))
      var parameters = JSON.parse('{"' + (search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
      var tokenSecret = parameters.oauth_secret;
  
      if(basePath.indexOf('request-token') > 0)
          parameters.oauth_callback = 'x-com-frogtrade-frogprogress-oauth://success'
          console.log("screat"+parameters.CONSUMER_SECRET);
      var encodedSignature;
      var consumer_SECRET = parameters.CONSUMER_SECRET;
      
      if(tokenSecret){     
        
          delete parameters.oauth_secret
          basePath = encodeURIComponent (basePath);
          encodedSignature = oauthSignature.generate('POST', basePath, parameters, consumer_SECRET, tokenSecret, { encodeSignature: false})
      }
      else
          encodedSignature = oauthSignature.generate('GET', basePath, parameters,consumer_SECRET)

      return encodedSignature;
  }
})

export const oauth1 =  (props) => OAuth({
  
    consumer: { key:props.CONSUMER_KEY, secret:props.CONSUMER_SECRET}, // React native Progress keys
    
    signature_method: 'HMAC-SHA1',
     hash_function(base_string, key) {
  
       var initialSeparator = base_string.indexOf('&');
       initialSeparator = base_string.indexOf('&');
       var methodType = base_string.substring(0, initialSeparator);
       var basePath = decodeURIComponent( base_string.substring(initialSeparator+1, base_string.indexOf('&', 5)))
    
       var search = decodeURIComponent(base_string.substring(base_string.indexOf('&', 5)+1))
  
       var parameters = JSON.parse('{"' + (search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

       if(parameters.sections)
        parameters.sections = decodeURIComponent(parameters.sections);
  
       var tokenSecret = parameters.oauth_secret;
       delete parameters.oauth_secret
       var encodedURI = encodeURIComponent (basePath);

       var consumer_SECRET = parameters.CONSUMER_SECRET;
       delete parameters.CONSUMER_SECRET

       var encodedSignature = oauthSignature.generate(methodType, basePath, parameters,consumer_SECRET, tokenSecret,{ encodeSignature: false})
  
       if(basePath.indexOf('access-token')>-1)
            encodedSignature = encodeURIComponent(encodedSignature)
       return encodedSignature;
     }
   });
   

// export {oauth,oauth1};
