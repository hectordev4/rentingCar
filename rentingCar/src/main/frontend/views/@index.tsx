import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
    console.log(banner);
  return (
    <>
    <div className="homeDivTop">
        <img style={{ width: '100vw', zIndex:'-1' }} src="images/trailRoad.svg" />
        <img style={{ width: '800px' }} src="icons/Logo.svg" />

    </div>
    <div className="homeDivBottom">
      <div className="flex flex-row items-center justify-between gap-xl text-center">
        <button className="homeDelegation">Button1</button>
        <button className="homeCalendar">Button2</button>
        <button className="homeBook">Button3</button>
      </div>
    </div>
    </>
  );
}
