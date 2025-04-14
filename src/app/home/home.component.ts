import { Component } from '@angular/core';
import { FaqItem } from '../models/faq.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faqItems: FaqItem[] = [
    {
      question: 'Hogyan rögzíthetem a fogásomat?',
      answer: 'A fogás rögzítéséhez válaszd ki a menüpontban lévő megfelelő linket, majd kattints rá. Add meg a hal típusát, méretét, súlyát, és egy rövid leírást a fogásról. Ne felejtsd el megadni a pontos időpontot sem!',
      active: false
    },
    {
      question: 'Miért nem tudom elvinni a fogásomat?',
      answer: 'Ha be pipálod az "elviszem a fogást" mezőt akkor az elvitel előtt az alkalmazás ellenőrzi a hal méretét és súlyát, valamint a tilalmi időszakot. Ha a hal nem felel meg a szabályoknak (például túl kicsi vagy a tilalmi időszakban fogtad), akkor nem viheted el. Nézd meg a haladott információkat és győződj meg róla, hogy minden megfelel a szabályoknak!',
      active: false
    },
    {
      question: ' Mi a teendő, ha hibás adatot adtam meg a fogásomról?',
      answer: 'Ha hibás adatot adtál meg, egyszerűen keresd meg a fogásod a horgásznapi történetben, és válaszd ki az szereksztési ikont. Itt javíthatod a helytelen információkat.',
      active: false
    },
    {
      question: 'Hogyan ellenőrzi az alkalmazás a hal súlyát és hosszát?',
      answer: 'Az alkalmazás a beírt adatokat automatikusan összeveti az országos szabályozásokkal, és figyelembe veszi a hal típusát és méretét. Ha a megadott adatok nem felelnek meg, az alkalmazás figyelmeztetést ad.',
      active: false
    },
    {
      question: 'Mi a tilalmi időszak, és hogyan tudom ellenőrizni?',
      answer: 'A tilalmi időszak az az időszak, amikor bizonyos halakat nem szabad kifogni. Az alkalmazás figyelmeztet, ha egy fogás a tilalmi időszakban történt, és nem engedélyezi az elvitelét',
      active: false
    },
    {
      question: 'Hogyan tudom megnézni a saját fogásaimat?',
      answer: 'A horgásznapi statisztikáidat a profilodon található „fogások” menüpontban tekintheted meg. Itt láthatod az összes rögzített fogásodat, azok adatait és a halak típusait.',
      active: false
    },
  ];

  imageList: string[] = [
    "http://pecasvendeghaz.hu/wp-content/uploads/2020/06/horgaszat1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx4LX8D8g5ztJsuZbFy5rETuHC67rwBon4lA&s",
    "https://sneci.hu/_user/page/news/211.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQv9ENeKgAqSGZ3AVPpEESf1biXSE7IuSkQ&s",
    "https://badacsony.com/userfiles/4/0/40f2dc2de0115e2228fd9c7a9b1fb8c4_thumb_640x425.jpg",
    "https://poganyito.hu/wp-content/uploads/2023/10/Ejszakai-horgaszat.jpg"
  ];

  visibleImages: string[] = [];
  currentIndex: number = 0;

  ngOnInit() {
    this.updateVisibleImages();
  }

  updateVisibleImages() {
    this.visibleImages = this.imageList.slice(this.currentIndex, this.currentIndex + 3);
  }

  nextSlide() {
    if (this.currentIndex + 3 < this.imageList.length) {
      this.currentIndex += 3;
      this.updateVisibleImages();
    }
  }


  prevSlide() {
    if (this.currentIndex - 3 >= 0) {
      this.currentIndex -= 3;
      this.updateVisibleImages();
    }
  }




  toggleFaqItem(clickedItem: FaqItem): void {
    this.faqItems.forEach(item => {
      if (item !== clickedItem) {
        item.active = false;
      }
    });


    clickedItem.active = !clickedItem.active;
  }
}
