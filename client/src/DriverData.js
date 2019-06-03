class DriverData {

    constructor(id, state, position) {
      this.id = id;
      this.state = state;
      this.position = position;
      this.updateTime = Date.now();
    }
  }

  export default DriverData;