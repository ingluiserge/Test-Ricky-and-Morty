export function LogTime() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const result = await originalMethod.apply(this, args);      
      const executionTime = Date.now() - start;
      console.log(
        `Method ${key} executed in ${executionTime}ms`,
        target.constructor.name,
      );
      return result;
    };

    return descriptor;
  };
}
