/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
 static URL = '/transaction';

 static deleteTransaction(id, callback) {
  createRequest({
    url: this.URL,
    method: 'DELETE',
    responseType: 'json',
    id},
    (response) => { 
      if(response.error){
        throw new Error(response.error);
      } else  {          
        callback(undefined, response);
      }          
    }); 
 }
}

