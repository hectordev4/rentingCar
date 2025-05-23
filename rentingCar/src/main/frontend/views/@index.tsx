import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';
import { DatePicker} from '@vaadin/react-components';
import {HorizontalLayout} from '@vaadin/react-components';
import {DateContextProvider} from 'Frontend/DateContext';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
    console.log(banner);
  return (
    <>
    <img className="background" style={{ width: '100vw'}} src="images/trailRoad.svg" />
    <div className="homeDivTop">
        <img className="homeDivTop" style={{ width: '800px'}} src="icons/Logo.svg" />
    </div>
    <div className="homeDivBottom">
      <div className="homeDivSubBottom">
        <button className="homeDelegation">
            <span>Delegation</span>
            <img style={{ width: '50px' }} src="icons/arrowDown.svg" />
        </button>
        <DateContextProvider>
            <HorizontalLayout theme="spacing">
              <DatePicker
                label="Departure date"
                max={returnDate.value}
                onValueChanged={(event) => {
                  departureDate.value = event.detail.value;
                }}
              />
              <DatePicker
                label="Return date"
                min={departureDate.value}
                onValueChanged={(event) => {
                  returnDate.value = event.detail.value;
                }}
              />
            </HorizontalLayout>
        </DateContextProvider>
        <button className="homeBook">Book Now!</button>
      </div>
    </div>
    </>
  );
}
