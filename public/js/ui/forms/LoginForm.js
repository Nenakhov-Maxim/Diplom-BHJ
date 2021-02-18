

/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {          
    User.login(data, () => {
      let currentUser = User.current();    
      if (currentUser !== null) {
        const loginModal = new Modal(this.element.closest('div.modal'));
        this.element.reset();      
        loginModal.close();              
        App.setState('user-logged');        
    }
    });      
    
  }  
}