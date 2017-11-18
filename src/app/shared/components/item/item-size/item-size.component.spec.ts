import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSizeComponent } from './item-size.component';

describe('ItemSizeComponent', () => {
  let component: ItemSizeComponent;
  let fixture: ComponentFixture<ItemSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
