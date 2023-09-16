

const tryCatch = <T extends (...args: any[]) => any>(fn: T): [ReturnType<T> | undefined, Error | undefined] => {
  try {
    return [fn(), undefined];
  } catch (e) {
    return [undefined, e as Error];
  }
}

export {
  tryCatch
}