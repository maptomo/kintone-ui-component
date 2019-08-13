import Control, {ControlProps} from '../Control';
import {elements} from '../utils/util';

import IconButton from '../IconButton';

import '../../css/NotifyPopup.css';

type PopupProps = ControlProps & {
  text?: string;
  type?: string;
}

class NotifyPopup extends Control {
  protected _props: PopupProps = {
    ...this._props,
    ...{
      text: '',
      type: 'error'
    }
  }

  private textEl: any
  private closeButton: IconButton
  private _onClick = (e: Event) => {}
  notifyMesage: HTMLDivElement;

  constructor(params: PopupProps) {
    super();

    if (params) {
      this._props = {...this._props, ...params};
    }
    this.element = this._createPopupLayout()

    this.closeButton.on('click', () => {
      this.hide();
    });
    this.rerender(['text', 'type']);
  }

  private _getStyleByType() {
    const style = {bgClass: '', color: ''};

    switch (this._props.type) {
      case 'success':
        style.bgClass = 'bg-success';
        style.color = 'green';
        break;
      case 'infor':
        style.bgClass = 'bg-infor';
        style.color = 'blue';
        break;
      default:
        style.bgClass = 'bg-danger';
        style.color = this._props.isMobile ? 'transparent' : 'red';
    }
    return style;
  }

  private _createPopupLayout() {
    const containerDOM = document.createElement('div');

    this.textEl = elements(document.createElement('div'))

    if (this._props.isMobile) {
      const notifyBody = document.createElement('ul');

      const notifyMesage = document.createElement('li');

      notifyBody.appendChild(notifyMesage);
      containerDOM.appendChild(notifyBody);

      this.textEl.appendTo(notifyMesage)
    } else {
      this.textEl.addClass('kuc-notify-title')
      this.textEl.appendTo(containerDOM)
    }
    this.textEl.on('click', (e: Event) => {
      if (this._props.isDisabled) return;
      this._onClick(e)
    })

    this.closeButton = new IconButton({type: 'close', color: this._props.isVisible ? 'transparent': undefined});

    elements(document.createElement('div')).addClass('kuc-close-button').appendTo(containerDOM).append(this.closeButton.render());

    return containerDOM;
  }

  on(eventName: string, callback: (params?: any) => void) {
    if (eventName === 'click') this._onClick = callback
  }

  private _getClassName() {
    if (this._props.isMobile) {
      return 'kuc-notify-mobile';
    }

    const className = [
      'kuc-notify',
      this._getStyleByType().bgClass
    ];
    return className.join(' ').trim();
  }

  show() {
    if (this._props.isMobile) {
      this.element.setAttribute('style', 'top: 0');
      this.element.setAttribute('transition', '5s ease')
    } else {
      super.show();
    }
  }

  hide() {
    if (this._props.isMobile) {
      this.element.setAttribute('style', 'top: -1000px');
    } else {
      super.hide();
    }
  }

  rerender(changedAttr?: string[]) {
    super.rerender();
    if (!changedAttr) return;

    if (changedAttr.indexOf('text') !== -1) {
      this.textEl.html(this._props.text);
    }

    if (changedAttr.indexOf('type') !== -1) {
      this.element.className = this._getClassName();
      this.closeButton.setColor(this._getStyleByType().color);
    }
  }

  setText(text: string): void {
    this._props.text = text;
    this.rerender(['text']);
  }

  setType(type: string): void {
    this._props.type = type;
    this.rerender(['type']);
  }

  disable(): void {
    super.disable();
    this.closeButton.disable();
  }

  enable(): void {
    super.enable();
    this.closeButton.enable();
  }
}

export default NotifyPopup;
