export const callApi = async (url, method = 'GET', data = null, contentType = 'application/json') => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': contentType,
         
        },
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
      });

      console.log("response: ", response);
      
      const responseData = await response.json();
      console.log("response.json: ", responseData);
      return responseData;
  
      //successs code = 0, error code = 1
      // move this to each modal, alert need responseData.msg
      // if (responseData.code === 0) { 
      //   return responseData.data;
      // } else {
      //   throw new Error('API request failed ' + responseData.msg);
      // }
    } catch (error) {
      throw new Error('API request failed');
    }
  }; 
