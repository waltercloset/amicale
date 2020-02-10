import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Calendar from "react-calendar";
import { rewind } from "react-helmet";
import { navigate } from "@reach/router";
import moment from "moment";

import { convertToId, compareJMA } from "../utils/dates";
// des dates pour tester
const initdates = [
  { dateEv: new Date(Date.parse("1 Jan 2020 GMT")), id: "100" },
  { dateEv: new Date(Date.parse("3 Jan 2020 GMT")), id: "100" },
  { dateEv: new Date(Date.parse("16 Jan 2020 GMT")), id: "100" },
];

export const Cal = styled.div`
  .react-calendar {
    width: 350px;
    border: none;
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__tile:disabled.react-calendar__month-view__days__day--neighboringMonth {
    color: grey;
  }

  .react-calendar__tile--active {
    background-color: white !important;
    a {
      background-color: yellow !important;
    }
  }

  abbr {
    cursor: default;
    text-decoration: none;
    border: none;
  }

  .react-calendar__month-view__days {
    padding: 0px;

    button {
      cursor: default !important;
      border-top: solid black 0.5px;
      border-right: solid black 0.5px;
    }

    button:hover {
      background-color: white;
    }

    abbr {
      display: none;
    }

    .encule {
      a {
        height: 41px;
        width: 41px;
        border-radius: 50%;
        background-color: crimson;
        position: absolute;
        margin-left: -4px;
        margin-top: -20px;
        display: block;
        div {
          margin-top: 25%;
        }
      }
    }

    .encule:hover {
      a:hover {
        background-color: yellow;
        cursor: pointer !important;
      }
    }

    .rien {
      cursor: default;
      background-color: white !important;
      color: black !important;
    }

    .react-calendar__tile--active,
    .react-calendar__tile--active:hover {
      background: #006edc;
      color: white;
    }

    .ferme {
      background-color: transparent;
      color: black;
      background: linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 0.8px),
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 0) calc(50% + 0.8px),
        rgba(0, 0, 0, 0) 100%
      );
    }

    .vacance {
      background-color: transparent;
      color: black;
      background: linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) calc(50% - 0.8px),
        rgba(255, 0, 0, 1) 50%,
        rgba(0, 0, 0, 0) calc(50% + 0.8px),
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
`;

// composant Puce pour le contenu de chaque puce du calendrier (ici juste un lien vers une ancre)
const Puce = props => (
  <a href={`#${props.id}`}>
    <div>{props.children}</div>
  </a>
);

export const Calendrier = ({ dates, fermes, onClick }) => {
  // ces hooks servent juste à ce que ce petit comportement React marche avec Gatsby (cf. hydratation)
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  });

  if (!dates) dates = initdates;
  if (!fermes) fermes = [];

  // une fonction qui donne des classes CSS aux différents éléments du calendrier (cf react-calendar)
  const ajoutClasses = ({ activeStartDate, date, view }) => {
    // si la date du calendrier fait partie des dates d'événements à venir (le tableau dates) on lui donne la classe encule
    if (dates.find(event => compareJMA(event.dateEv, date))) return "encule";

    // si la date du calendrier est comprise dans une période de vacances on associe la classe CSS vacance.
    const fermeture = fermes.find(
      vacance =>
        moment(date).isSameOrAfter(
          moment(vacance.node.acf.debut_des_vacances)
        ) && moment(date).isBefore(moment(vacance.node.acf.fin_des_vacances))
    );
    if (fermeture) return "vacance";

    // si la date du calendrier correspond à un jour fermé (samedi, dimanche, lundi, mardi) -> classe ferme
    if (
      date.getDay() === 2 ||
      date.getDay() === 1 ||
      date.getDay() === 6 ||
      date.getDay() === 0
    )
      return "ferme";
    return "rien";
  };

  // une fonction qui choisit les dates qui ne sont pas cliquables (toutes celles qui ne correspondent pas à un événement)
  const desactiver = ({ activeStartDate, date, view }) =>
    view === "month" &&
    !dates.find(
      event =>
        event.dateEv.getDate() === date.getDate() &&
        event.dateEv.getMonth() === date.getMonth() &&
        event.dateEv.getYear() === date.getYear()
    );
  // une fonction qui indique le contenu de chaque case du calendrier (si date d'un événement, une Puce, sinon juste le numéro)
  const placerPuces = ({ date, view }) => {
    if (view === "month") {
      if (dates.find(event => compareJMA(event.dateEv, date))) {
        return <Puce id={convertToId(date)}>{date.getDate()}</Puce>;
      }
      return <div>{date.getDate()}</div>;
    }
  };

  const affJour = (locale, date) => {
    const j = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"];
    return j[date.getDay()];
  };

  const affMois = (locale, date) =>
    moment(date)
      .locale("fr")
      .format("MMMM YYYY");

  // quand on clique sur une case (non désactivée) on appelle la fonction passée en props au Calendrier
  const handleClick = value => {
    onClick(value);
  };

  return (
    <Cal key={state}>
      <Calendar
        onClickDay={handleClick}
        calendarType="ISO 8601"
        locale="fr-FR"
        tileDisabled={desactiver}
        tileContent={placerPuces}
        tileClassName={ajoutClasses}
        formatShortWeekday={affJour}
        formatMonthYear={affMois}
        minDetail="decade"
        minDate={new Date(Date.parse("01 april 2018"))}
      />
    </Cal>
  );
};
