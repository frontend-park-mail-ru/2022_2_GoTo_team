/**
 * View для соответсвующих страниц
 * @class PageView
 */
export default class PageView {
 children: any;
 root: any;
 /**
  * @param {HTMLElement} root
  */
 constructor(root: any) {
     this.root = root;
     this.children = new Map();
 }

 /**
  * Нарисовать страницу
  */
 render() {
     this.root.innerHTML = '';
 }
}