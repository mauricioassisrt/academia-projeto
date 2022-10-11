import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {
  @Input() inputModel = "";
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() placeholder = "";
  @Input() title = "";
  @Output() onEnter = new EventEmitter<string>();

  @Input() iconButton = "";
  @Output() onClickButton = new EventEmitter<string>();
  @Input() styles = "";


  handleOnEnter() {
    this.onEnter.emit();
  }
}
