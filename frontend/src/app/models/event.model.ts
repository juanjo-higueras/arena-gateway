export interface Event {
  title: string;
  url: string;
  details: EventDetail[];
}

export interface EventDetail {
  date: string;
  cast: string[];
  buyTicketsLink: string;
}
