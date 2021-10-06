function sleep(timeout: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(() => {
      return res();
    }, timeout);
  });
}

export { sleep };
