/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebarToggle =  document.getElementsByClassName('sidebar-toggle')[0];
    sidebarToggle.addEventListener('click', ()=> {
      let body = document.getElementsByClassName('skin-blue')[0];
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let login = document.getElementsByClassName('menu-item_login');
    let register = document.getElementsByClassName('menu-item_register');
    let logout = document.getElementsByClassName('menu-item_logout');    
    login[0].querySelector('a').addEventListener('click', ()=>  {      
      new Modal( App.getModal('login').element).open();
    });
    register[0].querySelector('a').addEventListener('click', ()=>  {      
      new Modal( App.getModal('register').element).open();
    });
    logout[0].querySelector('a').addEventListener('click', ()=>  {      
      User.logout(User.current(), () => {
        App.setState('init');
        App.update();
        App.updateForms();        
      });
    }); 
  }
}