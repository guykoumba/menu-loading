import { Component, Input, OnInit } from '@angular/core';
import { MatMenu, MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { DynamicDatabase } from '../database/DynamicDatabase';
import MenuItem from '../database/menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() data: string[] = [];
  @Input() items: MenuItem[] = [];
  @Input() trigger = "Trigger";
  @Input() menuData!: MenuItem ;
  @Input() isRootNode = false;

  isLoading = false;
  dataLoaded = false;

  constructor(private database: DynamicDatabase) { }

  ngOnInit(): void {
    this.getSubMenus(this.menuData.id);
  }

  isParent(menu: MenuItem) {
    return menu.parentId === 0;
  }

  isExpandable(node: string): boolean {
    return this.database.isExpandable(node);
  }

  getData(node: string) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getChildren(node).subscribe((d) => {
        this.data = d?.slice() || [];
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  getSubMenus(menuId: Number) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getSubMenus(menuId).subscribe((d) => {
        this.items = d;
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  haveSubMenu(menuId: Number) {
    return this.database.haveSubMenu(menuId);
  }

  onMouseOver(menu: MatMenuTrigger) {
    //console.log(menu);
    menu.openMenu();
  }
}
