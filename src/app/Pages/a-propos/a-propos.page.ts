import { Component, OnInit } from '@angular/core';
import {ContactInfo} from './ContactInfo';

import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
})
export class AProposPage implements OnInit {
  selectedTab = 'Projet';


  constructor(

    )
  { }

  ngOnInit() {}

}

