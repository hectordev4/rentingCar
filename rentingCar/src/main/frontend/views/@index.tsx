import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
    console.log(banner);
  return (
    <>
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '800px' }} src="icons/Logo.svg" />
      <div className="flex flex-row items-center justify-between gap-xl text-center mt-xl">
        <button> Button1</button>
        <button> Button2</button>
        <button> Button3</button>
      </div>
    </div>
    </>
  );
}
