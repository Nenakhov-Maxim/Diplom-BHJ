/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {  
  if (options.method === "GET" && options.url !== '/user/current' ) {    
    const xhr = new XMLHttpRequest;
    let newXhrString = '';
    if (typeof options.data === 'string')  {
      xhr.open(`${options.method}`, 
    `${options.url}/${options.data}`);
    } else {
      for (let key in options.data) {
      if(options.data.hasOwnProperty(key)){       
        newXhrString = newXhrString.concat(`${key}=${options.data[key]}&`);        
      }
    }         
    xhr.open(`${options.method}`, 
    `${options.url}?${newXhrString.slice(0, newXhrString.length-1)}`);
    };     
    xhr.responseType = options.responseType;    
    xhr.send();    
    xhr.onreadystatechange = function() {
      if(xhr.readyState===4){                                                           
        callback(xhr.response);
        }
    }
  } else {
    const xhr = new XMLHttpRequest,
    formData = new FormData; 
    if (typeof options.data === 'string')  {
      formData.append(`id`, `${options.data}`);
    } else {
    for (let key in options.data) {
      if(options.data.hasOwnProperty(key)) {       
        formData.append(`${key}`, `${options.data[key]}`);     
      }
    }
  }         
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){                   
        callback(xhr.response);      
      }
    }    
  }   
  //Запрос авторизованного пользователя. Исправить!
  if (options.method === "GET" && options.url === '/user/current') {       
    const xhr = new XMLHttpRequest;    
    xhr.open(`${options.method}`, 
    `${options.url}?mail=${options.data.email}&password=${options.data.password}&
    id=${options.data.id}`);
    xhr.responseType = options.responseType;
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState===4){                
        callback(xhr.response);
        }
    }   
  }    
};
