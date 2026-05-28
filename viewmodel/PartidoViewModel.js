(function () {
  class PartidoViewModel {
    constructor(model) {
      this.model = model;
      this.partidos = this.model.getPartidos();
    }

    setUser(userId) {
      this.model.setUser(userId);
      this.partidos = this.model.getPartidos();
    }

    getPartidos(filterText = "") {
      const normalizedFilter = filterText.trim().toLowerCase();

      if (!normalizedFilter) {
        return this.partidos;
      }

      return this.partidos.filter((partido) => {
        return (
          partido.equipoLocal.toLowerCase().includes(normalizedFilter) ||
          partido.equipoVisitante.toLowerCase().includes(normalizedFilter)
        );
      });
    }

    addPartido(formData) {
      const errors = this.validatePartido(formData);

      if (Object.keys(errors).length > 0) {
        return { success: false, errors };
      }

      const partido = {
        fecha: formData.fecha,
        hora: formData.hora,
        liga: formData.liga,
        ligaNombre: formData.ligaNombre,
        equipoLocal: formData.equipoLocal.trim(),
        equipoVisitante: formData.equipoVisitante.trim(),
        golesLocal: Number(formData.golesLocal),
        golesVisitante: Number(formData.golesVisitante),
        lugar: formData.lugar,
        valoracion: Number(formData.valoracion),
        observaciones: formData.observaciones.trim()
      };

      this.model.addPartido(partido);
      this.partidos = this.model.getPartidos();

      return { success: true, errors: {} };
    }

    deletePartido(id) {
      this.partidos = this.model.deletePartido(id);
    }

    getEstadisticas(equipoFavorito = "") {
      const totalPartidos = this.partidos.length;
      const totalGoles = this.partidos.reduce((total, partido) => {
        return total + Number(partido.golesLocal) + Number(partido.golesVisitante);
      }, 0);
      const promedioGoles = totalPartidos > 0 ? (totalGoles / totalPartidos).toFixed(1) : "0";
      const totalValoraciones = this.partidos.reduce((total, partido) => {
        return total + Number(partido.valoracion || 0);
      }, 0);
      const valoracionMedia = totalPartidos > 0 ? (totalValoraciones / totalPartidos).toFixed(1) : "-";

      return {
        totalPartidos,
        totalGoles,
        promedioGoles,
        lugarHabitual: this.getLugarHabitual(),
        equipoFavorito: equipoFavorito || "-",
        partidosFavorito: this.getPartidosFavorito(equipoFavorito),
        equipoMasVisto: this.getEquipoMasVisto(),
        mayorGoleada: this.getMayorGoleada(),
        valoracionMedia
      };
    }

    getGanador(partido) {
      if (partido.golesLocal > partido.golesVisitante) {
        return partido.equipoLocal;
      }

      if (partido.golesVisitante > partido.golesLocal) {
        return partido.equipoVisitante;
      }

      return "Empate";
    }

    getPartidosFavorito(equipoFavorito) {
      if (!equipoFavorito) {
        return 0;
      }

      return this.partidos.filter((partido) => {
        return partido.equipoLocal === equipoFavorito || partido.equipoVisitante === equipoFavorito;
      }).length;
    }

    getEquipoMasVisto() {
      if (this.partidos.length === 0) {
        return "-";
      }

      const equipos = this.partidos.reduce((accumulator, partido) => {
        accumulator[partido.equipoLocal] = (accumulator[partido.equipoLocal] || 0) + 1;
        accumulator[partido.equipoVisitante] = (accumulator[partido.equipoVisitante] || 0) + 1;
        return accumulator;
      }, {});

      return Object.entries(equipos).sort((a, b) => b[1] - a[1])[0][0];
    }

    getMayorGoleada() {
      if (this.partidos.length === 0) {
        return "-";
      }

      let partido = this.partidos[0];
      let diferencia = Math.abs(Number(partido.golesLocal) - Number(partido.golesVisitante));

      this.partidos.forEach((currentPartido) => {
        const currentDiferencia = Math.abs(Number(currentPartido.golesLocal) - Number(currentPartido.golesVisitante));

        if (currentDiferencia > diferencia) {
          partido = currentPartido;
          diferencia = currentDiferencia;
        }
      });

      if (diferencia === 0) {
        return "Sin goleadas";
      }

      return `${partido.equipoLocal} ${partido.golesLocal} - ${partido.golesVisitante} ${partido.equipoVisitante} (${diferencia} goles)`;
    }

    getLugarHabitual() {
      if (this.partidos.length === 0) {
        return "-";
      }

      const lugares = this.partidos.reduce((accumulator, partido) => {
        accumulator[partido.lugar] = (accumulator[partido.lugar] || 0) + 1;
        return accumulator;
      }, {});

      return Object.entries(lugares).sort((a, b) => b[1] - a[1])[0][0];
    }

    validatePartido(formData) {
      const errors = {};
      const golesLocal = Number(formData.golesLocal);
      const golesVisitante = Number(formData.golesVisitante);

      if (!formData.fecha) {
        errors.fecha = "La fecha es obligatoria.";
      }

      if (!formData.hora) {
        errors.hora = "La hora es obligatoria.";
      }

      if (!formData.liga) {
        errors.liga = "Selecciona una liga.";
      }

      if (!formData.equipoLocal.trim()) {
        errors.equipoLocal = "El equipo local es obligatorio.";
      }

      if (!formData.equipoVisitante.trim()) {
        errors.equipoVisitante = "El equipo visitante es obligatorio.";
      }

      if (formData.equipoLocal.trim().toLowerCase() === formData.equipoVisitante.trim().toLowerCase()) {
        errors.equipoVisitante = "Los equipos no pueden ser iguales.";
      }

      if (Number.isNaN(golesLocal) || golesLocal < 0) {
        errors.golesLocal = "Los goles no pueden ser negativos.";
      }

      if (Number.isNaN(golesVisitante) || golesVisitante < 0) {
        errors.golesVisitante = "Los goles no pueden ser negativos.";
      }

      if (!formData.lugar) {
        errors.lugar = "Selecciona el lugar donde viste el partido.";
      }

      if (!formData.valoracion) {
        errors.valoracion = "Selecciona una valoracion.";
      }

      return errors;
    }
  }

  window.PartidoViewModel = PartidoViewModel;
})();
