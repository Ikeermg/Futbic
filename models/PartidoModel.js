(function () {
  class PartidoModel {
    constructor(baseStorageKey) {
      this.baseStorageKey = baseStorageKey;
      this.userId = null;
    }

    setUser(userId) {
      this.userId = userId;
    }

    getStorageKey() {
      return `${this.baseStorageKey}_${this.userId}`;
    }

    getPartidos() {
      if (!this.userId) {
        return [];
      }

      const saved = localStorage.getItem(this.getStorageKey());

      return saved ? JSON.parse(saved) : [];
    }

    savePartidos(partidos) {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(partidos));
    }

    addPartido(partido) {
      const partidos = this.getPartidos();
      const newPartido = {
        ...partido,
        id: Date.now()
      };

      partidos.push(newPartido);
      this.savePartidos(partidos);
      return newPartido;
    }

    deletePartido(id) {
      const partidos = this.getPartidos().filter((partido) => partido.id !== id);
      this.savePartidos(partidos);
      return partidos;
    }
  }

  window.PartidoModel = PartidoModel;
})();
