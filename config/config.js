(function () {
  window.FutbicConfig = {
    appName: "Futbic",
    usersKey: "futbic_usuarios",
    sessionKey: "futbic_usuario_activo",
    matchesKey: "futbic_partidos_usuario",
    apiBaseUrl: "http://localhost/futbic/api",
    ligas: {
      laliga: {
        nombre: "LALIGA EA SPORTS",
        equipos: [
      { nombre: "Athletic Club", escudo: "assets/img/escudos/athletic-club.png" },
      { nombre: "Atlético de Madrid", escudo: "assets/img/escudos/atletico-madrid.png" },
      { nombre: "CA Osasuna", escudo: "assets/img/escudos/ca-osasuna.png" },
      { nombre: "Celta", escudo: "assets/img/escudos/celta.png" },
      { nombre: "Deportivo Alavés", escudo: "assets/img/escudos/deportivo-alaves.png" },
      { nombre: "Elche CF", escudo: "assets/img/escudos/elche-cf.png" },
      { nombre: "FC Barcelona", escudo: "assets/img/escudos/fc-barcelona.png" },
      { nombre: "Getafe CF", escudo: "assets/img/escudos/getafe-cf.png" },
      { nombre: "Girona FC", escudo: "assets/img/escudos/girona-fc.png" },
      { nombre: "Levante UD", escudo: "assets/img/escudos/levante-ud.png" },
      { nombre: "Rayo Vallecano", escudo: "assets/img/escudos/rayo-vallecano.png" },
      { nombre: "RCD Espanyol de Barcelona", escudo: "assets/img/escudos/rcd-espanyol.png" },
      { nombre: "RCD Mallorca", escudo: "assets/img/escudos/rcd-mallorca.png" },
      { nombre: "Real Betis", escudo: "assets/img/escudos/real-betis.png" },
      { nombre: "Real Madrid", escudo: "assets/img/escudos/real-madrid.png" },
      { nombre: "Real Oviedo", escudo: "assets/img/escudos/real-oviedo.png" },
      { nombre: "Real Sociedad", escudo: "assets/img/escudos/real-sociedad.png" },
      { nombre: "Sevilla FC", escudo: "assets/img/escudos/sevilla-fc.png" },
      { nombre: "Valencia CF", escudo: "assets/img/escudos/valencia-cf.png" },
      { nombre: "Villarreal CF", escudo: "assets/img/escudos/villarreal-cf.png" }
        ]
      },
      premier: {
        nombre: "Premier League",
        equipos: [
          { nombre: "Arsenal", escudo: "assets/img/escudos/premier/arsenal.png" },
          { nombre: "Aston Villa", escudo: "assets/img/escudos/premier/aston-villa.png" },
          { nombre: "AFC Bournemouth", escudo: "assets/img/escudos/premier/bournemouth.png" },
          { nombre: "Brentford", escudo: "assets/img/escudos/premier/brentford.png" },
          { nombre: "Brighton & Hove Albion", escudo: "assets/img/escudos/premier/brighton-and-hove-albion.png" },
          { nombre: "Burnley", escudo: "assets/img/escudos/premier/burnley.png" },
          { nombre: "Chelsea", escudo: "assets/img/escudos/premier/chelsea.png" },
          { nombre: "Crystal Palace", escudo: "assets/img/escudos/premier/crystal-palace.png" },
          { nombre: "Everton", escudo: "assets/img/escudos/premier/everton.png" },
          { nombre: "Fulham", escudo: "assets/img/escudos/premier/fulham.png" },
          { nombre: "Leeds United", escudo: "assets/img/escudos/premier/leeds-united.png" },
          { nombre: "Liverpool", escudo: "assets/img/escudos/premier/liverpool.png" },
          { nombre: "Manchester City", escudo: "assets/img/escudos/premier/manchester-city.png" },
          { nombre: "Manchester United", escudo: "assets/img/escudos/premier/manchester-united.png" },
          { nombre: "Newcastle United", escudo: "assets/img/escudos/premier/newcastle-united.png" },
          { nombre: "Nottingham Forest", escudo: "assets/img/escudos/premier/nottingham-forest.png" },
          { nombre: "Sunderland", escudo: "assets/img/escudos/premier/sunderland.png" },
          { nombre: "Tottenham Hotspur", escudo: "assets/img/escudos/premier/tottenham-hotspur.png" },
          { nombre: "West Ham United", escudo: "assets/img/escudos/premier/west-ham-united.png" },
          { nombre: "Wolverhampton Wanderers", escudo: "assets/img/escudos/premier/wolverhampton-wanderers.png" }
        ]
      }
    },
    equipos: []
  };

  window.FutbicConfig.equipos = Object.values(window.FutbicConfig.ligas).flatMap((liga) => liga.equipos);
})();
