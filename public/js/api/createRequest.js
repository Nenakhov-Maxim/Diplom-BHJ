/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
  // Запрос операций по счет
  if (options.method === "GET" && options.url === '/transaction') {
    const xhr = new XMLHttpRequest;    
    xhr.open(`${options.method}`, 
    `${options.url}?account_id=${options.data}`);
    xhr.responseType = options.responseType;
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState===4){                           
        callback(xhr.response);
        }
    }
  } 
  //Запрос авторизованного пользователя
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
  // Запрос по конкретному счету
  if (options.method === "GET" && options.url === '/account' && !options.data && options.id) {      
    const xhr = new XMLHttpRequest;    
    xhr.open(`${options.method}`, 
    `${options.url}/${options.id}`);
    xhr.responseType = options.responseType;
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState===4){                         
        callback(xhr.response);
        }
    }   
  }    
//Вызывает запрос метод List, для обновления счетов
  if (options.method === "GET" && options.url === '/account' && options.data) {      
    const xhr = new XMLHttpRequest;    
    xhr.open(`${options.method}`, 
    `${options.url}?mail=${options.data.email}&name=${options.data.name}&
    id=${options.data.id}`);
    xhr.responseType = options.responseType;
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState===4){                   
        callback(xhr.response);
        }
    }   
  } 
  // Регистрация в приложении        
  if (options.url === '/user/register' && options.method === 'POST') {
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "email", `${options.data.email}` );
    formData.append( "password", `${options.data.password}`);
    formData.append("name", `${options.data.name}`); 
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){        
        callback(xhr.response.error, xhr.response);      
      }
    }    
  }
  // Авторизация в приложении 
  if (options.url === '/user/login' && options.method === 'POST') {
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "email", `${options.data.email}` );
    formData.append( "password", `${options.data.password}`);       
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){        
        callback(xhr.response.error, xhr.response);      
      }
    }    
  }
  //Выход из своего аккаунта
  if (options.url === '/user/logout'&& options.method === 'POST') {
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "id", `${options.data.id}` );             
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){        
        callback(xhr.response.error, xhr.response);      
      }
    }    
  }
  // Создание нового счета
  if (options.url === '/account' && options.method === 'PUT') {
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "name", `${options.data.name}` );             
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){               
        callback(xhr.response);      
      }
    }    
  }
  //Удаление транзакции
  if (options.url === '/transaction' && options.method === 'DELETE') {
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "id", `${options.id}` );             
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){              
        callback(xhr.response);      
      }
    }    
  }
  //Создание транзакции
  if (options.url === '/transaction' && options.method === 'PUT') {    
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "type", `${options.data.type}` );
    formData.append( "name", `${options.data.name}` );
    formData.append( "sum", `${options.data.sum}` );
    formData.append( "account_id", `${options.data.account_id}`);                
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){                      
        callback(xhr.response);      
      }
    }    
  }
  //Удаление счета
  if (options.url === '/account' && options.method === 'DELETE') {    
    const xhr = new XMLHttpRequest,
    formData = new FormData;  
    formData.append( "id", `${options.data}` );             
    xhr.open(`${options.method}`, `${options.url}` );
    xhr.responseType = options.responseType;
    xhr.send(formData);
    xhr.onreadystatechange =  function() {
      if(xhr.readyState===4){                      
        callback(xhr.response);      
      }
    }    
  }     
};
