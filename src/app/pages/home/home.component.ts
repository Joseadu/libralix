import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentTime: string = '';
  currentDate: string = '';
  porcentaje: number = 80;

  @ViewChild('track') track!: ElementRef;
  activeIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.currentDate = now.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    });
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  
  scrollTo(index: number) {
    const el = this.track.nativeElement;
    const items = el.querySelectorAll('.carr-grp-item');
    if (!items || !items[index]) return;
  
    const item = items[index];
    el.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
    this.activeIndex = index;
  }
  
  startAutoScroll() {
    const el = this.track.nativeElement;
    const items = el.querySelectorAll('.carr-grp-item');
  
    this.intervalId = setInterval(() => {
      const nextIndex = (this.activeIndex + 1) % items.length;
      this.scrollTo(nextIndex);
    }, 5000);
  }
  
  next() {
    const items = this.track.nativeElement.querySelectorAll('.carr-grp-item');
    const nextIndex = (this.activeIndex + 1) % items.length;
    this.scrollTo(nextIndex);
  }
  
  prev() {
    const items = this.track.nativeElement.querySelectorAll('.carr-grp-item');
    const prevIndex = (this.activeIndex - 1 + items.length) % items.length;
    this.scrollTo(prevIndex);
  }
}
