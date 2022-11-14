import BaseComponentView from './basic_component_view.js';

/**
 * [Интерфейс] View_model для View
 * @class BasicComponent
 */
export default class BasicComponent {
 root: any;
 view: any;
 /**
  * Конструктор
  */
 constructor() {
     this.root = document.createElement('div');
     this.view = new BaseComponentView();
 }

 /**
  * Перерисовка подконтрольного элемента
  * @return {HTMLElement}
  */
 render() {
     return document.createElement('div');
 }

 /**
  * Подписка на связанные события
  */
 subscribe() {
 }
}