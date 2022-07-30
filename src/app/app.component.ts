import { Component, OnInit } from '@angular/core';
import { DynamicDatabase } from './database/DynamicDatabase';
import MenuItem from './database/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'annuaire';
  userMenus: MenuItem[] = [];

  initialData: string[] = [];
  constructor(private database: DynamicDatabase) {
    this.initialData = this.database.rootLevelNodes.slice();
  }

  ngOnInit(): void {
    this.database.getSubMenus(0).subscribe((data) => {
      this.userMenus = data;
    });
  }

  getText(menu: MenuItem): string {
    return menu.text ? menu.text : menu.name;
  }

}
