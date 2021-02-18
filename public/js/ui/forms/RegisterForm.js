/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, () => {
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