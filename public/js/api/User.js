/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {          
    localStorage.setItem('user', JSON.stringify(user));   
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {    
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {    
    callback();    
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback) {     
    this.URL = '/user'   
     createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data},
       (response) => {        
        if (response.success && response.user) {
          delete response.user.password;         
          this.setCurrent(response.user);
          callback();                  
        } else  {
          throw new Error(response.error);                 
        }                  
    });        
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback) {       
    this.URL = '/user'       
     createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data},
       (response) => {  
          if (response.success && response.user) {         
          this.setCurrent(response.user);
          callback();                  
        } else  {
          throw new Error(err);                 
        }
    }); 
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {        
    this.URL = "/user";
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data:data.id},
      (response) => {
        if (response && response.success) {          
          this.unsetCurrent();                  
          callback();
        } else {
          throw new Error(err);
        }        
    })
  }
}
