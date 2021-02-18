/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {         
       Account.create(data, () => {
        const loginModal = new Modal(this.element.closest('div.modal'));
        this.element.reset();      
        loginModal.close();            
        App.update();
       });       
  } 
}