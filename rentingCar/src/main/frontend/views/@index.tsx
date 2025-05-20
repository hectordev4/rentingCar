import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
    console.log(banner);
  return (
    <>
    <div className="homeDiv">
        <img style={{ width: '800px' }} src="icons/Logo.svg" />
        <img style={{ width: '800px' }} src="images/trailRoad.svg" />
    </div>
    <div className="homeDiv">
      <div className="flex flex-row items-center justify-between gap-xl text-center">
        <button className="homeButton">Button1</button>
        <button className="homeButton">Button2</button>
        <button className="homeButton">Button3</button>
      </div>
    </div>
    </>
  );
}
