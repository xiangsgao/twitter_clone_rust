class UnreachableError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'this is not reachable';
    }
  }

  export default UnreachableError;