import { Component, OnInit, Input } from '@angular/core';
import {IconsmanagerService} from '../../services/iconsmanager.service';
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() name:string;
  constructor(private iconmanger: IconsmanagerService) { 

  }

  ngOnInit() {
  }

}
