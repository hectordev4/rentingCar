import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';

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
        <button className="homeCalendar" />
        <button className="homeBook">Book Now!</button>
      </div>
    </div>
    </>
  );
}
