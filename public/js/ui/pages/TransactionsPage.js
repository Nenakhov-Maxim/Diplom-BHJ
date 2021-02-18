

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {    
    if ( !element ) {
      throw new Error( 'Элемент не существует' );
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element
    .querySelector('.remove-account')
    .addEventListener('click', () => {      
      this.removeAccount();
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(confirm('Вы уверены, что хотите удалить счет?')) {      
      Account.remove(this.lastOptions.account_id,  () => {        
       this.clear();
       App.update()
      });
    } 
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if(confirm('Вы уверены, что хотете удалить транзакцию?')) {      
      Transaction.deleteTransaction(id, () =>  { 
      App.update();      
      //document.querySelector(`[data-id="${id}"]`).closest('div.transaction').remove();
      });
    }
    

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options) {
      this.clear();
      this.lastOptions = options;
      Account.get(options.account_id, (response) =>  {
        this.renderTitle(response.data.name);       
        Transaction.list(this.lastOptions.account_id, (err, response) => {
          this.renderTransactions(response.data);
        });    
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {    
    let data = [];      
    this.renderTransactions(data);
    this.renderTitle('«Название счёта»');
    this.lastOptions =  {};
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){       
    this.h1 = this.element.querySelector('.content-title');
    this.h1.innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let optionsDate = {year: 'numeric', month: 'long', day: 'numeric'};    
    let newDate = new Date(date);
    let newTime =  `${newDate.getHours()}:${newDate.getMinutes()}`;
    return `${newDate.toLocaleDateString('ru-RU', optionsDate)}, в ${newTime}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    
    let formDate = this.formatDate(item.created_at);
    this.element.querySelector('.content').insertAdjacentHTML('afterBegin', 
    `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${formDate}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">        
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">          
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>
    `)    
  }  
  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    if (data.length === 0) {    
     this.element.querySelector('.content').remove();
     let emptyContent = document.createElement('section');
     emptyContent.classList.add('content');   
     this.element.querySelector('.content-header').insertAdjacentElement('afterEnd', emptyContent);     
    } else  {
      data.forEach(item => {
        this.getTransactionHTML(item);        
      });
      const removeItem = document.getElementsByClassName('transaction__remove');
        Array.from(removeItem).forEach(element => {
          element.addEventListener('click', () => {
          this.removeTransaction(element.dataset.id);
          })
        });
    }     
    
  }
}