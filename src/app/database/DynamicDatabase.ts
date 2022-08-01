import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import MenuItem from "./menuitem";

@Injectable({ providedIn: "root" })
export class DynamicDatabase {
    menus: MenuItem[] = [
        { id: 1, name: 'animals', text: 'Animal index', parentId: 0 },
        { id: 2, name: 'vertebrates', text: 'Vertebrates', parentId: 0 },
        { id: 3, name: 'invertebrates', text: 'Invertebrates', parentId: 0 },
        { id: 4, name: 'fish', text: 'Fishes', parentId: 2},
        { id: 5, name: 'amphibians', text: 'Amphibians', parentId: 2 },
        { id: 6, name: 'reptiles', text: 'Reptiles', parentId: 2},
        { id: 7, name: 'birds', text: 'Birds', parentId: 2},
        { id: 8, name: 'mammals', text: 'Mammals', parentId: 2},
        { id: 9, name: 'insects', text: 'Insects', parentId: 3 },
        { id: 10, name: 'molluscs', text: 'Molluscs', parentId: 3 },
        { id: 11, name: 'crustaceans', text: 'Crustaceans', parentId: 3 },
        { id: 12, name: 'corals', text: 'Corals', parentId: 3 },
        { id: 13, name: 'corals', text: 'Corals', parentId: 3 },
        { id: 14, name: 'arachnids', text: 'Arachnids', parentId: 3 },
        { id: 15, name: 'velvetWorms', text: 'Velvet worms', parentId: 3 },
        { id: 16, name: 'horseshoeCrabs', text: 'Horseshoe crabs', parentId: 3 },
        { id: 17, name: 'baikalOilfish', text: 'Baikal oilfish', parentId: 4 },
        { id: 18, name: 'balaShark', text: 'Bala shark', parentId: 4 },
        { id: 19, name: 'ballanWrasse', text: 'Ballan wrasse', parentId: 4 },
        { id: 20, name: 'bambooShark', text: 'Bamboo shark', parentId: 4 },
        { id: 21, name: 'bandedKillifish', text: 'Banded killifish', parentId: 4 },
        { id: 22, name: 'sonoranDesertToad', text: 'Sonoran desert toad', parentId: 5 },
        { id: 23, name: 'westernToad', text: 'Western toad', parentId: 5 },
        { id: 24, name: 'arroyoToad', text: 'Arroyo toad', parentId: 5 },
        { id: 25, name: 'yosemiteToad', text: 'Yosemite toad', parentId: 5 },
        { id: 26, name: 'bandedDayGecko', text: 'Banded Day Gecko', parentId: 6 },
        { id: 27, name: 'bandedGilaMonster', text: 'Banded Gila Monster', parentId: 6 },
        { id: 28, name: 'blackTreeMonitor', text: 'Black Tree Monitor', parentId: 6 },
        { id: 29, name: 'blueSpinyLizard', text: 'Blue Spiny Lizard', parentId: 6 },
        { id: 30, name: 'velociraptor', text: 'Velociraptor', parentId: 6 },
        { id: 31, name: 'test01', text: 'test01', parentId: 19 },
        { id: 32, name: 'test02', text: 'test02', parentId: 19},
    ];
    dataMap = new Map<string, string[]>([
        ["Fruits", ["Apple", "Orange", "Banana"]],
        ["Vegetables", ["Tomato", "Potato", "Onion"]],
        ["Apple", ["Fuji", "Macintosh"]],
        ["Onion", ["Yellow", "White", "Purple"]],
        ["Macintosh", ["Yellow", "White", "Purple"]],
    ]);

    rootLevelNodes: string[] = ["Fruits", "Vegetables"];

    getMenu(menuId: Number) {
        return of(this.menus.find(m => m.id === menuId)).pipe(delay(1000));
    }

    getSubMenus(menuId: Number): Observable<MenuItem[]> {
        return of(this.menus.filter(m => m.parentId === menuId)).pipe(delay(1000));
    }

    haveSubMenu(menuId: Number) {
        return this.menus.filter(m => m.parentId === menuId).length !== 0;
    }

    getChildren(node: string) {
        // adding delay to mock a REST API call
        return of(this.dataMap.get(node)).pipe(delay(1000));
    }



    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}
