/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {    
    this.element = element;
    this.getData();
    this.registerEvents();
          
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() { 
    let that = this;
    this.element.addEventListener('submit', nonSubmit);
    function nonSubmit(e)  {     
                                
      e.preventDefault(); 
      that.getData();     
      that.submit();
    }         
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {    
    
    let email = this.element.querySelector('[name="email"]');
    let password = this.element.querySelector('[name="password"]');
    let name = this.element.querySelector('[name="name"]')      

    if (this.element.id === 'register-form') {            
      let data = {
       'email': email.value,
       'password': password.value,
       'name': name.value
    }
      this.data = data;
    }
    
    if (this.element.id === 'login-form') {
      let data = {
        'email': email.value,
         'password': password.value
     }
       this.data = data;
    }
    
    if (this.element.id === 'new-account-form') {
      let data = {
        'name': name.value
     }
       this.data = data;
    }
    if (this.element.id === 'new-income-form' || this.element.id === 'new-expense-form') {      
      let data;
      if (User.current() === null) {
        data = [];
      } else {
         data = User.current();
      }      
      const formData = new FormData(this.element),
      entries = formData.entries();      
      for (let item of entries) {
        const key = item[ 0 ],
          value = item[ 1 ];          
          data[`${key}`] = `${value}`;        
      } 
      this.data = data;
      if (this.element.id === 'new-expense-form') {
        let sum = this.data.sum;        
        this.data.sum = -sum;
      }    
     
    }
  }

  onSubmit(options){

  }
  setNewState(){}  

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(this.data)
  }
}