import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { currentEnvironment } from '../../../environments/environment';

@Component({
  selector: 'app-impressum-page',
  imports: [],
  templateUrl: './impressum-page.component.html',
  styleUrl: './impressum-page.component.css',
})
export class ImpressumPageComponent implements OnInit {
  contactInformation: SafeHtml = '';
  haftungsausschluss: String = `Alle Inhalte dieser Webseite wurden mit größter Sorgfalt erstellt.
                                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                                kann jedoch keine Gewähr übernommen werden.`;
  urheberrecht: String = `Die auf dieser Webseite veröffentlichten Inhalte, Werke und Beiträge
                          sind urheberrechtlich geschützt. Jede Verwertung, insbesondere die
                          Vervielfältigung, Verarbeitung, Verbreitung oder Speicherung außerhalb
                          der Grenzen des Urheberrechts, bedarf der vorherigen schriftlichen
                          Zustimmung des/der jeweiligen Rechteinhaber(s).`;  

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Importiere die Kontaktinformation aus der environment-Datei
    this.contactInformation = this.sanitizer.bypassSecurityTrustHtml(
      currentEnvironment.contactInformation
    );
  }
}
