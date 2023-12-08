import { Component, Input } from '@angular/core';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {


  @Input() user!: User;

  ngOnInit(): void {
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        //this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        let panel = document.querySelector('div.panel') as HTMLElement
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

}
