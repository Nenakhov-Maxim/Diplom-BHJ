

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {    
    super(element);
    this.renderAccountsList(this.data);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList(data) {     
    if (!data) {
      data = User.current();
    }   
    Account.list(data, (err, response) => {      
      let input = this.element.querySelector('[name="account_id"]');      
      input.innerHTML = '';
      response.data.forEach(element => {
        input.insertAdjacentHTML('beforeEnd', 
        `
        <option value="${element.id}">${element.name}</option>
        `);
      });
      
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {  
    Transaction.create(data, () => {
      App.update();
      const newTransactionModal = new Modal(this.element.closest('div.modal'));
        this.element.reset();      
        newTransactionModal.close();
    });
  }
}