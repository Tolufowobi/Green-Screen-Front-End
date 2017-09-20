import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
@Injectable()
export class IconsmanagerService {

  constructor(private iconRegistry: MdIconRegistry, sanitizer:DomSanitizer) { 
    iconRegistry.addSvgIcon('add-new', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_add_box_black_48px.svg'));
    iconRegistry.addSvgIcon('log-out',sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic_power_settings_new_white_36px'));
  }

  getIconLocal(iconName:string): SVGElement{
    var icon: SVGElement;
     this.iconRegistry.getNamedSvgIcon(iconName)
    .subscribe(icn => {
      icon= icn;
    });
    return icon;
  }
  
  getIconUrl(iconUrlLstring){
    
  }
}
