import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {banner} from 'Frontend/themes/carrenting/banner';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'Home' };

export default function HomeView() {
    console.log(banner);
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <img style={{ width: '800px' }} src="icons/Logo.svg" />
      <br />
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
    </div>
  );
}
