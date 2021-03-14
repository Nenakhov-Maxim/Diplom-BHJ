/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {     
    static URL = '/account';
  
  /**
   * Получает информацию о счёте
   * */
  static get(data = '', callback){       
    createRequest({      
      url: '/account',
      method: 'GET',
      responseType: 'json',
      data},
       (response) => {               
        if (response.success && response.data) {      
          callback(response);                  
        } else  {
          throw new Error(response.error);                 
        }                  
    });        
  }
}
