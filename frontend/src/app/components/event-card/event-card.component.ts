import { Component, Input, inject } from '@angular/core';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: Event;
  private modalService = inject(ModalService);

  get operaName(): string {
    const fullTitle = this.event.title.replace(' | 2026', '');
    if (fullTitle.includes('Ed. ')) {
      const parts = fullTitle.split('Ed. ');
      return `${parts[0].trim()} (${parts[1].trim()})`;
    }
    return fullTitle;
  }

  get performanceCount(): number {
    return this.event.details.length;
  }

  get performanceText(): string {
    return this.performanceCount === 1 ? 'representación' : 'representaciones';
  }

  formatDate(date: string): string {
    const dateOnly = date.split(' - ')[0];
    return dateOnly.replace(/\./g, '/');
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  openInfoModal(): void {
    const operaName = this.event.title.replace(' | 2026', '');
    const description = this.operaDescriptions[operaName] || 'No hay descripción disponible para esta ópera.';
    this.modalService.openModal(operaName, description);
  }

  public getFondoUrl(): string {
    let nombreArchivo = '';
    switch (this.operaName) {
      case 'Aida Ed. Stefano Poda':
        nombreArchivo = 'aida_poda.jpg';
        break;
      case 'Aida Ed. Franco Zeffirelli':
        nombreArchivo = 'aida_zefirelli.jpg';
        break;
      case 'Nabucco':
        nombreArchivo = 'nabucco.jpg';
        break;
      case 'La Bohème':
        nombreArchivo = 'boheme.jpg';
        break;
      case 'La Traviata':
        nombreArchivo = 'traviata.jpg';
        break;
      case 'Turandot':
        nombreArchivo = 'turandot.jpg';
        break;
      default:
        break;
    }

    return `url('/assets/${nombreArchivo}')`;
  }  

  private readonly operaDescriptions: { [key: string]: string } = {
    'Aida Ed. Stefano Poda': `Aida es una ópera en cuatro actos de Giuseppe Verdi. La trama se desarrolla en el antiguo Egipto, en un contexto de guerra entre Egipto y Etiopía. La ópera narra el trágico romance entre Radamés, un comandante egipcio, y Aida, una princesa etíope que ha sido esclavizada. Su amor es puesto a prueba por la rivalidad de Amneris, la hija del Faraón, que también ama a Radamés. El drama culmina con una traición, el juicio de Radamés y su fatal desenlace. Aunque existen varias producciones con diferentes directores (como Stefano Poda o Franco Zeffirelli), la música y el libreto de la ópera son los mismos.
      <br><br>
      <strong>Acto I:</strong> El ejército egipcio se prepara para la guerra contra Etiopía. Radamés es elegido comandante y, en secreto, sueña con su amada Aida. Sin embargo, Amneris, la princesa egipcia, sospecha de su amor por Aida y la interroga con astucia.
      <br><br>
      <strong>Acto II:</strong> Amneris se regocija por el regreso triunfal de Radamés, pero su desconfianza hacia Aida crece. El Faraón otorga la mano de Amneris a Radamés, mientras Aida se reencuentra con su padre, el rey de Etiopía, ahora prisionero, y él la obliga a sonsacarle a Radamés la ubicación del ejército egipcio.
      <br><br>
      <strong>Acto III:</strong> A orillas del río Nilo, Aida se encuentra con Radamés. El padre de Aida la convence para que le sonsaque los planes de guerra. Radamés, cegado por el amor, revela la información. Son descubiertos por Amneris y el sacerdote Ramfis, y Radamés es acusado de traición.
      <br><br>
      <strong>Acto IV:</strong> Radamés es juzgado por los sacerdotes y condenado a ser enterrado vivo. Aida, que logra colarse en el sepulcro, espera a Radamés para morir junto a él. Ambos sellan su amor en la tumba, mientras Amneris, fuera del sepulcro, llora su amor perdido.`,
    'Aida Ed. Franco Zeffirelli': `Aida es una ópera en cuatro actos de Giuseppe Verdi. La trama se desarrolla en el antiguo Egipto, en un contexto de guerra entre Egipto y Etiopía. La ópera narra el trágico romance entre Radamés, un comandante egipcio, y Aida, una princesa etíope que ha sido esclavizada. Su amor es puesto a prueba por la rivalidad de Amneris, la hija del Faraón, que también ama a Radamés. El drama culmina con una traición, el juicio de Radamés y su fatal desenlace. Aunque existen varias producciones con diferentes directores (como Stefano Poda o Franco Zeffirelli), la música y el libreto de la ópera son los mismos.
      <br><br>
      <strong>Acto I:</strong> El ejército egipcio se prepara para la guerra contra Etiopía. Radamés es elegido comandante y, en secreto, sueña con su amada Aida. Sin embargo, Amneris, la princesa egipcia, sospecha de su amor por Aida y la interroga con astucia.
      <br><br>
      <strong>Acto II:</strong> Amneris se regocija por el regreso triunfal de Radamés, pero su desconfianza hacia Aida crece. El Faraón otorga la mano de Amneris a Radamés, mientras Aida se reencuentra con su padre, el rey de Etiopía, ahora prisionero, y él la obliga a sonsacarle a Radamés la ubicación del ejército egipcio.
      <br><br>
      <strong>Acto III:</strong> A orillas del río Nilo, Aida se encuentra con Radamés. El padre de Aida la convence para que le sonsaque los planes de guerra. Radamés, cegado por el amor, revela la información. Son descubiertos por Amneris y el sacerdote Ramfis, y Radamés es acusado de traición.
      <br><br>
      <strong>Acto IV:</strong> Radamés es juzgado por los sacerdotes y condenado a ser enterrado vivo. Aida, que logra colarse en el sepulcro, espera a Radamés para morir junto a él. Ambos sellan su amor en la tumba, mientras Amneris, fuera del sepulcro, llora su amor perdido.`,
    'Nabucco': `Nabucco es una ópera en cuatro actos de Giuseppe Verdi. Ambientada en la antigua Babilonia (586 a.C.), narra la historia del rey Nabucodonosor II, quien somete al pueblo judío y los lleva al exilio. La ópera explora temas de poder, fe y redención a través de personajes como el rey, su hija Fenena, y la ambiciosa Abigaille. La obra es célebre por su emotivo coro "Va, pensiero" (el coro de los esclavos hebreos), que se ha convertido en un himno de esperanza y libertad para muchos.
        <br><br>
        <strong>Acto I:</strong> Los israelitas, invadidos por las tropas de Nabucco, se lamentan en el Templo de Salomón. Abigaille, la supuesta hija mayor de Nabucco, conspira para usurpar el trono, consumida por los celos hacia su hermana Fenena y su amor no correspondido por Ismael.
        <br><br>
        <strong>Acto II:</strong> Abigaille descubre un documento que revela que es una esclava y no la hija de Nabucco. Enfurecida, aprovecha la ausencia de Nabucco para autoproclamarse reina. El rey, al regresar, se proclama a sí mismo dios y es fulminado por un rayo, perdiendo la razón.
        <br><br>
        <strong>Acto III:</strong> Abigaille, ahora en el poder, engaña a un Nabucco mentalmente incapacitado para que firme la orden de ejecución de los hebreos. Nabucco se da cuenta de que también ha condenado a su amada hija Fenena.
        <br><br>
        <strong>Acto IV:</strong> Nabucco recupera la razón al presenciar la fe de su hija Fenena. Se arrepiente, se convierte al judaísmo, y ordena la liberación de los prisioneros. Abigaille, al ver sus planes frustrados, se envenena y muere pidiendo perdón.`,
    'Il Barbiere di Siviglia': `El Barbero de Sevilla (Il Barbiere di Siviglia) es una ópera bufa en dos actos de Gioachino Rossini. Se trata de una comedia llena de enredos y malentendidos. La trama sigue al joven y enamorado Conde Almaviva en su intento de casarse con la bella Rosina, pupila del avaro Doctor Bartolo. Con la ayuda del ingenioso barbero Fígaro, un maestro en las intrigas y los disfraces, el conde burla a Bartolo para conquistar el corazón de Rosina. La ópera es conocida por su humor, sus arias virtuosísticas y su ritmo frenético.
        <br><br>
        <strong>Acto I:</strong> El Conde Almaviva intenta cortejar a Rosina bajo la ventana de su casa. Con la ayuda del barbero Fígaro, se hace pasar por un estudiante pobre llamado Lindoro para ganar su amor. A continuación, se disfraza de soldado borracho para entrar en la casa de Bartolo, pero sus planes son frustrados y se produce un gran caos.
        <br><br>
        <strong>Acto II:</strong> El Conde Almaviva vuelve a la carga, esta vez disfrazado de maestro de música, en un intento de dar lecciones a Rosina y poder pasar tiempo con ella. A pesar de la vigilancia de Bartolo, los enredos culminan con la huida de la pareja, y el Conde revela su verdadera identidad. Bartolo, finalmente, resignado, accede al matrimonio.`,
    'La Bohème': `La Bohème es una ópera en cuatro actos de Giacomo Puccini. Ambientada en el barrio latino de París en el siglo XIX, relata la vida de un grupo de jóvenes artistas bohemios que luchan contra el hambre, el frío y la pobreza. El eje central es la trágica historia de amor entre el poeta Rodolfo y la costurera Mimì, una relación que florece y se desvanece con la fragilidad de la vida. La música de Puccini es lírica y emotiva, capturando la alegría, el dolor y la desesperación de la juventud.
        <br><br>
        <strong>Acto I:</strong> Rodolfo, el poeta, y sus amigos bohemios (el pintor Marcello, el músico Schaunard y el filósofo Colline) malviven en su desván parisino. Mimì, una vecina, aparece buscando una vela. Ambos se enamoran al instante mientras se buscan las llaves de la habitación, que Rodolfo había escondido a propósito.
        <br><br>
        <strong>Acto II:</strong> El grupo de amigos se reúne en el Café Momus, donde la alegría se desborda y el romance de Rodolfo y Mimì se consolida.
        <br><br>
        <strong>Acto III:</strong> Los amantes se separan debido a la enfermedad de Mimì y los celos de Rodolfo, quien no puede soportar verla sufrir. Sin embargo, al final del acto, se dan cuenta de que no pueden vivir el uno sin el otro y deciden permanecer juntos hasta la primavera.
        <br><br>
        <strong>Acto IV:</strong> De vuelta en el desván, los amigos se dan cuenta de que Mimì está muy enferma. Se reúnen para ayudarla. En sus últimos momentos, ella y Rodolfo reviven su amor, y Mimì muere rodeada de sus amigos.`,
    'La Traviata': `La Traviata es una ópera en tres actos de Giuseppe Verdi. Basada en la novela "La Dama de las Camelias" de Alexandre Dumas (hijo), cuenta la conmovedora y trágica historia de amor entre la cortesana parisina Violetta Valéry y el joven noble Alfredo Germont. A pesar de los prejuicios sociales, su amor florece, pero se ve amenazado por la intervención del padre de Alfredo, Giorgio Germont. La ópera es reconocida por su conmovedora trama, sus arias melódicas y su profundo dramatismo que explora temas de sacrificio y la hipocresía social.
        <br><br>
        <strong>Acto I:</strong> En una fiesta en París, Violetta conoce a Alfredo. Él le declara su amor. Aunque ella es reacia a dejar su vida de cortesana, se enamora de él.
        <br><br>
        <strong>Acto II:</strong> Violetta y Alfredo se han mudado al campo para vivir juntos. El padre de Alfredo, Giorgio Germont, le pide a Violetta que lo deje para proteger el honor de su familia. Violetta se sacrifica y regresa a París, dejando a Alfredo una nota de despedida.
        <br><br>
        <strong>Acto III:</strong> Violetta, gravemente enferma de tuberculosis, se encuentra sola y abandonada. Alfredo, que ha descubierto la verdad sobre su sacrificio, la visita y se reconcilian. Sin embargo, es demasiado tarde y Violetta muere en sus brazos.`,
    'Turandot': `Turandot es una ópera en tres actos de Giacomo Puccini, basada en una historia persa. La trama se sitúa en la antigua China, donde la fría princesa Turandot desafía a sus pretendientes a resolver tres acertijos. Si fallan, son decapitados. El príncipe Calàf, enamorado de ella, acepta el reto y logra resolverlos. Sin embargo, para ganarse su amor, le da a la princesa un acertijo propio. La ópera es célebre por el aria "Nessun dorma" y su exótica orquestación, aunque quedó inconclusa tras la muerte de Puccini y fue completada por Franco Alfano.
        <br><br>
        <strong>Acto I:</strong> El Príncipe de Persia falla en los acertijos de Turandot y es ejecutado ante la multitud. El Príncipe Calàf, un extranjero anónimo, ve a la Princesa Turandot y queda deslumbrado por su belleza, decidiendo enfrentar los acertijos.
        <br><br>
        <strong>Acto II:</strong> Calàf se presenta ante la corte y resuelve los tres acertijos. Turandot, horrifieda, le ruega a su padre que no la obligue a casarse. Calàf le da un acertijo propio: si ella descubre su nombre antes del amanecer, él morirá.
        <br><br>
        <strong>Acto III:</strong> Nadie duerme en Pekín esa noche mientras Turandot busca el nombre. Turandot captura a Liu, la esclava que acompaña al padre de Calàf, y la tortura para que lo revele, pero ella se suicida para proteger al príncipe. Calàf confronta a Turandot y la besa. Ella se enamora y confiesa su amor por él, proclamando su nombre como "Amor".`
  };
}