import './user-list.scss';
import DOMElement from '../../../../../../shared/components/base-elements/dom-element';
import { UsersList } from '../../../../../../shared/models/state';
import UserCard from '../../user-card/user-card';
import setAdminService from '../../../../../services/account-page/set-admin/set-admin.service';

export default class UserList extends DOMElement {
  private title: DOMElement;

  private list: DOMElement;

  private cardContainer: DOMElement;

  private userCard: UserCard | null = null;

  constructor(parentNode: HTMLElement, data: UsersList[]) {
    super(parentNode, {
      tagName: 'div',
      classList: ['user-list'],
    });

    this.cardContainer = new DOMElement(null, { tagName: 'div' });

    this.title = new DOMElement(this.node, {
      classList: ['user-list__title'],
      content: 'Пользователи',
      tagName: 'h3',
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['user-list__list'],
    });
    setAdminService.registerUserList(this.list.node);

    data.forEach((userData, index) => {
      if (userData.role !== 'admin' && userData.login !== 'admin') {
        this.cardContainer = new DOMElement(this.list.node, {
          tagName: 'li',
          classList: this.checkStyle(userData),
        });
        this.createUserCard(this.cardContainer.node, data[index]);
        this.cardContainer.node.addEventListener(
          'click',
          setAdminService.appendAdmin.bind(setAdminService, data[index])
        );
      }
    });
  }

  private createUserCard(parentNode: HTMLElement, data: UsersList) {
    this.userCard = new UserCard(parentNode, data);
  }

  private checkStyle(data: UsersList) {
    if (data.role === 'banned') {
      return ['user-list__card', 'user-list__card--banned'];
    }

    if (data.role === 'admin') {
      return ['user-list__card', 'user-list__card--admin'];
    }

    return ['user-list__card'];
  }
}
