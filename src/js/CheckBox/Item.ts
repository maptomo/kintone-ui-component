import Control, {ControlProps} from '../Control';
import {mdiCheckBold} from '@mdi/js'

import '../../css/Item.css';

type ItemData = {
    value: string
    label: string
    isDisabled: boolean
}

type ItemProps = ControlProps & {
    value: string
    label: string
    className?: string;
    isDisabled: boolean 
    isSelected: boolean;
    onChange?: (item: Item) => void;
}

class Item extends Control {
    protected _props: ItemProps = {
      ...this._props, ...{
        isSelected: false,
        isDisabled: false,
        className: "",
      }
    }

    private inputCheckboxElement: HTMLInputElement
    constructor(params: ItemProps) {
        super()
        if (params) {
          this._props = {...this._props, ...params}
        }
    
        this.element = document.createElement(`${this._props.isMobile ? 'li' : 'span'}`)
        this.element.className = `kuc-input-checkbox-item${this._props.isMobile ? '-mobile' : ''}`

        const inputCheckboxElement = document.createElement('input')
        const inputCheckboxID = new Date().getTime() + '-' + this.generateGUID() + '-' + this.generateGUID()
        inputCheckboxElement.type = 'checkbox'
        inputCheckboxElement.checked = this._props.isSelected
        inputCheckboxElement.disabled = this._props.isDisabled
        inputCheckboxElement.id = inputCheckboxID
        
        this.inputCheckboxElement = inputCheckboxElement
        this.element.appendChild(inputCheckboxElement)

        const labelForCheckboxElement = document.createElement('label')
        labelForCheckboxElement.htmlFor = inputCheckboxID;
        if (this._props.isMobile) {

            const checkboxLabel = document.createElement('span')
            checkboxLabel.append(this._props.label)
            labelForCheckboxElement.appendChild(checkboxLabel);

            const pathEl = document.createElementNS('http://www.w3.org/2000/svg','path')
            pathEl.setAttribute('d',mdiCheckBold)
            const iconEl = document.createElementNS('http://www.w3.org/2000/svg','svg')
            iconEl.appendChild(pathEl);

            const checkboxIcon = document.createElement('span')
            checkboxIcon.className = 'kuc-checkbox-mobile-icon'
            checkboxIcon.appendChild(iconEl)
            labelForCheckboxElement.appendChild(checkboxIcon);

        } else {
            labelForCheckboxElement.append(this._props.label)
        }
        this.element.appendChild(labelForCheckboxElement)
        
        this.inputCheckboxElement.addEventListener('change', (e) => {
            this._props.isSelected = this.inputCheckboxElement.checked;
            if(this._props.onChange) {
                this._props.onChange(this)
            }
        })
        
        this.rerender()
    }


    rerender(changedAttr?: Array<string>){
        if (!changedAttr) return;

        if (changedAttr.indexOf('isSelected') !== -1) {
            this.inputCheckboxElement.checked = this._props.isSelected 
        }
        if (changedAttr.indexOf('isDisabled') !== -1) {
            this.inputCheckboxElement.disabled = this._props.isDisabled
        }
    }


    getValue(){
        return this._props.value;
    }

    select() {
        this._props.isSelected = true
        this.rerender(['isSelected', 'isDisabled'])
    }

    deselect() {
        this._props.isSelected = false
        this.rerender(['isSelected', 'isDisabled'])
    }
    disable() {
        this._props.isDisabled = true
        this.rerender(['isSelected', 'isDisabled'])
    }
    
    enable() {
        this._props.isDisabled = false
        this.rerender(['isSelected', 'isDisabled'])
    }

    generateGUID() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    };

}

export default Item;
export {ItemData};