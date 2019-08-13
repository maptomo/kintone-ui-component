import Control, {ControlProps} from '../../Control';

const timeList12H = [
  {
    label: '00:00',
    value: '00:00'
  },
  {
    label: '00:30',
    value: '00:30'
  },
  {
    label: '01:00',
    value: '01:00'
  },
  {
    label: '01:30',
    value: '01:30'
  },
  {
    label: '02:00',
    value: '02:00'
  },
  {
    label: '02:30',
    value: '02:30'
  },
  {
    label: '03:00',
    value: '03:00'
  },
  {
    label: '03:30',
    value: '03:30'
  },
  {
    label: '04:00',
    value: '04:00'
  },
  {
    label: '04:30',
    value: '04:30'
  },
  {
    label: '05:00',
    value: '05:00'
  },
  {
    label: '05:30',
    value: '05:30'
  },
  {
    label: '06:00',
    value: '06:00'
  },
  {
    label: '06:30',
    value: '06:30'
  },
  {
    label: '07:00',
    value: '07:00'
  },
  {
    label: '07:30',
    value: '07:30'
  },
  {
    label: '08:00',
    value: '08:00'
  },
  {
    label: '08:30',
    value: '08:30'
  },
  {
    label: '09:00',
    value: '09:00'
  },
  {
    label: '09:30',
    value: '09:30'
  },
  {
    label: '10:00',
    value: '10:00'
  },
  {
    label: '10:30',
    value: '10:30'
  },
  {
    label: '11:00',
    value: '11:00'
  },
  {
    label: '11:30',
    value: '11:30'
  },
  {
    label: '12:00',
    value: '12:00'
  },
  {
    label: '12:30',
    value: '12:30'
  },
  {
    label: '13:00',
    value: '13:00'
  },
  {
    label: '13:30',
    value: '13:30'
  },
  {
    label: '14:00',
    value: '14:00'
  },
  {
    label: '14:30',
    value: '14:30'
  },
  {
    label: '15:00',
    value: '15:00'
  },
  {
    label: '15:30',
    value: '15:30'
  },
  {
    label: '16:00',
    value: '16:00'
  },
  {
    label: '16:30',
    value: '16:30'
  },
  {
    label: '17:00',
    value: '17:00'
  },
  {
    label: '17:30',
    value: '17:30'
  },
  {
    label: '18:00',
    value: '18:00'
  },
  {
    label: '18:30',
    value: '18:30'
  },
  {
    label: '19:00',
    value: '19:00'
  },
  {
    label: '19:30',
    value: '19:30'
  },
  {
    label: '20:00',
    value: '20:00'
  },
  {
    label: '20:30',
    value: '20:30'
  },
  {
    label: '21:00',
    value: '21:00'
  },
  {
    label: '21:30',
    value: '21:30'
  },
  {
    label: '22:00',
    value: '22:00'
  },
  {
    label: '22:30',
    value: '22:30'
  },
  {
    label: '23:00',
    value: '23:00'
  },
  {
    label: '23:30',
    value: '23:30'
  }
];

type TimePickerProps = ControlProps & {
  timeIntervals?: number;
  timeFormat?: string;
  mode?:string;
  hour?:number;
  minute?: number;
  onTimeClick?: (date: Date) => void;
  onMinuteChange?:(minute: number) => void;
  onHourChange?:(hour: number) => void;
}

class TimePicker extends Control {
  protected _props: TimePickerProps = {
    isDisabled: false,
    isVisible: false
  }

  constructor(params?: TimePickerProps) {
    super();
    if (params) {
      this._props = {...this._props, ...params};
    }
  }

  private _renderTimePickerContainer() {
    const timePickerDiv = document.createElement('div');
    timePickerDiv.className = 'time-picker-container';
    this.element = timePickerDiv;
  }

  private _renderTimePickerSelections() {
    const maxMinute = 60;
    const maxHour = 24;
    
    const selectHourEl = document.createElement('select');
    selectHourEl.onchange = () => {
      const selectedValue = selectHourEl.options[selectHourEl.selectedIndex].value;
      if (this._props.onHourChange) {
        this._props.onHourChange(parseInt(selectedValue))
      }
    }
    const selectMinuteEl = document.createElement('select');
    selectMinuteEl.onchange = () => {
      const hours = selectMinuteEl.options[selectMinuteEl.selectedIndex].value;
      if (this._props.onMinuteChange) {
        this._props.onMinuteChange(parseInt(hours))
      }
    }
    if (this._props.isMobile) {
      for (let i = 0; i < maxMinute; i++) {
        if (i < maxHour) {
          const hourOption = document.createElement('option');
          hourOption.value = i + '';
          hourOption.textContent = this.getHourLabel(i)
          hourOption.defaultSelected = (i === this._props.hour)
          selectHourEl.appendChild(hourOption);
        }
        const minuteOption = document.createElement('option');
        minuteOption.textContent = (i < 10) ? `0${i}`: `${i}`;
        minuteOption.defaultSelected = (i === this._props.minute)
        selectMinuteEl.appendChild(minuteOption);
      }
       if (this._props.mode === 'hour') {
        this.element = selectHourEl;
       } else {
        this.element = selectMinuteEl;
       }
    } else {
      timeList12H.forEach((timeObj) => {
        const span = document.createElement('span');
        span.className = 'kuc-time-list-item';
        span.textContent = timeObj.label;
        span.tabIndex = 1;
        span.onclick = (e) => {

        const hour = parseInt(timeObj.value.split(':')[0], 10);
        const minute = parseInt(timeObj.value.split(':')[1], 10);
        this.setSelectTime(hour, minute);
      };
          this.element.appendChild(span);
      });
    }
  }

  setSelectTime(hour: number, minute: number) {
    const tempDate = new Date();
    tempDate.setHours(hour);
    tempDate.setMinutes(minute);
    tempDate.setSeconds(0)
    if (this._props.onTimeClick) {
      this._props.onTimeClick(tempDate);
    }
  }

  getHourLabel(hour:number){
    const halfDayHour= 12; 
    const absoluteHour = hour - halfDayHour;
    if (hour == 0) {
      return 'AM ' + halfDayHour;
    }

    if (absoluteHour < 0) {
      return 'AM ' + ((hour < 10) ? `0${hour}`: hour);
    } if (absoluteHour > 0) {
      return 'PM ' + (absoluteHour < 10 ? `0${absoluteHour}`: hour);
    }
    return 'PM ' + halfDayHour;
  }

  render() {
    this._renderTimePickerContainer();
    this._renderTimePickerSelections();
    this.element.style.display = this._props.isDisabled ? 'block' : 'none';
    return this.element;
  }

  rerender(changedAttr: string[], options?: object) {
    super.rerender();
    if (changedAttr.indexOf('offsetLeft') !== -1 && options) {
      this.element.style.left = options['left'] + 'px';
    }
  }

  getElement() {
    return this.element;
  }
}

export default TimePicker;